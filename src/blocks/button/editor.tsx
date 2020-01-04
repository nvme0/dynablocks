import { registerBlockType, BlockConfiguration } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import Edit from "./editor/Edit";
import icon from "./editor/icon";
import { removeAttributes } from "../../common/helpers";

const settings: BlockConfiguration<any> = {
  title: __("Button"),
  description: __("Add a button block."),
  icon: icon as any,
  category: "s4tw-dynablocks",
  attributes: {},
  keywords: ["column", "grid", "row"],
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

registerBlockType("s4tw/dynablocks-button", removeAttributes(settings));
