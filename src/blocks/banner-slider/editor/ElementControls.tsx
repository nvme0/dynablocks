import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody } from "@wordpress/components";
import {
  ColorPalette,
  ColorPicker,
  TextControl,
  TextareaControl
} from "../../../common/Components/Controls";
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
  const {
    update,
    updateColorPicker,
    filterColor,
    h2FontSize,
    h2MarginBottom,
    h2Color,
    h2Text,
    buttonText,
    height
  } = props;

  return (
    <InspectorControls>
      <PanelBody {...{ title: "Height", initialOpen: false }}>
        <TextControl
          {...{
            name: "",
            value: height,
            update: update("height")
          }}
        />
      </PanelBody>
      <PanelBody
        {...{
          title: "Heading",
          initialOpen: false
        }}
      >
        <TextareaControl
          {...{
            name: "Static Text",
            rows: 2,
            value: h2Text,
            update: update("h2Text")
          }}
        />
        <TextControl
          {...{
            name: "Font Size:",
            value: h2FontSize,
            secondary: true,
            update: update("h2FontSize")
          }}
        />
        <TextControl
          {...{
            name: "Margin Bottom:",
            value: h2MarginBottom,
            secondary: true,
            update: update("h2MarginBottom")
          }}
        />
        <ColorPalette
          {...{
            name: "Font Color:",
            value: h2Color,
            colors: [],
            update: update("h2Color")
          }}
        />
      </PanelBody>
      {/* <ButtonControls
        {...{
          ...createButtonControlProps(props, update, updateColorPicker),
          buttonText,
          updateButtonText: update("buttonText"),
          initialOpen: false
        }}
      /> */}
      <ResponsiveControls
        {...{
          ...props,
          initialOpen: false
        }}
      />
      <PanelBody
        {...{
          title: "Background Settings",
          initialOpen: false
        }}
      >
        <ColorPicker
          {...{
            name: "Filter Color",
            color: filterColor,
            disableAlpha: false,
            update: updateColorPicker("filterColor")
          }}
        />
      </PanelBody>
    </InspectorControls>
  );
};
