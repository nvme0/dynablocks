import { Toolbar, ToolbarButton } from "@wordpress/components";
import { BlockEditProps, createBlock } from "@wordpress/blocks";
import { BlockControls } from "@wordpress/block-editor";
import { useState } from "@wordpress/element";
import { dispatch } from "@wordpress/data";
import ElementControls from "./ElementControls";
import { Attributes } from "./attributes";
import Columns, { DeviceTypes } from "../Components/Columns";

export interface EditProps extends BlockEditProps<Attributes> {
  // extends missing types
  clientId?: string; // should always have this
}

export const Edit = (props: EditProps): JSX.Element => {
  const { attributes, setAttributes, clientId } = props;
  const { editorId, innerBlocks } = attributes;

  const innerBlocksKeys = Object.keys(innerBlocks);
  const numberOfItems = innerBlocksKeys.length;

  if (clientId !== editorId) {
    setTimeout(() => setAttributes({ editorId: clientId }), 1000);
  }

  const [isDraggable, setIsDraggable] = useState(false);
  const [activeState, setActiveState] = useState<DeviceTypes>("desktop");

  const update = property => value => {
    setAttributes({ [property]: value });
  };

  // should always have clientId
  if (!clientId) return <div></div>;

  return (
    <div className="s4tw-dynablocks-columns">
      <BlockControls>
        <Toolbar>
          <ToolbarButton
            {...{
              icon: "move",
              title: "Adjust Column",
              onClick: () => {
                setIsDraggable(!isDraggable);
              },
              isActive: isDraggable
            }}
          />
          <ToolbarButton
            {...{
              icon: "insert",
              title: "Insert",
              onClick: () => {
                const innerBlock = createBlock(
                  "s4tw/dynablocks-columns-element"
                );
                dispatch("core/block-editor").insertBlock(
                  innerBlock,
                  numberOfItems,
                  clientId,
                  false
                );
              }
            }}
          />
        </Toolbar>
      </BlockControls>
      <ElementControls
        {...{
          ...attributes,
          numberOfItems,
          update,
          setAttributes,
          activeState,
          setActiveState
        }}
      />
      <Columns
        {...{
          ...attributes,
          numberOfItems,
          isDraggable,
          activeState,
          setActiveState,
          setAttributes
        }}
      />
    </div>
  );
};
