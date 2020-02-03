import { Attributes } from "./editor/attributes";
import Spacer from "../../common/Components/Spacer";

export const className = ".s4tw-dynablocks-spacer";

export const EntryPoint = (props: Attributes): JSX.Element => (
  <div className="s4tw-dynablocks-spacer">
    <Spacer {...props} />
  </div>
);
