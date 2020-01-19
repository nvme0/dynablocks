import { render, Fragment } from "@wordpress/element";
import Slider from "./Components/Slider";
import { getBlocksOfType } from "../../common/helpers";

const blocks = getBlocksOfType(".s4tw-dynablocks-banner-slider");

const Wrapper = props => (
  <Fragment>
    <div className="props" style={{ display: "none" }}>
      {JSON.stringify(props)}
    </div>
    <Slider {...props} />
  </Fragment>
);

if (blocks.length > 0) {
  blocks.forEach(({ block, props }) => {
    render(React.createElement(Wrapper, JSON.parse(props)), block);
  });
}
