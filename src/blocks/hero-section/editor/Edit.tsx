import { useState, useEffect } from "@wordpress/element";
import { BlockEditProps } from "@wordpress/blocks";
import ElementControls, { ControlProps } from "./ElementControls";
import Hero from "../Components/Hero";
import { Attributes } from "./attributes";

export default (props: BlockEditProps<Attributes>) => {
  const { keywords, keywordsInterval } = props.attributes;

  const keywordsArray = keywords.split(" ");
  const [index, setIndex] = useState(0);
  const [timer, setTimer] = useState();
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
      cycleKeywords,
      timer
    },
    actions: {
      setIndex,
      setCycleKeywords,
      setTimer
    },
    keywordsArray,
    update,
    updateColorPicker,
    updateBackgroundImage
  };

  if (timer && !cycleKeywords) {
    clearInterval(timer);
    setTimer(undefined);
  }

  if (!timer && cycleKeywords) {
    setTimer(
      setInterval(() => {
        setIndex(index => (index + 1) % keywordsArray.length);
      }, keywordsInterval)
    );
  }

  useEffect(() => {
    if (timer && cycleKeywords) {
      clearInterval(timer);
      setTimer(
        setInterval(() => {
          setIndex(index => (index + 1) % keywordsArray.length);
        }, keywordsInterval)
      );
    }

    return () => {
      clearInterval(timer);
    };
  }, [keywordsInterval]);

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
