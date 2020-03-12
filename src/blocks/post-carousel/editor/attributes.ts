import { BlockAttribute } from "@wordpress/blocks";
import {
  Attributes as ButtonAttributes,
  BlockAttributes as ButtonBlockAttributes
} from "@solutions4theweb/dynablocks-common/dist/Components/Bootstrap/Button/attributes";
import {
  Attributes as ResponsiveAttributes,
  BlockAttributes as ResponsiveBlockAttributes
} from "@solutions4theweb/dynablocks-common/dist/Components/Controls/ResponsiveControls/attributes";

export interface Attributes extends ButtonAttributes, ResponsiveAttributes {
  align: string;
  filterColor: string;
  h2Color: string;
  h2FontSize: string;
  h2MarginBottom: string;
  h3Color: string;
  h3FontSize: string;
  h3MarginBottom: string;
  height: string;
}

export interface BlockAttributes
  extends ButtonBlockAttributes,
    ResponsiveBlockAttributes {
  align: BlockAttribute<Attributes["align"]>;
  filterColor: BlockAttribute<Attributes["filterColor"]>;
  h2Color: BlockAttribute<Attributes["h2Color"]>;
  h2FontSize: BlockAttribute<Attributes["h2FontSize"]>;
  h2MarginBottom: BlockAttribute<Attributes["h2MarginBottom"]>;
  h3Color: BlockAttribute<Attributes["h3Color"]>;
  h3FontSize: BlockAttribute<Attributes["h3FontSize"]>;
  h3MarginBottom: BlockAttribute<Attributes["h3MarginBottom"]>;
  height: BlockAttribute<Attributes["height"]>;
}
