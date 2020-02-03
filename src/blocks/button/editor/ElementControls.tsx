import { InspectorControls } from "@wordpress/block-editor";
import ButtonControls, {
  createButtonControlProps
} from "../../../common/Components/Bootstrap/Button/ElementControls";
import { ResponsiveControls } from "../../../common/Components/Controls";
import { Attributes } from "./attributes";
import { PanelBody, ButtonGroup, Button } from "@wordpress/components";

export interface ControlProps {
  update: (property: string) => (value: any) => void;
  updateColorPicker: (property: string) => (value: any) => void;
}

export type Props = Attributes & ControlProps;

export default (props: Props): JSX.Element => {
  const {
    align,
    buttonText,
    buttonFontSize,
    update,
    updateColorPicker
  } = props;

  const setResponsiveControls = (property: string) => (value: boolean) => {
    if (value) {
      if (
        buttonFontSize === "sm" ||
        buttonFontSize === "" ||
        buttonFontSize === "lg"
      ) {
        update("buttonFontSize")("16px");
      }
    }
    update(property)(value);
  };

  const updateButtonText = update("buttonText");
  const updateButtonAlignment = update("align");

  return (
    <InspectorControls>
      <ButtonControls
        {...{
          ...createButtonControlProps(props, update, updateColorPicker),
          buttonText,
          updateButtonText,
          initialOpen: false
        }}
      />
      <PanelBody {...{ title: "Button Alignment", initialOpen: false }}>
        <ButtonGroup>
          <Button
            {...{
              isSmall: true,
              isSecondary: true,
              onClick: () => updateButtonAlignment("left"),
              isToggled: align === "left"
            }}
          >
            Left
          </Button>
          <Button
            {...{
              isSmall: true,
              isSecondary: true,
              onClick: () => updateButtonAlignment("center"),
              isToggled: align === "center"
            }}
          >
            Center
          </Button>
          <Button
            {...{
              isSmall: true,
              isSecondary: true,
              onClick: () => updateButtonAlignment("right"),
              isToggled: align === "right"
            }}
          >
            Right
          </Button>
        </ButtonGroup>
      </PanelBody>
      <ResponsiveControls
        {...{
          ...props,
          update: setResponsiveControls,
          initialOpen: false
        }}
      />
    </InspectorControls>
  );
};
