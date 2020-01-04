import { registerBlockType, BlockConfiguration } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import Edit from "./editor/Edit";
import { removeAttributes } from "../../common/helpers";

const settings: BlockConfiguration<any> = {
  title: __("Post Carousel"),
  description: __("Block to generate Post Carousel"),
  icon: "admin-post",
  category: __("s4tw-dynablocks"),
  attributes: {},
  keywords: [__("Post"), __("header"), __("Carousel")],
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

registerBlockType("s4tw/dynablocks-post-carousel", removeAttributes(settings));
