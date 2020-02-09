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
  align: string;
}

export interface BlockAttributes
  extends ResponsiveBlockAttributes,
    SpacerBlockAttributes {
  align: BlockAttribute<Attributes["align"]>;
}
