import { BlockEditProps } from "@wordpress/blocks";
import ElementControls from "./ElementControls";
import { Attributes } from "./attributes";
import { createUpdateFunction } from "../../../common/helpers";
import { Fragment } from "@wordpress/element";
import Button from "../Component/Button";

export interface EditProps extends BlockEditProps<Attributes> {
  // extends missing types
  clientId?: string; // should always have this
}

export const Edit = (props: EditProps): JSX.Element => {
  const { attributes } = props;
  const { buttonText: text } = attributes;

  // console.log({ parentId: attributes.parentId });
  const update = createUpdateFunction(props);
  const updateColorPicker = property => value => {
    const { a, b, g, r } = value.rgb;
    const rgbaValue = `rgba(${r},${g},${b},${a})`;
    update(property)(rgbaValue);
  };

  return (
    <Fragment>
      <ElementControls
        {...{
          ...attributes,
          update,
          updateColorPicker
        }}
      />
      <Button
        {...{
          ...attributes,
          text,
          updateText: update("buttonText")
        }}
      />
    </Fragment>
  );
};
