import { BlockAttribute } from "@wordpress/blocks";
import {
  Attributes as ResponsiveAttributes,
  BlockAttributes as ResponsiveBlockAttributes
} from "../../../common/Components/Controls/ResponsiveControls/attributes";
import {
  Attributes as SpacerAttributes,
  BlockAttributes as SpacerBlockAttributes
} from "../../../common/Components/Spacer/attributes";

export interface Attributes extends ResponsiveAttributes, SpacerAttributes {
  parentId?: string;
  relationship?: string;
  align: string;
}

export interface BlockAttributes
  extends ResponsiveBlockAttributes,
    SpacerBlockAttributes {
  parentId: BlockAttribute<Attributes["parentId"]>;
  relationship: BlockAttribute<Attributes["relationship"]>;
  align: BlockAttribute<Attributes["align"]>;
}
