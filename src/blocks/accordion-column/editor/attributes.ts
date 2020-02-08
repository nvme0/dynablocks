import { BlockAttribute, BlockInstance } from "@wordpress/blocks";
import { Attributes as ElementAttributes } from "../../accordion-column-element/editor/attributes";

export interface Attributes {
  blockOrder: string[];
  innerBlocks: { [x: string]: BlockInstance<ElementAttributes> };
}

export interface BlockAttributes {
  blockOrder: BlockAttribute<Attributes["blockOrder"]>;
  innerBlocks: BlockAttribute<Attributes["innerBlocks"]>;
}
