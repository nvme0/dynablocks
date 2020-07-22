import { registerBlockType } from "@wordpress/blocks";
import { removeAttributes } from "@inspirewebdesigns/dynablocks-common/dist/helpers";

const context = require.context("./blocks", true, /editor\.tsx$/);

context.keys().forEach(modulePath => {
  const { name, settings } = context(modulePath);
  registerBlockType(name, removeAttributes(settings));
});
