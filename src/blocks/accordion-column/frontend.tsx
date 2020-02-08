import Column from "./Components/Column";
import { Attributes } from "./editor/attributes";

export const className = ".s4tw-dynablocks-accordion-column";

export const EntryPoint = (props: Attributes): JSX.Element => {
  return <Column {...props} />;
};
