import { BlockAttribute } from "@wordpress/blocks";
import { Image } from "../../../common/Components/Controls/ImagePlaceholder";

export interface Attributes {
  align: "center" | "full" | "wide";
  backgroundImage: Image;
  backgroundImageSize: string;
  filterColor: string;
  height: string;
  margin: { top: number; right: number; bottom: number; left: number };
}

export interface BlockAttributes {
  align: BlockAttribute<Attributes["align"]>;
  backgroundImage: BlockAttribute<Attributes["backgroundImage"]>;
  backgroundImageSize: BlockAttribute<Attributes["backgroundImage"]>;
  filterColor: BlockAttribute<Attributes["backgroundImage"]>;
  height: BlockAttribute<Attributes["height"]>;
  margin: BlockAttribute<Attributes["margin"]>;
}
