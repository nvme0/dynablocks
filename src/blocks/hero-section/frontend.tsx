import { render } from "@wordpress/element";
import Hero from "./Components/Hero";

const heros = document.querySelectorAll(".s4tw-dynablocks-hero-section");
heros.forEach(hero => {
  let properties = hero.innerHTML;
  properties = properties.replace(new RegExp("”", "g"), '"');
  properties = properties.replace(new RegExp("“", "g"), '"');
  properties = properties.replace(new RegExp("″", "g"), '"'); // prime?
  properties = properties.replace(new RegExp("×", "g"), "x");
  render(<Hero {...JSON.parse(properties)} />, hero);
});
