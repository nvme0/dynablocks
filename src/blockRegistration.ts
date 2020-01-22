import { registerBlockType } from "@wordpress/blocks";
import { removeAttributes } from "./common/helpers";

const context = require.context("./blocks", true, /editor\.tsx$/);

context.keys().forEach(modulePath => {
  const { name, settings } = context(modulePath);
  registerBlockType(name, removeAttributes(settings));
});
