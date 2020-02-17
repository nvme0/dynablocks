import { Columns } from "./Components/Columns";
import { Attributes } from "./editor/attributes";

export const className = ".s4tw-dynablocks-columns";

export const EntryPoint = (props: Attributes): JSX.Element => (
  <Columns {...{ ...props, size: { width: null, height: null } }} />
);
