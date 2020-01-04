import { BlockEditProps } from "@wordpress/blocks";
import ElementControls from "./ElementControls";
import { Attributes } from "./attributes";
import ContainerElement from "../Components/ContainerElement";

export default (props: BlockEditProps<Attributes>): JSX.Element => {
  const { attributes, className } = props;
  const { tag } = attributes;
  return (
    <div className="s4tw-dynablocks-container">
      <ElementControls {...props} />
      <ContainerElement
        {...{
          className,
          tag,
          type: "Edit"
        }}
      />
    </div>
  );
};
