import { BlockConfiguration } from "@wordpress/blocks";
import { Edit } from "./editor/Edit";
import { settings as baseSettings } from "./editor/settings";

export { name } from "./editor/settings";

export const settings: BlockConfiguration<any> = {
  ...baseSettings,
  edit: props => <Edit {...props} />
};
