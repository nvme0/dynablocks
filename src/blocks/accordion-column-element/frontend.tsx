import Element from "./Components/Element";
import { Attributes } from "./editor/attributes";

export const className = ".s4tw-dynablocks-accordion-column-element";

export interface EntryPointProps {
  isOpen: boolean;
}

export type Props = EntryPointProps & Attributes;

export const EntryPoint = (props: Props): JSX.Element => {
  return <Element {...props} />;
};
