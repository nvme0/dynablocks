import { BlockEditProps } from "@wordpress/blocks";
import { Fragment } from "@wordpress/element";
import { Attributes } from "./attributes";
import ElementControls from "./ElementControls";
import ButtonGroup from "../Components/ButtonGroup";

export interface EditProps extends BlockEditProps<Attributes> {
  // extends missing types
  clientId?: string; // should always have this
}

export const Edit = (props: EditProps): JSX.Element => {
  const { attributes, setAttributes, clientId } = props;
  const { editorId } = attributes;

  if (clientId !== editorId) {
    setTimeout(() => setAttributes({ editorId: clientId }), 1000);
  }

  const update = property => value => {
    setAttributes({ [property]: value });
  };

  return (
    <Fragment>
      <ElementControls
        {...{
          ...attributes,
          update,
          clientId
        }}
      />
      <ButtonGroup
        {...{
          ...attributes,
          clientId,
          editMode: true
        }}
      />
    </Fragment>
  );
};
