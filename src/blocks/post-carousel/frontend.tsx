import { useState, useEffect } from "@wordpress/element";
import Slider from "./Components/Slider";
import { Attributes } from "./editor/attributes";
import { fetchPosts, PostWithSubtitle } from "./utils/helpers";

export const className = ".s4tw-dynablocks-post-carousel";

export const EntryPoint = (props: Attributes): JSX.Element => {
  const [posts, setPosts] = useState<PostWithSubtitle[]>();
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
