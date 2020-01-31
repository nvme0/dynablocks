import { BlockEditProps } from "@wordpress/blocks";
import ElementControls from "./ElementControls";
import { Attributes } from "./attributes";
import Spacer from "../Components/Spacer";

export const Edit = (props: BlockEditProps<Attributes>): JSX.Element => {
  const { attributes, setAttributes } = props;
  const { height } = attributes;

  const update = property => value => {
    setAttributes({ [property]: value });
  };

  return (
    <div className="s4tw-dynablocks-spacer" style={{ height: height }}>
      <ElementControls {...{ update, ...attributes }} />
      <Spacer {...attributes} />
    </div>
  );
};
