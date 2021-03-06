import { BlockConfiguration } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { commonDefaults } from "@inspirewebdesigns/dynablocks-common/dist/blockConfiguration";
import icon from "./icon";

export { default as icon } from "./icon";

export const name = "s4tw/dynablocks-button-group";

export const settings: BlockConfiguration<any> = {
  ...commonDefaults,
  supports: {
    ...commonDefaults["supports"],
    align: ["left", "center", "right"]
  },
  title: __("Buttons"),
  description: __("Add a button group block."),
  icon: icon as any,
  category: "s4tw-dynablocks"
};
