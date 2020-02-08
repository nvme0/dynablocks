import { BlockEditProps } from "@wordpress/blocks";
import ElementControls from "./ElementControls";
import { Attributes } from "./attributes";
import { syncBlockWithParent } from "../../../common/helpers";
import ButtonGroup from "../Components/ButtonGroup";

export interface EditProps extends BlockEditProps<Attributes> {
  // extends missing types
  clientId?: string; // should always have this
}

export const Edit = (props: EditProps): JSX.Element => {
  const { attributes, setAttributes, clientId } = props;
  const { parentId, relationship } = attributes;

  syncBlockWithParent(setAttributes, clientId, parentId, relationship);

  const update = property => value => {
    setAttributes({ [property]: value });
  };

  return (
    <div className="s4tw-dynablocks-button-group">
      <ElementControls
        {...{
          ...attributes,
          update,
          setAttributes,
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
    </div>
  );
};
