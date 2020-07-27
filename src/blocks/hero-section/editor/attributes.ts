import { BlockAttribute, BlockInstance } from "@wordpress/blocks";
import {
  Attributes as ResponsiveAttributes,
  BlockAttributes as ResponsiveBlockAttributes
} from "@inspirewebdesigns/dynablocks-common/dist/Components/Controls/ResponsiveControls/attributes";
import { Image } from "@inspirewebdesigns/dynablocks-common/dist/Components/Controls/ImagePlaceholder";
import { Attributes as ButtonGroupAttributes } from "../../button-group/editor/attributes";
import {
  PositionEntry,
  Limits
} from "@inspirewebdesigns/dynablocks-common/dist/HOCs/withDraggable";

export interface Attributes extends ResponsiveAttributes {
  editorId?: string;
  align: "center" | "full" | "wide";
  backgroundImage: Image;
  backgroundImageSize: string;
  filterColor: string;
  headingType: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  h2Text: string;
  h2TextAlignment: "left" | "center" | "right";
  h2Color: string;
  h2FontSize: string;
  h2MarginBottom: string;
  keywords: string;
  keywordsColor: string;
  keywordsInterval: number;
  height: string;
  hasButton: boolean;
  elementsPosition: { left: PositionEntry; top: PositionEntry };
  elementsPositionLimits: Limits;
  elementsTranslate: { left: PositionEntry; top: PositionEntry };
  blockOrder: string[];
  innerBlocks: { [x: string]: BlockInstance<ButtonGroupAttributes> };
}

export interface BlockAttributes extends ResponsiveBlockAttributes {
  editorId: BlockAttribute<Attributes["editorId"]>;
  align: BlockAttribute<Attributes["align"]>;
  backgroundImage: BlockAttribute<Attributes["backgroundImage"]>;
  filterColor: BlockAttribute<Attributes["filterColor"]>;
  headingType: BlockAttribute<Attributes["headingType"]>;
  h2Text: BlockAttribute<Attributes["h2Text"]>;
  h2TextAlignment: BlockAttribute<Attributes["h2TextAlignment"]>;
  h2Color: BlockAttribute<Attributes["h2Color"]>;
  h2FontSize: BlockAttribute<Attributes["h2FontSize"]>;
  h2MarginBottom: BlockAttribute<Attributes["h2MarginBottom"]>;
  keywords: BlockAttribute<Attributes["keywords"]>;
  keywordsColor: BlockAttribute<Attributes["keywordsColor"]>;
  keywordsInterval: BlockAttribute<Attributes["keywordsInterval"]>;
  height: BlockAttribute<Attributes["height"]>;
  elementsPosition: BlockAttribute<Attributes["elementsPosition"]>;
  elementsPositionLimits: BlockAttribute<Attributes["elementsPositionLimits"]>;
  elementsTranslate: BlockAttribute<Attributes["elementsPosition"]>;
  blockOrder: BlockAttribute<Attributes["blockOrder"]>;
  innerBlocks: BlockAttribute<Attributes["innerBlocks"]>;
}
