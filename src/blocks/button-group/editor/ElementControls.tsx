import { InspectorControls } from "@wordpress/block-editor";
import { IconButton } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { Attributes } from "./attributes";
import {
  TextControl,
  ResponsiveControls
} from "@inspirewebdesigns/dynablocks-common/dist/Components/Controls";
import { dispatch } from "@wordpress/data";
import { createBlock } from "@wordpress/blocks";

export interface ControlProps extends Attributes {
  clientId?: string;
  update: (property: any) => (value: any) => void;
}

export default (props: ControlProps): JSX.Element => {
  const { clientId, update, innerBlocks, buttonSpacing } = props;
  const innerBlocksKeys = Object.keys(innerBlocks);
  const numberOfButtons = innerBlocksKeys.length;

  return (
    <InspectorControls>
      <div style={{ height: "16px" }} />
      <TextControl
        {...{
          name: "Button Spacing:",
          value: buttonSpacing,
          secondary: true,
          update: update("buttonSpacing")
        }}
      />
      <IconButton
        {...{
          icon: "insert",
          className:
            "components-button block-list-appender__toggle block-editor-button-block-appender",
          onClick: () => {
            if (!clientId) return;
            const innerBlock = createBlock("s4tw/dynablocks-button");
            dispatch("core/block-editor").insertBlock(
              innerBlock,
              numberOfButtons,
              clientId,
              false
            );
          },
          disabled: numberOfButtons >= 4
        }}
      >
        {__("Add a Buton")}
      </IconButton>
      <div style={{ height: "16px" }} />
      <ResponsiveControls
        {...{
          ...props,
          initialOpen: false
        }}
      />
    </InspectorControls>
  );
};
