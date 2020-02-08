import { BlockAttribute } from "@wordpress/blocks";

export interface Attributes {
  editorId?: string;
  headingText: string;
  bodyText: string;
}

export interface BlockAttributes {
  editorId: BlockAttribute<Attributes["editorId"]>;
  headingText: BlockAttribute<Attributes["headingText"]>;
  bodyText: BlockAttribute<Attributes["bodyText"]>;
}
