import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, IconButton, Button } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { createBlock, BlockInstance } from "@wordpress/blocks";
import { dispatch } from "@wordpress/data";
import uuid from "uuid/v4";
import { Attributes } from "./attributes";

export interface ControlProps extends Attributes {
  clientId?: string;
  setAttributes: (attrs: Partial<Attributes>) => void;
  update: (property: any) => (value: any) => void;
}

export default (props: ControlProps): JSX.Element => {
  const { setAttributes, innerBlocks, blockOrder, clientId } = props;
  const innerBlocksKeys = Object.keys(innerBlocks);
  const numberOfButtons = innerBlocksKeys.length;

  const addButton = () => {
    const uniqueId = uuid();
    const button: any = createBlock("s4tw/dynablocks-button", {
      parentId: clientId,
      relationship: uniqueId
    });

    const newBlockOrder: string[] = [];
    blockOrder.forEach(entry => {
      newBlockOrder.push(entry);
    });
    newBlockOrder.push(uniqueId);

    setAttributes({
      blockOrder: newBlockOrder,
      innerBlocks: {
        ...innerBlocks,
        [uniqueId]: button
      }
    });
  };

  const deleteButton = (index: number) => {
    const deleteKey = blockOrder[index];
    const updatedInnerBlocks: Attributes["innerBlocks"] = innerBlocksKeys
      .filter(key => key !== deleteKey)
      .reduce((result, current) => {
        result[current] = innerBlocks[current];
        return result;
      }, {});

    const newBlockOrder: string[] = blockOrder.filter(
      entry => entry !== deleteKey
    );

    dispatch("core/block-editor").removeBlock(innerBlocks[deleteKey].clientId);
    setAttributes({
      blockOrder: newBlockOrder,
      innerBlocks: updatedInnerBlocks
    });
  };

  const move = (currentIndex: number, newIndex: number) => {
    const newBlockOrder: string[] = blockOrder.filter(_entry => true);
    newBlockOrder.splice(newIndex, 0, newBlockOrder.splice(currentIndex, 1)[0]);

    if (clientId) {
      const innerBlocksArray: BlockInstance<{ [k: string]: any }>[] = [];
      newBlockOrder.forEach(entry => {
        innerBlocksArray.push(innerBlocks[entry]);
      });
      dispatch("core/block-editor").replaceInnerBlocks(
        clientId,
        innerBlocksArray,
        false
      );
    }

    setAttributes({ blockOrder: newBlockOrder });
  };

  return (
    <InspectorControls>
      <PanelBody>
        {innerBlocksKeys.map((_block, index) => (
          <div style={{ display: "flex" }}>
            <Button
              onClick={() => deleteButton(index)}
              className="columns__button--delete button-link-delete"
            >
              {__(`Delete Button ${index}`)}
            </Button>
            <IconButton
              {...{
                icon: "arrow-up",
                onClick: () => {
                  move(index, index - 1);
                },
                disabled: index === 0
              }}
            >
              {__("Move up")}
            </IconButton>
            <IconButton
              {...{
                icon: "arrow-down",
                onClick: () => {
                  move(index, index + 1);
                },
                disabled: index === numberOfButtons - 1
              }}
            >
              {__("Move down")}
            </IconButton>
          </div>
        ))}
        <IconButton
          {...{
            icon: "plus",
            onClick: addButton,
            disabled: numberOfButtons >= 4
          }}
        >
          {__("Add a Button")}
        </IconButton>
      </PanelBody>
    </InspectorControls>
  );
};
