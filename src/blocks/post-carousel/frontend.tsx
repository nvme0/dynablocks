import { useState, useEffect, render } from "@wordpress/element";
import Slider from "./Components/Slider";
import { Attributes } from "./editor/attributes";
import { fetchPosts } from "./common/helpers";

export const SliderWrapper = (props: Attributes): JSX.Element => {
  const [posts, setPosts] = useState();
  const [isLoaded, setIsLoadedFlag] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      return;
    }

    fetchPosts().then(posts => {
      setPosts(posts);
      setIsLoadedFlag(true);
    });
  }, [isLoaded]);

  return <Slider {...{ posts, ...props }} />;
};

const postCarousels = document.querySelectorAll(
  ".s4tw-dynablocks-post-carousel"
);
postCarousels.forEach(postCarousel => {
  let properties = postCarousel.innerHTML;
  properties = properties.replace(new RegExp("”", "g"), '"');
  properties = properties.replace(new RegExp("“", "g"), '"');
  properties = properties.replace(new RegExp("″", "g"), '"'); // prime?
  properties = properties.replace(new RegExp("×", "g"), "x");
  render(<SliderWrapper {...JSON.parse(properties)} />, postCarousel);
});
