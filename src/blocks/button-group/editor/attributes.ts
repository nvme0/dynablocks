import { BlockAttribute, BlockInstance } from "@wordpress/blocks";
import { Attributes as ButtonAttributes } from "../../button/editor/attributes";
import {
  Attributes as ResponsiveAttributes,
  BlockAttributes as ResponsiveBlockAttributes
} from "@solutions4theweb/dynablocks-common/dist/Components/Controls/ResponsiveControls/attributes";

export interface Attributes extends ResponsiveAttributes {
  editorId?: string;
  align: "left" | "center" | "right";
  buttonSpacing: string;
  blockOrder: string[];
  innerBlocks: { [x: string]: BlockInstance<ButtonAttributes> };
}

export interface BlockAttributes extends ResponsiveBlockAttributes {
  editorId: BlockAttribute<Attributes["editorId"]>;
  align: BlockAttribute<Attributes["align"]>;
  buttonSpacing: BlockAttribute<Attributes["buttonSpacing"]>;
  blockOrder: BlockAttribute<Attributes["blockOrder"]>;
  innerBlocks: BlockAttribute<Attributes["innerBlocks"]>;
}
