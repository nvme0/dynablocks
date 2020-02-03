import { BlockAttribute } from "@wordpress/blocks";

export interface Attributes {
  align: string;
  height: string;
  resizeRatio: number;
}

export interface BlockAttributes {
  align: BlockAttribute<Attributes["align"]>;
  height: BlockAttribute<Attributes["height"]>;
  resizeRatio: BlockAttribute<Attributes["resizeRatio"]>;
}
