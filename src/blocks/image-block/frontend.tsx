import Divider from "./Components/Divider";
import { Attributes } from "./editor/attributes";

export const className = ".s4tw-dynablocks-image-block";

export const EntryPoint = (props: Attributes): JSX.Element => (
  <Divider {...props} />
);
