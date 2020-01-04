import { registerBlockType, BlockConfiguration } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import Edit from "./editor/Edit";
import { removeAttributes } from "../../common/helpers";

const settings: BlockConfiguration<any> = {
  title: __("Image Block"),
  description: __("Add an image block."),
  icon: "format-image",
  category: __("s4tw-dynablocks"),
  attributes: {},
  keywords: [__("column"), __("grid"), __("row")],
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

registerBlockType("s4tw/dynablocks-image-block", removeAttributes(settings));
