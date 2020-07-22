import { BlockConfiguration } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { commonDefaults } from "@inspirewebdesigns/dynablocks-common/dist/blockConfiguration";
import icon from "./icon";

export { default as icon } from "./icon";

export const name = "s4tw/dynablocks-button";

export const settings: BlockConfiguration<any> = {
  ...commonDefaults,
  supports: {
    ...commonDefaults["supports"],
    align: []
  },
  parent: ["s4tw/dynablocks-button-group"],
  title: __("Button"),
  description: __("Add a button block."),
  icon: icon as any,
  category: "s4tw-dynablocks"
};
