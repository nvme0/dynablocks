import { BlockConfiguration } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { commonDefaults } from "../../../common/blockConfiguration";
import icon from "./icon";

export { default as icon } from "./icon";

export const name = "s4tw/dynablocks-button";

export const settings: BlockConfiguration<any> = {
  ...commonDefaults,
  supports: {
    ...commonDefaults["supports"],
    align: ["left", "center", "right"]
  },
  title: __("Button"),
  description: __("Add a button block."),
  icon: icon as any,
  category: "s4tw-dynablocks"
};
