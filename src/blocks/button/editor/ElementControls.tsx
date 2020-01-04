import { InspectorControls } from "@wordpress/block-editor";
import ButtonControls, {
  createButtonControlProps
} from "../../../common/Components/Bootstrap/Button/ElementControls";
import { ResponsiveControls } from "../../../common/Components/Controls";
import { Attributes } from "./attributes";

export interface ControlProps {
  update: (property: string) => (value: any) => void;
  updateColorPicker: (property: string) => (value: any) => void;
}

export type Props = Attributes & ControlProps;

export default (props: Props): JSX.Element => {
  const { buttonText, update, updateColorPicker } = props;

  return (
    <InspectorControls>
      <ButtonControls
        {...{
          ...createButtonControlProps(props, update, updateColorPicker),
          buttonText,
          updateButtonText: update("buttonText"),
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
