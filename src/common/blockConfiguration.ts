import { BlockConfiguration } from "@wordpress/blocks";

export const commonDefaults: BlockConfiguration<any> = {
  title: "",
  category: "",
  attributes: {},
  supports: {
    align: ["left", "center", "right", "full", "wide"]
  },
  getEditWrapperProps({ align }) {
    if (
      "left" === align ||
      "right" === align ||
      "full" === align ||
      "wide" === align
    ) {
      return { "data-align": align };
    }
    return { "data-align": "" };
  }
};
