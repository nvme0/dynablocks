import { BlockConfiguration } from "@wordpress/blocks";

export const commonDefaults: BlockConfiguration<any> = {
  title: "",
  category: "",
  attributes: {},
  supports: {
    align: ["center", "full", "wide"],
    html: false
  },
  getEditWrapperProps({ align }) {
    if ("full" === align || "wide" === align) {
      return { "data-align": align };
    }
    return { "data-align": "" };
  }
};
