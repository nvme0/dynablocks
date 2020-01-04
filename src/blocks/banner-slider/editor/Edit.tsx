import { BlockEditProps } from "@wordpress/blocks";
import Slider from "../Components/Slider";
import ElementControls from "./ElementControls";
import { Attributes } from "./attributes";

export default (props: BlockEditProps<Attributes>): JSX.Element => {
  const { backgroundImages } = props.attributes;

  const updateBackgroundImages = (value: [{ url: number }]) => {
    const images: number[] = [];
    value.forEach(image => {
      images.push(image.url);
    });
    props.setAttributes({ backgroundImages: images });
  };

  const updateColorPicker = property => value => {
    const { a, b, g, r } = value.rgb;
    const rgbaValue = `rgba(${r},${g},${b},${a})`;
    props.setAttributes({ [property]: rgbaValue });
  };

  const update = property => value => {
    props.setAttributes({ [property]: value });
  };

  return (
    <div className="s4tw-dynablocks-banner-slider">
      <ElementControls
        {...{
          update,
          updateColorPicker,
          updateBackgroundImages,
          ...props.attributes
        }}
      />
      <Slider
        {...{
          editMode: true,
          update,
          backgroundImages,
          ...props.attributes
        }}
      />
    </div>
  );
};
