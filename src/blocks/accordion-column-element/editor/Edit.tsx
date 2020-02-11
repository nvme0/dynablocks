import { BlockEditProps } from "@wordpress/blocks";
import { Attributes } from "./attributes";
import Element from "../Components/Element";

export interface EditProps extends BlockEditProps<Attributes> {
  // extends missing types
  clientId?: string; // should always have this
}

export const Edit = (props: EditProps): JSX.Element => {
  const { attributes, setAttributes, isSelected, clientId } = props;
  const { editorId } = attributes;

  if (clientId !== editorId) {
    setTimeout(() => setAttributes({ editorId: clientId }), 1000);
  }

  const update = property => value => {
    setAttributes({ [property]: value });
  };

  return (
    <Element
      {...{
        ...attributes,
        update,
        isSelected,
        editorId: editorId || "0",
        editMode: true
      }}
    />
  );
};
