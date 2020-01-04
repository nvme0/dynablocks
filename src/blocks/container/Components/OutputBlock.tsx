import { InnerBlocks } from "@wordpress/block-editor";

export type Type = "Edit" | "Save";

export default (props: { type: Type }): JSX.Element => {
  const { type } = props;
  switch (type) {
    case "Edit":
      return <InnerBlocks />;
    case "Save":
      return <InnerBlocks.Content />;
    default:
      throw `S4TW-BLOCK-KIT-TYPE-1: Components: ContainerElement: OutputBlock: Type: "${type}" is invalid, must be "Edit" or "Save".`;
  }
};
