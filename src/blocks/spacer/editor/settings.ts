import { BlockConfiguration } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { commonDefaults } from "../../../common/blockConfiguration";

export const icon = "editor-insertmore";

export const name = "s4tw/dynablocks-spacer";

export const settings: BlockConfiguration<any> = {
  ...commonDefaults,
  title: __("Spacer"),
  description: __("Block to generate Spacer"),
  icon,
  category: "s4tw-dynablocks"
};
