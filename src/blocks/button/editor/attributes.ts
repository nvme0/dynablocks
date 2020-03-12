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
  buttonText: string;
}

export interface BlockAttributes
  extends ButtonBlockAttributes,
    ResponsiveBlockAttributes {
  buttonText: BlockAttribute<Attributes["buttonText"]>;
}
