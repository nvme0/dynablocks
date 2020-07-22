import { BlockConfiguration } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { commonDefaults } from "@inspirewebdesigns/dynablocks-common/dist/blockConfiguration";

export const icon = "format-image";

export const name = "s4tw/dynablocks-image-block";

export const settings: BlockConfiguration<any> = {
  ...commonDefaults,
  title: __("Image Cover Block"),
  description: __("Add an image cover block."),
  icon,
  category: __("s4tw-dynablocks"),
  keywords: [__("column"), __("grid"), __("row")]
};
