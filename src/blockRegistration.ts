import { registerBlockType } from "@wordpress/blocks";
import { removeAttributes } from "./common/helpers";

const context = require.context("./blocks", true, /editor\.tsx$/);

context.keys().forEach(modulePath => {
  const block = context(modulePath);
  registerBlockType(block["name"], removeAttributes(block["settings"]));
});
