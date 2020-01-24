import { BlockAttribute, BlockInstance } from "@wordpress/blocks";
import {
  Attributes as ResponsiveAttributes,
  BlockAttributes as ResponsiveBlockAttributes
} from "../../../common/Components/Controls/ResponsiveControls/attributes";
import { Attributes as ButtonAttributes } from "../../button/editor/attributes";

export interface Image {
  alt: string;
  caption: string;
  id: number;
  link: string;
  mime: string;
  sizes: any;
  subtype: string;
  type: string;
  url: string;
}

export interface Attributes extends ResponsiveAttributes {
  align: string;
  backgroundImages: Image[];
  filterColor: string;
  h2Text: string;
  h2FontSize: string;
  h2MarginBottom: string;
  h2Color: string;
  height: string;
  // innerBlocks: { [clientId: string]: any };
  innerBlocks: { "button-0": BlockInstance<ButtonAttributes> };
}

export interface BlockAttributes extends ResponsiveBlockAttributes {
  align: BlockAttribute<Attributes["align"]>;
  backgroundImages: BlockAttribute<Attributes["backgroundImages"]>;
  filterColor: BlockAttribute<Attributes["filterColor"]>;
  h2Text: BlockAttribute<Attributes["h2Text"]>;
  h2FontSize: BlockAttribute<Attributes["h2FontSize"]>;
  h2MarginBottom: BlockAttribute<Attributes["h2MarginBottom"]>;
  h2Color: BlockAttribute<Attributes["h2Color"]>;
  height: BlockAttribute<Attributes["height"]>;
  innerBlocks: BlockAttribute<Attributes["innerBlocks"]>;
}
