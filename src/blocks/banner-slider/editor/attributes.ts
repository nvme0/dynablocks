import { BlockAttribute, BlockInstance } from "@wordpress/blocks";
import {
  Attributes as ResponsiveAttributes,
  BlockAttributes as ResponsiveBlockAttributes
} from "../../../common/Components/Controls/ResponsiveControls/attributes";
import { Image } from "../../../common/Components/Controls/ImagePlaceholder";
import { Attributes as ButtonGroupAttributes } from "../../button-group/editor/attributes";
import { PositionEntry, Limits } from "../../../common/HOCs/withDraggable";

export interface Attributes extends ResponsiveAttributes {
  editorId?: string;
  align: string;
  backgroundImages: Image[];
  filterColor: string;
  h2Text: string;
  h2TextAlignment: "left" | "center" | "right";
  h2FontSize: string;
  h2MarginBottom: string;
  h2Color: string;
  height: string;
  elementsPosition: { left: PositionEntry; top: PositionEntry };
  elementsPositionLimits: Limits;
  elementsTranslate: { left: PositionEntry; top: PositionEntry };
  blockOrder: string[];
  innerBlocks: { [x: string]: BlockInstance<ButtonGroupAttributes> };
}

export interface BlockAttributes extends ResponsiveBlockAttributes {
  editorId: BlockAttribute<Attributes["editorId"]>;
  align: BlockAttribute<Attributes["align"]>;
  backgroundImages: BlockAttribute<Attributes["backgroundImages"]>;
  filterColor: BlockAttribute<Attributes["filterColor"]>;
  h2Text: BlockAttribute<Attributes["h2Text"]>;
  h2TextAlignment: BlockAttribute<Attributes["h2TextAlignment"]>;
  h2FontSize: BlockAttribute<Attributes["h2FontSize"]>;
  h2MarginBottom: BlockAttribute<Attributes["h2MarginBottom"]>;
  h2Color: BlockAttribute<Attributes["h2Color"]>;
  height: BlockAttribute<Attributes["height"]>;
  elementsPosition: BlockAttribute<Attributes["elementsPosition"]>;
  elementsPositionLimits: BlockAttribute<Attributes["elementsPositionLimits"]>;
  elementsTranslate: BlockAttribute<Attributes["elementsPosition"]>;
  blockOrder: BlockAttribute<Attributes["blockOrder"]>;
  innerBlocks: BlockAttribute<Attributes["innerBlocks"]>;
}
