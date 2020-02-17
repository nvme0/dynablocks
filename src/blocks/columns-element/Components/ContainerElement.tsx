import { InnerBlocks } from "@wordpress/block-editor";
import { Attributes } from "../editor/attributes";

export interface ContainerElementProps extends Attributes {
  className?: string;
  type: "Save" | "Edit";
  innerBlockCount?: number;
}

export default (props: ContainerElementProps): JSX.Element => {
  const { type, innerBlockCount } = props;
  switch (type) {
    case "Edit":
      return (
        <InnerBlocks
          {...{
            renderAppender: () => {
              if (innerBlockCount && innerBlockCount > 0) {
                return <div></div>;
              }
              return <InnerBlocks.ButtonBlockAppender />;
            }
          }}
        />
      );

    // maybe return inside a div -> consistent targeting of grid styles rather than applying to child
    case "Save":
      return <InnerBlocks.Content />;
  }
};
