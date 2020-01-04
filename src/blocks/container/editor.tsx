import { registerBlockType, BlockConfiguration } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import Edit from "./editor/Edit";
import Save from "./editor/Save";
import { removeAttributes } from "../../common/helpers";

const settings: BlockConfiguration<any> = {
  title: __("Container"),
  description: __("Add a container block."),
  icon: "grid-view",
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
  edit: props => <Edit {...props} />,
  save: props => <Save {...props} />
};

registerBlockType("s4tw/dynablocks-container", removeAttributes(settings));
