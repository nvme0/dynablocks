import { BlockEditProps } from "@wordpress/blocks";
import ElementControls from "./ElementControls";
import { Attributes } from "./attributes";
import Spacer from "@inspirewebdesigns/dynablocks-common/dist/Components/Spacer";

export const Edit = (props: BlockEditProps<Attributes>): JSX.Element => {
  const { attributes, setAttributes, isSelected } = props;

  const update = property => value => {
    setAttributes({ [property]: value });
  };

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
