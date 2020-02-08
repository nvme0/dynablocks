import { BlockEditProps } from "@wordpress/blocks";
import { Attributes } from "./attributes";
import Column from "../Components/Column";
import { Fragment } from "@wordpress/element";

export interface EditProps extends BlockEditProps<Attributes> {
  // extends missing types
  clientId?: string; // should always have this
}

export const Edit = (props: EditProps): JSX.Element => {
  const { attributes, clientId, isSelected } = props;
  const { innerBlocks } = attributes;

  const innerBlocksKeys = Object.keys(innerBlocks);
  const numberOfElements = innerBlocksKeys.length;

  return (
    <Fragment>
      <Column
        {...{
          ...attributes,
          editMode: true,
          isSelected,
          clientId,
          numberOfElements
        }}
      />
    </Fragment>
  );
};
