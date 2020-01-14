import { registerBlockType, BlockConfiguration } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import Edit from "./editor/Edit";
import { removeAttributes } from "../../common/helpers";

export const icon = "format-gallery";

const settings: BlockConfiguration<any> = {
  title: __("Banner Slider"),
  description: __("Block to generate Banner Slider"),
  icon,
  category: __("s4tw-dynablocks"),
  attributes: {},
  supports: {
    align: ["left", "center", "right", "full", "wide"]
  },
  getEditWrapperProps({ align }) {
    if (
      "left" === align ||
      "right" === align ||
      "full" === align ||
      "wide" === align
    ) {
      return { "data-align": align };
    }
    return { "data-align": "" };
  },
  edit: props => <Edit {...props} />
};

registerBlockType("s4tw/dynablocks-banner-slider", removeAttributes(settings));
