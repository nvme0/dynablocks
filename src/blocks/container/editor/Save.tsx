import { BlockSaveProps } from "@wordpress/blocks";
import { Attributes } from "./attributes";
import ContainerElement from "../Components/ContainerElement";

export default (props: BlockSaveProps<Attributes>): JSX.Element => {
  const { attributes } = props;
  const { className } = props as any;
  const { tag } = attributes;
  return (
    <ContainerElement
      {...{
        className,
        tag,
        type: "Save"
      }}
    />
  );
};
