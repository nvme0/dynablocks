import { BlockAttribute } from "@wordpress/blocks";

export interface Attributes {
  align: string;
}

export interface BlockAttributes {
  align: BlockAttribute<Attributes["align"]>;
}
