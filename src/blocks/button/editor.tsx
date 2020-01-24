import { BlockConfiguration, BlockEditProps } from "@wordpress/blocks";
import { Edit } from "./editor/Edit";
import { settings as baseSettings } from "./editor/settings";
import { Attributes } from "./editor/attributes";

export { name } from "./editor/settings";

export const settings: BlockConfiguration<any> = {
  ...baseSettings,
  edit: (props: BlockEditProps<Attributes>) => <Edit {...props} />
};
