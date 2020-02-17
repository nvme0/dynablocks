import { BlockAttribute, BlockInstance } from "@wordpress/blocks";
import { Attributes as ColumnAttributes } from "../../columns-element/editor/attributes";
import {
  Attributes as ResponsiveAttributes,
  BlockAttributes as ResponsiveBlockAttributes
} from "../../../common/Components/Controls/ResponsiveControls/attributes";

export interface Attributes extends ResponsiveAttributes {
  editorId?: string;
  align: "center" | "full" | "wide";
  blockOrder: string[];
  innerBlocks: { [x: string]: BlockInstance<ColumnAttributes> };
  columnBreaks: { [x: string]: number };
  columns: { [x: string]: number[] };
  gridGaps: { row: number; column: number };
  editorOptions: {
    gridSnap: boolean;
    gridShow: "back" | "front" | "hide";
    gridSize: { [x: string]: number };
  };
}

export interface BlockAttributes extends ResponsiveBlockAttributes {
  editorId: BlockAttribute<Attributes["editorId"]>;
  align: BlockAttribute<Attributes["align"]>;
  blockOrder: BlockAttribute<Attributes["blockOrder"]>;
  innerBlocks: BlockAttribute<Attributes["innerBlocks"]>;
  columnBreaks: BlockAttribute<Attributes["columnBreaks"]>;
  columns: BlockAttribute<Attributes["columns"]>;
  gridGaps: BlockAttribute<Attributes["gridGaps"]>;
  editorOptions: BlockAttribute<Attributes["editorOptions"]>;
}
