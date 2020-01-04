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
  backgroundImages: any[];
  filterColor: string;
  h2Text: string;
  h2FontSize: string;
  h2MarginBottom: string;
  h2Color: string;
  buttonText: string;
  height: string;
}

export interface BlockAttributes
  extends ButtonBlockAttributes,
    ResponsiveBlockAttributes {
  align: BlockAttribute<Attributes["align"]>;
  backgroundImages: BlockAttribute<Attributes["backgroundImages"]>;
  filterColor: BlockAttribute<Attributes["filterColor"]>;
  h2Text: BlockAttribute<Attributes["h2Text"]>;
  h2FontSize: BlockAttribute<Attributes["h2FontSize"]>;
  h2MarginBottom: BlockAttribute<Attributes["h2MarginBottom"]>;
  h2Color: BlockAttribute<Attributes["h2Color"]>;
  buttonText: BlockAttribute<Attributes["buttonText"]>;
  height: BlockAttribute<Attributes["height"]>;
}
