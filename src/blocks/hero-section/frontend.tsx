import Hero from "./Components/Hero";
import { Attributes } from "./editor/attributes";

export const className = ".s4tw-dynablocks-hero-section";

export const EntryPoint = (props: Attributes): JSX.Element => (
  <Hero {...props} />
);
