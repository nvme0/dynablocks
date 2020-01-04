import { BlockAttribute } from "@wordpress/blocks";

export interface Attributes {
  align: string;
  backgroundImage: number | undefined;
  height: string;
}

export interface BlockAttributes {
  align: BlockAttribute<Attributes["align"]>;
  backgroundImage: BlockAttribute<Attributes["backgroundImage"]>;
  height: BlockAttribute<Attributes["height"]>;
}
