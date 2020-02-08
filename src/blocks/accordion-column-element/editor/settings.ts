import { BlockConfiguration } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { commonDefaults } from "../../../common/blockConfiguration";
import icon from "./icon";

export { default as icon } from "./icon";

export const name = "s4tw/dynablocks-accordion-column-element";

export const settings: BlockConfiguration<any> = {
  ...commonDefaults,
  supports: {
    ...commonDefaults["supports"],
    align: []
  },
  parent: ["s4tw/dynablocks-accordion-column"],
  title: __("Accordion Column Element"),
  description: __("Add an accordion column element block."),
  icon: icon as any,
  category: "s4tw-dynablocks"
};
