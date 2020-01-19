import { useState, useEffect } from "@wordpress/element";
import { BlockEditProps } from "@wordpress/blocks";
import ElementControls from "./ElementControls";
import Slider from "../Components/Slider";
import { Attributes } from "./attributes";
import { fetchPosts } from "../common/helpers";

export const Edit = (props: BlockEditProps<Attributes>) => {
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

  const updateColorPicker = property => value => {
    const { a, b, g, r } = value.rgb;
    const rgbaValue = `rgba(${r},${g},${b},${a})`;
    props.setAttributes({ [property]: rgbaValue });
  };

  const update = (property: string) => value => {
    props.setAttributes({ [property]: value });
  };

  return (
    <div className="s4tw-dynablocks-post-carousel">
      <ElementControls
        {...{
          update,
          updateColorPicker,
          ...props.attributes
        }}
      />
      <Slider {...{ posts, editMode: true, ...props.attributes }} />
    </div>
  );
};
