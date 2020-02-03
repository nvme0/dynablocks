import { BlockEditProps } from "@wordpress/blocks";
import ElementControls from "./ElementControls";
import { Attributes } from "./attributes";
import Spacer from "../../../common/Components/Spacer";
import { createUpdateFunction } from "../../../common/helpers";

export const Edit = (props: BlockEditProps<Attributes>): JSX.Element => {
  const { attributes, isSelected } = props;

  const update = createUpdateFunction(props);

  return (
    <div className="s4tw-dynablocks-spacer">
      <ElementControls {...{ update, ...attributes }} />
      <Spacer
        {...{
          ...attributes,
          isSelected,
          update: update("height"),
          editMode: true
        }}
      />
    </div>
  );
};
