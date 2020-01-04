import { BlockAttribute } from "@wordpress/blocks";

export interface Attributes {
  responsive: boolean;
  scaleTablet: number;
  scaleMobile: number;
  minWidthDesktop: string;
  minWidthTablet: string;
}

export interface BlockAttributes {
  responsive: BlockAttribute<Attributes["responsive"]>;
  scaleTablet: BlockAttribute<Attributes["scaleTablet"]>;
  scaleMobile: BlockAttribute<Attributes["scaleMobile"]>;
  minWidthDesktop: BlockAttribute<Attributes["minWidthDesktop"]>;
  minWidthTablet: BlockAttribute<Attributes["minWidthTablet"]>;
}
