import { registerBlockType } from "@wordpress/blocks";
import { removeAttributes } from "@solutions4theweb/dynablocks-common/dist/helpers";

const context = require.context("./blocks", true, /editor\.tsx$/);

context.keys().forEach(modulePath => {
  const { name, settings } = context(modulePath);
  registerBlockType(name, removeAttributes(settings));
});
