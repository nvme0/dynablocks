import { BlockEditProps } from "@wordpress/blocks";
import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, SelectControl } from "@wordpress/components";
import { Attributes } from "./attributes";

export default (props: BlockEditProps<Attributes>): JSX.Element => {
  return (
    <InspectorControls>
      <PanelBody>
        <SelectControl
          label={"HTML tag"}
          value={props.attributes.tag}
          onChange={selection => {
            props.setAttributes({ tag: selection });
          }}
          options={[
            { value: "div", label: "div" },
            { value: "section", label: "section" },
            { value: "main", label: "main" },
            { value: "article", label: "article" },
            { value: "header", label: "header" },
            { value: "footer", label: "footer" },
            { value: "aside", label: "aside" },
            { value: "nav", label: "nav" }
          ]}
        />
      </PanelBody>
    </InspectorControls>
  );
};
