import { render } from "@wordpress/element";
import Divider from "./Components/Divider";

const dividers = document.querySelectorAll(".s4tw-dynablocks-image-block");
dividers.forEach(divider => {
  let properties = divider.innerHTML;
  properties = properties.replace(new RegExp("”", "g"), '"');
  properties = properties.replace(new RegExp("“", "g"), '"');
  properties = properties.replace(new RegExp("″", "g"), '"'); // prime?
  properties = properties.replace(new RegExp("×", "g"), "x");
  render(<Divider {...JSON.parse(properties)} />, divider);
});
