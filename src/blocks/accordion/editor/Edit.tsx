import { IconButton } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { BlockEditProps, createBlock } from "@wordpress/blocks";
import { dispatch } from "@wordpress/data";
import ElementControls from "./ElementControls";
import { Attributes } from "./attributes";
import Accordion from "../Components/Accordion";
import { extractSizeAndUnits } from "../../../common/helpers";

export interface EditProps extends BlockEditProps<Attributes> {
  // extends missing types
  clientId?: string; // should always have this
}

export const Edit = (props: EditProps): JSX.Element => {
  const { attributes, setAttributes, clientId, isSelected } = props;
  const { editorId, innerBlocks, headingFontSize } = attributes;

  const innerBlocksKeys = Object.keys(innerBlocks);
  const numberOfColumns = innerBlocksKeys.length;

  if (clientId !== editorId) {
    setTimeout(() => setAttributes({ editorId: clientId }), 1000);
  }

  const update = property => value => {
    setAttributes({ [property]: value });
  };

  const {
    size: headingFontSizeValue,
    units: headingFontSizeUnits
  } = extractSizeAndUnits(headingFontSize);

  return (
    <div className="s4tw-dynablocks-accordion">
      <ElementControls
        {...{
          ...attributes,
          update,
          numberOfColumns,
          setAttributes,
          clientId
        }}
      />
      <Accordion
        {...{
          ...attributes,
          clientId,
          editMode: true,
          update
        }}
      />
      {(numberOfColumns < 1 || isSelected) && numberOfColumns < 4 && (
        <div
          style={{
            padding: `0 ${headingFontSizeValue * 0.5}${headingFontSizeUnits}`
          }}
        >
          <IconButton
            {...{
              icon: "insert",
              className:
                "components-button block-list-appender__toggle block-editor-button-block-appender",
              onClick: () => {
                if (!clientId) return;
                const innerBlock = createBlock(
                  "s4tw/dynablocks-accordion-column"
                );
                dispatch("core/block-editor").insertBlock(
                  innerBlock,
                  numberOfColumns,
                  clientId,
                  false
                );
              }
            }}
          >
            {__("Add a Column")}
          </IconButton>
        </div>
      )}
    </div>
  );
};
