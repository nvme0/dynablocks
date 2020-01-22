import Slider from "./Components/Slider";
import { Attributes } from "./editor/attributes";

export const className = ".s4tw-dynablocks-banner-slider";

export const EntryPoint = (props: Attributes): JSX.Element => (
  <Slider {...props} />
);
