import { BlockEditProps } from "@wordpress/blocks";
import ElementControls from "./ElementControls";
import { Attributes } from "./attributes";
import { createUpdateFunction } from "../../../common/helpers";
import ButtonGroup from "../Components/ButtonGroup";

export interface EditProps extends BlockEditProps<Attributes> {
  // extends missing types
  clientId?: string; // should always have this
}

export const Edit = (props: EditProps): JSX.Element => {
  const { attributes, setAttributes, clientId } = props;

  const update = createUpdateFunction(props);

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
          clientId
        }}
      />
    </div>
  );
};
