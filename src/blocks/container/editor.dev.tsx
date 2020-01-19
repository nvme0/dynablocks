import { BlockConfiguration } from "@wordpress/blocks";
import Edit from "./editor/Edit";

import { settings as base } from "./editor";
export { name } from "./editor";

export const settings: BlockConfiguration<any> = {
  ...base,
  edit: props => <Edit {...props} />
};
