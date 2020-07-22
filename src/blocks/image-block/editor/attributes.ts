import { BlockAttribute } from "@wordpress/blocks";
import { Image } from "@inspirewebdesigns/dynablocks-common/dist/Components/Controls/ImagePlaceholder";

export type BackgroundPositionOptions =
  | "left top"
  | "left center"
  | "left bottom"
  | "right top"
  | "right center"
  | "right bottom"
  | "center top"
  | "center center"
  | "center bottom"
  | "custom";

export interface Attributes {
  align: "center" | "full" | "wide";
  backgroundImage: Image;
  backgroundImageSize: string;
  filterColor: string;
  height: string;
  margin: { top: number; right: number; bottom: number; left: number };
  backgroundPosition: {
    type: BackgroundPositionOptions;
    x: { value: number; units: "px" | "em" | "%" | "vw" };
    y: { value: number; units: "px" | "em" | "%" | "vh" };
  };
}

export interface BlockAttributes {
  align: BlockAttribute<Attributes["align"]>;
  backgroundImage: BlockAttribute<Attributes["backgroundImage"]>;
  backgroundImageSize: BlockAttribute<Attributes["backgroundImage"]>;
  filterColor: BlockAttribute<Attributes["backgroundImage"]>;
  height: BlockAttribute<Attributes["height"]>;
  margin: BlockAttribute<Attributes["margin"]>;
  backgroundPosition: BlockAttribute<Attributes["margin"]>;
}
