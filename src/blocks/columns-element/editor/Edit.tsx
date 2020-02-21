import { BlockEditProps } from "@wordpress/blocks";
import { Attributes } from "./attributes";
import ContainerElement from "../Components/ContainerElement";

export interface EditProps extends BlockEditProps<Attributes> {
  // extends missing types
  clientId?: string; // should always have this
}

export const Edit = (props: EditProps): JSX.Element => {
  const { attributes, className } = props;

  return (
    <div className={`s4tw-dynablocks-columns-element`} style={{ padding: 0 }}>
      <ContainerElement
        {...{
          className,
          type: "Edit",
          ...attributes
        }}
      />
    </div>
  );
};

export default Edit;
