import { InnerBlocks } from "@wordpress/block-editor";
import { IconButton } from "@wordpress/components";
import { dispatch } from "@wordpress/data";
import { createBlock } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { Attributes } from "../editor/attributes";
import { EntryPoint as DynablocksAccordionColumnElement } from "../../accordion-column-element/frontend";
import { Col } from "react-bootstrap";

export interface ColumnProps extends Attributes {
  editMode?: boolean;
  isSelected?: boolean;
  clientId?: string;
  numberOfElements: number;
}

export default (props: ColumnProps): JSX.Element => {
  const {
    editMode,
    isSelected,
    clientId,
    numberOfElements,
    innerBlocks,
    blockOrder
  } = props;

  // NOTE: render template from the root parent block, if this is not root then render an Innerblocks with template
  return (
    <Col
      {...{
        className: "s4tw-dynablocks-accordion-column",
        style: { outline: isSelected ? "3px solid #0093dc" : undefined }
      }}
    >
      {editMode ? (
        <InnerBlocks
          {...{
            allowedBlocks: ["s4tw/dynablocks-accordion-column-element"],
            renderAppender: () => (
              <IconButton
                {...{
                  icon: "insert",
                  className:
                    "components-button block-list-appender__toggle block-editor-button-block-appender",
                  onClick: () => {
                    if (!clientId) return;
                    const innerBlock = createBlock(
                      "s4tw/dynablocks-accordion-column-element"
                    );
                    dispatch("core/block-editor").insertBlock(
                      innerBlock,
                      numberOfElements,
                      clientId,
                      false
                    );
                  }
                }}
              >
                {__("Add a Column Element")}
              </IconButton>
            )
          }}
        />
      ) : (
        blockOrder.map(entry => (
          <DynablocksAccordionColumnElement
            {...{
              ...innerBlocks[entry].attributes,
              isOpen: true
            }}
          />
        ))
      )}
    </Col>
  );
};
