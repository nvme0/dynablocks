import { render } from "@wordpress/element";
import Hero from "./Components/Hero";
import { getBlocksOfType } from "../../common/helpers";

const blocks = getBlocksOfType(".s4tw-dynablocks-hero-section");
blocks.forEach(({ block, props }) => {
  render(<Hero {...JSON.parse(props)} />, block);
});
