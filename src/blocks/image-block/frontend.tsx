import { render } from "@wordpress/element";
import Divider from "./Components/Divider";
import { getBlocksOfType } from "../../common/helpers";

const blocks = getBlocksOfType(".s4tw-dynablocks-image-block");
blocks.forEach(({ block, props }) => {
  render(<Divider {...JSON.parse(props)} />, block);
});
