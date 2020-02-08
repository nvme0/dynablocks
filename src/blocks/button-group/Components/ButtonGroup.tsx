import { InnerBlocks } from "@wordpress/block-editor";
import classnames from "classnames";
import { css } from "emotion";
import { Attributes } from "../editor/attributes";
import { EntryPoint as DynablocksButton } from "../../button/frontend";
import {
  generateBlockTemplate,
  generateResponsiveCSS
} from "../../../common/helpers";

export interface ButtonGroupProps extends Attributes {
  clientId?: string;
  editMode?: boolean;
}

export default (props: ButtonGroupProps): JSX.Element => {
  const {
    innerBlocks,
    blockOrder,
    clientId,
    editMode,
    buttonSpacing,
    align,
    responsive = false,
    scaleTablet = 1.0,
    scaleMobile = 1.0,
    minWidthDesktop = "1024px",
    minWidthTablet = "600px"
  } = props;
  const numberOfButtons = Object.keys(innerBlocks).length;

  const template =
    editMode && clientId
      ? generateBlockTemplate(blockOrder, innerBlocks)
      : undefined;

  // TODO - responsive spacing
  const responsiveParameters = [
    { name: "mobile", scale: scaleMobile },
    {
      name: "tablet",
      breakpoint: `@media all and (min-width: ${minWidthTablet})`,
      scale: scaleTablet
    },
    {
      name: "desktop",
      breakpoint: `@media all and (min-width: ${minWidthDesktop})`
    }
  ];

  const marginRightResponsive =
    !editMode && responsive
      ? generateResponsiveCSS(
          [{ name: "marginRight", size: buttonSpacing }],
          responsiveParameters
        )
      : { marginRight: `${buttonSpacing}` };

  return editMode ? (
    <div
      style={{ display: "flex", justifyContent: align }}
      className={classnames(
        "s4tw-dynablocks-button-group",
        css({
          ".block-editor-inner-blocks": {
            ".block-editor-block-list__layout": {
              alignItems: "center",
              [`.wp-block.editor-block-list__block.block-editor-block-list__block:not(:nth-child(${numberOfButtons}))`]: {
                ...marginRightResponsive
              }
            }
          }
        })
      )}
    >
      <InnerBlocks
        {...{
          template,
          allowedBlocks: ["s4tw/dynablocks-button"]
        }}
      />
    </div>
  ) : (
    <div
      style={{ display: "flex", justifyContent: align }}
      className={classnames(
        "s4tw-dynablocks-button-group",
        css({
          alignItems: "center",
          [`.s4tw-dynablocks-button:not(:nth-child(${numberOfButtons}))`]: {
            ...marginRightResponsive
          }
        })
      )}
    >
      {blockOrder.map(entry => (
        <DynablocksButton {...innerBlocks[entry].attributes} />
      ))}
    </div>
  );
};
