import { BlockAttribute } from "@wordpress/blocks";
import {
  Attributes as ButtonAttributes,
  BlockAttributes as ButtonBlockAttributes
} from "../../../common/Components/Bootstrap/Button/attributes";
import {
  Attributes as ResponsiveAttributes,
  BlockAttributes as ResponsiveBlockAttributes
} from "../../../common/Components/Controls/ResponsiveControls/attributes";

export interface Attributes extends ButtonAttributes, ResponsiveAttributes {
  align: string;
  backgroundImage: number | undefined;
  filterColor: string;
  h2Text: string;
  h2Color: string;
  h2FontSize: string;
  h2MarginBottom: string;
  keywords: string;
  keywordsColor: string;
  keywordsInterval: number;
  buttonText: string;
  height: string;
}

export interface BlockAttributes
  extends ButtonBlockAttributes,
    ResponsiveBlockAttributes {
  align: BlockAttribute<Attributes["align"]>;
  backgroundImage: BlockAttribute<Attributes["backgroundImage"]>;
  filterColor: BlockAttribute<Attributes["filterColor"]>;
  h2Text: BlockAttribute<Attributes["h2Text"]>;
  h2Color: BlockAttribute<Attributes["h2Color"]>;
  h2FontSize: BlockAttribute<Attributes["h2FontSize"]>;
  h2MarginBottom: BlockAttribute<Attributes["h2MarginBottom"]>;
  keywords: BlockAttribute<Attributes["keywords"]>;
  keywordsColor: BlockAttribute<Attributes["keywordsColor"]>;
  keywordsInterval: BlockAttribute<Attributes["keywordsInterval"]>;
  buttonText: BlockAttribute<Attributes["buttonText"]>;
  height: BlockAttribute<Attributes["height"]>;
}
