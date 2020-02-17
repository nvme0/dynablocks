import { BlockEditProps } from "@wordpress/blocks";
import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody } from "@wordpress/components";
import { Attributes } from "./attributes";

export default (props: BlockEditProps<Attributes>): JSX.Element => {
  return (
    <InspectorControls>
      <PanelBody>
        <div></div>
      </PanelBody>
    </InspectorControls>
  );
};
