import { BlockConfiguration } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { commonDefaults } from "@inspirewebdesigns/dynablocks-common/dist/blockConfiguration";
import icon from "./icon";

export { default as icon } from "./icon";

export const name = "s4tw/dynablocks-columns";

export const settings: BlockConfiguration<any> = {
  ...commonDefaults,
  title: __("Responsive Columns"),
  description: __("Add a responsive columns block."),
  icon: icon as any,
  category: "s4tw-dynablocks",
  keywords: ["column", "grid", "row"]
};
