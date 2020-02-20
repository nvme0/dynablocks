import { BlockAttribute } from "@wordpress/blocks";

export interface Attributes {
  height?: string;
  width?: string;
  resizeRatio: number;
}

export interface BlockAttributes {
  height: BlockAttribute<Attributes["height"]>;
  width: BlockAttribute<Attributes["width"]>;
  resizeRatio: BlockAttribute<Attributes["resizeRatio"]>;
}
