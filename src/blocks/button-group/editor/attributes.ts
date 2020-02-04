import { BlockAttribute, BlockInstance } from "@wordpress/blocks";
import { Attributes as ButtonAttributes } from "../../button/editor/attributes";

export interface Attributes {
  parentId?: string;
  relationship?: string;
  align: "left" | "center" | "right";
  blockOrder: string[];
  innerBlocks: { [x: string]: BlockInstance<ButtonAttributes> };
}

export interface BlockAttributes {
  parentId: BlockAttribute<Attributes["parentId"]>;
  relationship: BlockAttribute<Attributes["relationship"]>;
  align: BlockAttribute<Attributes["align"]>;
  blockOrder: BlockAttribute<Attributes["blockOrder"]>;
  innerBlocks: BlockAttribute<Attributes["innerBlocks"]>;
}
