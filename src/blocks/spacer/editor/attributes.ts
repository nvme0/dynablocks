import { BlockAttribute } from "@wordpress/blocks";
import {
  Attributes as ResponsiveAttributes,
  BlockAttributes as ResponsiveBlockAttributes
} from "@inspirewebdesigns/dynablocks-common/dist/Components/Controls/ResponsiveControls/attributes";
import {
  Attributes as SpacerAttributes,
  BlockAttributes as SpacerBlockAttributes
} from "@inspirewebdesigns/dynablocks-common/dist/Components/Spacer/attributes";

export interface Attributes extends ResponsiveAttributes, SpacerAttributes {
  align: string;
}

export interface BlockAttributes
  extends ResponsiveBlockAttributes,
    SpacerBlockAttributes {
  align: BlockAttribute<Attributes["align"]>;
}
