import { useState, useEffect, render } from "@wordpress/element";
import Slider from "./Components/Slider";
import { Attributes } from "./editor/attributes";
import { fetchPosts } from "./common/helpers";
import { getBlocksOfType } from "../../common/helpers";

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

const blocks = getBlocksOfType(".s4tw-dynablocks-post-carousel");
blocks.forEach(({ block, props }) => {
  render(<SliderWrapper {...JSON.parse(props)} />, block);
});
