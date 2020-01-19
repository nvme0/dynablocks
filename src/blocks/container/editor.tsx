import { BlockConfiguration } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { commonDefaults } from "../../common/blockConfiguration";
import Edit from "./editor/Edit";
import Save from "./editor/Save";

export const name = "s4tw/dynablocks-container";

export const settings: BlockConfiguration<any> = {
  ...commonDefaults,
  title: __("Container"),
  description: __("Add a container block."),
  icon: "grid-view",
  category: "s4tw-dynablocks",
  keywords: ["column", "grid", "row"],
  edit: props => <Edit {...props} />,
  save: props => <Save {...props} />
};
