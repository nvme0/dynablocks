import ButtonGroup from "./Components/ButtonGroup";
import { Attributes } from "./editor/attributes";

export const className = ".s4tw-dynablocks-button-group";

export const EntryPoint = (props: Attributes): JSX.Element => {
  return <ButtonGroup {...props} />;
};
