import { InspectorControls } from "@wordpress/block-editor";
import { Attributes } from "./attributes";
import { SpacerControls } from "../../../common/Components/Spacer/ElementControls";
import { ResponsiveControls } from "../../../common/Components/Controls";

export interface ControlProps {
  update: (property: string) => (value: any) => void;
}

export type Props = Attributes & ControlProps;

export default (props: Props): JSX.Element => {
  return (
    <InspectorControls>
      <SpacerControls
        {...{
          ...props,
          initialOpen: false
        }}
      />
      <ResponsiveControls
        {...{
          ...props,
          initialOpen: false
        }}
      />
    </InspectorControls>
  );
};
