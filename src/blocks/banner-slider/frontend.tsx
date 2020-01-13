import { render } from "@wordpress/element";
import Slider from "./Components/Slider";
import { getBlocksOfType } from "../../common/helpers";

const blocks = getBlocksOfType(".s4tw-dynablocks-banner-slider");
blocks.forEach(({ block, props }) => {
  render(<Slider {...JSON.parse(props)} />, block);
});
