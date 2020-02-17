import { BlockConfiguration } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { commonDefaults } from "../../../common/blockConfiguration";

export const icon = "grid-view";

export const name = "s4tw/dynablocks-columns-element";

export const settings: BlockConfiguration<any> = {
  ...commonDefaults,
  title: __("Element"),
  description: __("Add an element inside the columns block."),
  icon,
  parent: ["s4tw/dynablocks-columns"],
  category: "s4tw-dynablocks",
  keywords: ["column", "grid", "row"]
};
