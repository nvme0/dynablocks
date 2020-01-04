import { BlockEditProps } from "@wordpress/blocks";
import ElementControls from "./ElementControls";
import { Attributes } from "./attributes";
import { StyledButton } from "../../../common/Components/Bootstrap/Button";

export default (props: BlockEditProps<Attributes>): JSX.Element => {
  const { attributes } = props;
  const { buttonText: text } = attributes;

  const updateColorPicker = property => value => {
    const { a, b, g, r } = value.rgb;
    const rgbaValue = `rgba(${r},${g},${b},${a})`;
    props.setAttributes({ [property]: rgbaValue });
  };

  const update = property => value => {
    props.setAttributes({ [property]: value });
  };

  return (
    <div className="s4tw-dynablocks-button">
      <ElementControls
        {...{
          ...attributes,
          update,
          updateColorPicker
        }}
      />
      <StyledButton
        {...{
          ...attributes,
          text,
          editMode: true
        }}
      />
    </div>
  );
};
