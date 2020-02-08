import Accordion from "./Components/Accordion";
import { Attributes } from "./editor/attributes";

export const className = ".s4tw-dynablocks-accordion";

export const EntryPoint = (props: Attributes): JSX.Element => {
  return <Accordion {...props} />;
};
