import { BlockConfiguration } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { commonDefaults } from "@solutions4theweb/dynablocks-common/dist/blockConfiguration";
import icon from "./icon";

export { default as icon } from "./icon";

export const name = "s4tw/dynablocks-accordion-column";

export const settings: BlockConfiguration<any> = {
  ...commonDefaults,
  supports: {
    ...commonDefaults["supports"],
    align: []
  },
  parent: ["s4tw/dynablocks-accordion"],
  title: __("Accordion Column"),
  description: __("Add an accordion column block."),
  icon: icon as any,
  category: "s4tw-dynablocks"
};
