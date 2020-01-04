import { render } from "@wordpress/element";
import Slider from "./Components/Slider";

const bannerSliders = document.querySelectorAll(
  ".s4tw-dynablocks-banner-slider"
);
bannerSliders.forEach(bannerSlider => {
  let properties = bannerSlider.innerHTML;
  properties = properties.replace(new RegExp("”", "g"), '"');
  properties = properties.replace(new RegExp("“", "g"), '"');
  properties = properties.replace(new RegExp("″", "g"), '"'); // prime?
  properties = properties.replace(new RegExp("×", "g"), "x");
  render(<Slider {...JSON.parse(properties)} />, bannerSlider);
});
