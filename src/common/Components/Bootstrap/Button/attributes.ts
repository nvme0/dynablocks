import { BlockAttribute } from "@wordpress/blocks";
import { PositionEntry, Limits } from "../../../HOCs/withDraggable";

export interface Attributes {
  buttonUrl: string;
  buttonStyle: "primary" | "secondary";
  buttonFontSize: "small" | "medium" | "large" | string; // padding: 0.375 * fontSize 0.75 * fontSize
  buttonColor: string;
  buttonHoverColor: string;
  buttonPrimaryColor: string; // outline ? borderColor : backgroundcolor
  buttonBorderRadius: string;
  buttonBorderWidth: string;
  buttonBorderStyle:
    | "solid"
    | "dotted"
    | "dashed"
    | "double"
    | "groove"
    | "ridge"
    | "inset"
    | "outset"
    | "none"
    | "hidden";
  buttonPosition: { left: PositionEntry; top: PositionEntry };
  buttonPositionLimits: Limits;
}

export interface BlockAttributes {
  buttonUrl: BlockAttribute<Attributes["buttonUrl"]>;
  buttonStyle: BlockAttribute<Attributes["buttonStyle"]>;
  buttonFontSize: BlockAttribute<Attributes["buttonFontSize"]>;
  buttonColor: BlockAttribute<Attributes["buttonColor"]>;
  buttonHoverColor: BlockAttribute<Attributes["buttonHoverColor"]>;
  buttonPrimaryColor: BlockAttribute<Attributes["buttonPrimaryColor"]>;
  buttonBorderRadius: BlockAttribute<Attributes["buttonBorderRadius"]>;
  buttonBorderWidth: BlockAttribute<Attributes["buttonBorderWidth"]>;
  buttonBorderStyle: BlockAttribute<Attributes["buttonBorderStyle"]>;
  buttonPosition: BlockAttribute<Attributes["buttonPosition"]>;
  buttonPositionLimits: BlockAttribute<Attributes["buttonPositionLimits"]>;
}
