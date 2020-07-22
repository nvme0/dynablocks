import { InnerBlocks } from "@wordpress/block-editor";
import { Attributes } from "../editor/attributes";

export interface ContainerElementProps extends Attributes {
  className?: string;
  type: "Save" | "Edit";
}

export default (props: ContainerElementProps): JSX.Element => {
  const { type } = props;
  switch (type) {
    case "Edit":
      return (
        <InnerBlocks
          {...{
            // @ts-ignore
            renderAppender: () => <InnerBlocks.ButtonBlockAppender />
          }}
        />
      );

    // maybe return inside a div -> consistent targeting of grid styles rather than applying to child
    case "Save":
      return <InnerBlocks.Content />;
  }
};
