import { BlockConfiguration } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { commonDefaults } from "@solutions4theweb/dynablocks-common/dist/blockConfiguration";

export const icon = "welcome-view-site";

export const name = "s4tw/dynablocks-hero-section";

export const settings: BlockConfiguration<any> = {
  ...commonDefaults,
  title: __("Hero Section"),
  description: __("Block to generate hero section"),
  icon,
  category: __("s4tw-dynablocks"),
  keywords: [__("hero"), __("header")]
};
