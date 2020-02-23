import { BlockAttribute, BlockInstance } from "@wordpress/blocks";
import { Attributes as ColumnAttributes } from "../../accordion-column/editor/attributes";
import {
  Attributes as ResponsiveAttributes,
  BlockAttributes as ResponsiveBlockAttributes
} from "../../../common/Components/Controls/ResponsiveControls/attributes";

export interface Attributes extends ResponsiveAttributes {
  editorId?: string;
  align: "center" | "full" | "wide";
  blockOrder: string[];
  innerBlocks: { [x: string]: BlockInstance<ColumnAttributes> };
  titleTextAlign: "left" | "center" | "right";
  headingTextAlign: "left" | "center" | "right";
  bodyTextAlign: "left" | "center" | "right";
  titleText: string;
  titleFontSize: string;
  titleColor: string;
  titleMargin: { bottom: string };
  headingFontSize: string;
  headingColor: string;
  bodyFontSize: string;
  bodyColor: string;
  columnBreaks: { [x: string]: number };
}

export interface BlockAttributes extends ResponsiveBlockAttributes {
  editorId: BlockAttribute<Attributes["editorId"]>;
  align: BlockAttribute<Attributes["align"]>;
  blockOrder: BlockAttribute<Attributes["blockOrder"]>;
  innerBlocks: BlockAttribute<Attributes["innerBlocks"]>;
  titleTextAlign: BlockAttribute<Attributes["titleTextAlign"]>;
  headingTextAlign: BlockAttribute<Attributes["headingTextAlign"]>;
  bodyTextAlign: BlockAttribute<Attributes["bodyTextAlign"]>;
  titleText: BlockAttribute<Attributes["titleText"]>;
  titleFontSize: BlockAttribute<Attributes["titleFontSize"]>;
  titleColor: BlockAttribute<Attributes["titleColor"]>;
  titleMargin: BlockAttribute<Attributes["titleMargin"]>;
  headingFontSize: BlockAttribute<Attributes["headingFontSize"]>;
  headingColor: BlockAttribute<Attributes["headingColor"]>;
  bodyFontSize: BlockAttribute<Attributes["bodyFontSize"]>;
  bodyColor: BlockAttribute<Attributes["bodyColor"]>;
  columnBreaks: BlockAttribute<Attributes["columnBreaks"]>;
}
