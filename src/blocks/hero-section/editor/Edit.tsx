import { useState, useEffect } from "@wordpress/element";
import { BlockEditProps } from "@wordpress/blocks";
import ElementControls, { ControlProps } from "./ElementControls";
import Hero from "../Components/Hero";
import { Attributes } from "./attributes";

export const Edit = (props: BlockEditProps<Attributes>) => {
  const { keywords, keywordsInterval } = props.attributes;

  const keywordsArray = keywords.split(" ");
  const [index, setIndex] = useState(0);
  const [cycleKeywords, setCycleKeywords] = useState(false);

  function updateBackgroundImage(image: { id: number } & { [k: string]: any }) {
    // TODO: make not reliant on size
    props.setAttributes({ backgroundImage: image.sizes.large.url });
  }

  const updateColorPicker = property => value => {
    const { a, b, g, r } = value.rgb;
    const rgbaValue = `rgba(${r},${g},${b},${a})`;
    props.setAttributes({ [property]: rgbaValue });
  };

  const update = property => value => {
    props.setAttributes({ [property]: value });
  };

  const controlProps: ControlProps = {
    state: {
      index,
      cycleKeywords
    },
    actions: {
      setIndex,
      setCycleKeywords
    },
    keywordsArray,
    update,
    updateColorPicker,
    updateBackgroundImage
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (timer && !cycleKeywords) {
      clearInterval(timer);
      timer = undefined;
    }

    if (!timer && cycleKeywords) {
      timer = setInterval(() => {
        setIndex(index => (index + 1) % keywordsArray.length);
      }, keywordsInterval);
    }

    if (timer && cycleKeywords) {
      clearInterval(timer);
      timer = setInterval(() => {
        setIndex(index => (index + 1) % keywordsArray.length);
      }, keywordsInterval);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [cycleKeywords, keywordsArray.length, keywordsInterval]);

  return (
    <div className="s4tw-dynablocks-hero-section">
      <ElementControls
        {...{
          ...controlProps,
          ...props.attributes
        }}
      />
      <Hero
        {...{
          controlProps,
          ...props.attributes
        }}
      />
    </div>
  );
};
