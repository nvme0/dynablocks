import { BlockAttribute } from "@wordpress/blocks";
import {
  Attributes as ResponsiveAttributes,
  BlockAttributes as ResponsiveBlockAttributes
} from "../../../common/Components/Controls/ResponsiveControls/attributes";

export interface Attributes extends ResponsiveAttributes {
  align: string;
  height: string;
}

export interface BlockAttributes extends ResponsiveBlockAttributes {
  align: BlockAttribute<Attributes["align"]>;
  height: BlockAttribute<Attributes["height"]>;
}
