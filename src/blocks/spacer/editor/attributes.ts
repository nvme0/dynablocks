import { BlockAttribute } from "@wordpress/blocks";
import {
  Attributes as ResponsiveAttributes,
  BlockAttributes as ResponsiveBlockAttributes
} from "../../../common/Components/Controls/ResponsiveControls/attributes";

export interface Attributes extends ResponsiveAttributes {
  parentId?: string;
  relationship?: string;
  align: string;
  height: string;
}

export interface BlockAttributes extends ResponsiveBlockAttributes {
  parentId: BlockAttribute<Attributes["parentId"]>;
  relationship: BlockAttribute<Attributes["relationship"]>;
  align: BlockAttribute<Attributes["align"]>;
  height: BlockAttribute<Attributes["height"]>;
}
