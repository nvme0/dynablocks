import { registerBlockType } from "@wordpress/blocks";
import { removeAttributes } from "@solutions4theweb/dynablocks-common/dist/helpers";

const context = require.context("./blocks", true, /editor\.dev\.tsx$/);

context.keys().forEach(modulePath => {
  const block = context(modulePath);
  registerBlockType(block["name"], removeAttributes(block["settings"]));
});
