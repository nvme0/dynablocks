import { BlockEditProps } from "@wordpress/blocks";
import ElementControls from "./ElementControls";
import { Attributes } from "./attributes";
import { StyledButton } from "../../../common/Components/Bootstrap/Button";
import { createUpdateFunction } from "../../../common/helpers";

export interface EditProps extends BlockEditProps<Attributes> {
  // extends missing types
  clientId?: string; // should always have this
}

export const Edit = (props: EditProps): JSX.Element => {
  const { attributes } = props;
  const { buttonText: text, align } = attributes;

  const update = createUpdateFunction(props);
  const updateColorPicker = property => value => {
    const { a, b, g, r } = value.rgb;
    const rgbaValue = `rgba(${r},${g},${b},${a})`;
    update(property)(rgbaValue);
  };

  const buttonProps = {
    ...{
      ...attributes,
      text,
      updateText: update("buttonText"),
      editMode: true
    }
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
      <div style={{ textAlign: align }}>
        <StyledButton
          {...{
            ...buttonProps
          }}
        />
      </div>
    </div>
  );
};
