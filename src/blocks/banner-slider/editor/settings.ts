import { BlockConfiguration } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { commonDefaults } from "@inspirewebdesigns/dynablocks-common/dist/blockConfiguration";

export const icon = "format-gallery";

export const name = "s4tw/dynablocks-banner-slider";

export const settings: BlockConfiguration<any> = {
  ...commonDefaults,
  title: __("Banner Slider"),
  description: __("Block to generate Banner Slider"),
  icon,
  category: "s4tw-dynablocks"
};
