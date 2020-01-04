import { BlockAttribute } from "@wordpress/blocks";
import { Tag } from "../Components/ContainerElement";

export interface Attributes {
  align: string;
  tag: Tag;
}

export interface BlockAttributes {
  align: BlockAttribute<Attributes["align"]>;
  tag: BlockAttribute<Attributes["tag"]>;
}
