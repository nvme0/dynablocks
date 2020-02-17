import { BlockConfiguration } from "@wordpress/blocks";
import { Edit } from "./editor/Edit";
import Save from "../../common/Save";
import { settings as baseSettings } from "./editor/settings";
import { InnerBlocks } from "@wordpress/block-editor";
import { Fragment } from "@wordpress/element";

export { name } from "./editor/settings";

export const settings: BlockConfiguration<any> = {
  ...baseSettings,
  edit: props => <Edit {...props} />,
  save: props => (
    <Fragment>
      <Save {...props} />
      <InnerBlocks.Content />
    </Fragment>
  )
};
