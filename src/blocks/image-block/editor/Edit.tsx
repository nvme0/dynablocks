import { BlockEditProps } from "@wordpress/blocks";
import ElementControls from "./ElementControls";
import { Attributes } from "./attributes";
import Divider from "../Components/Divider";

export default (props: BlockEditProps<Attributes>): JSX.Element => {
  const { className, attributes } = props;

  const updateBackgroundImage = (
    image: { id: number } & { [k: string]: any }
  ) => {
    props.setAttributes({ backgroundImage: image.url });
  };

  const update = property => value => {
    props.setAttributes({ [property]: value });
  };

  return (
    <div className="s4tw-dynablocks-image-block">
      <ElementControls
        {...{
          ...attributes,
          update,
          updateBackgroundImage
        }}
      />
      <Divider
        {...{
          ...attributes,
          className
        }}
      />
    </div>
  );
};
