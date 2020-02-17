import { BlockEditProps } from "@wordpress/blocks";
import { Attributes } from "./attributes";
import ContainerElement from "../Components/ContainerElement";
import { select } from "@wordpress/data";

export interface EditProps extends BlockEditProps<Attributes> {
  // extends missing types
  clientId?: string; // should always have this
}

export const Edit = (props: EditProps): JSX.Element => {
  const { attributes, className, clientId } = props;

  let innerBlockCount = 0;
  if (clientId) {
    const blockInstance = select("core/block-editor").getBlock(clientId);
    if (blockInstance) {
      innerBlockCount = blockInstance.innerBlocks.length;
    }
  }

  return (
    <div className={`s4tw-dynablocks-columns-element`} style={{ padding: 0 }}>
      <ContainerElement
        {...{
          className,
          type: "Edit",
          innerBlockCount,
          ...attributes
        }}
      />
    </div>
  );
};

export default Edit;
