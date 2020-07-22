import { BlockConfiguration } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { commonDefaults } from "@inspirewebdesigns/dynablocks-common/dist/blockConfiguration";

export const icon = "admin-post";

export const name = "s4tw/dynablocks-post-carousel";

export const settings: BlockConfiguration<any> = {
  ...commonDefaults,
  title: __("Post Carousel"),
  description: __("Block to generate Post Carousel"),
  icon,
  category: __("s4tw-dynablocks"),
  keywords: [__("Post"), __("header"), __("Carousel")]
};
