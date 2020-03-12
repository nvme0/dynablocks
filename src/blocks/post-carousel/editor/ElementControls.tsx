import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody } from "@wordpress/components";
import {
  ColorPalette,
  ColorPicker,
  TextControl
} from "@solutions4theweb/dynablocks-common/dist/Components/Controls";
import ButtonControls, {
  createButtonControlProps
} from "@solutions4theweb/dynablocks-common/dist/Components/Bootstrap/Button/ElementControls";
import { ResponsiveControls } from "@solutions4theweb/dynablocks-common/dist/Components/Controls";
import { Attributes } from "./attributes";

export interface ControlProps {
  update: (property: string) => (value: any) => void;
  updateColorPicker: (property: string) => (value: any) => void;
}

export type Props = ControlProps & Attributes;

export default (props: Props): JSX.Element => {
  const {
    update,
    updateColorPicker,
    filterColor,
    h2FontSize,
    h2Color,
    h2MarginBottom,
    h3FontSize,
    h3Color,
    h3MarginBottom,
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
      <PanelBody {...{ title: "Title & Subtitle", initialOpen: false }}>
        <h6>Font Size</h6>
        <TextControl
          {...{
            name: "Title:",
            value: h2FontSize,
            secondary: true,
            update: update("h2FontSize")
          }}
        />
        <TextControl
          {...{
            name: "Subtitle:",
            value: h3FontSize,
            secondary: true,
            update: update("h3FontSize")
          }}
        />
        <h6>Text Color</h6>
        <ColorPalette
          {...{
            name: "Title:",
            value: h2Color,
            colors: [],
            update: update("h2Color")
          }}
        />
        <ColorPalette
          {...{
            name: "Subtitle:",
            value: h3Color,
            colors: [],
            update: update("h3Color")
          }}
        />
        <h6>Margin Bottom</h6>
        <TextControl
          {...{
            name: "Title:",
            value: h2MarginBottom,
            secondary: true,
            update: update("h2MarginBottom")
          }}
        />
        <TextControl
          {...{
            name: "Subtitle:",
            value: h3MarginBottom,
            secondary: true,
            update: update("h3MarginBottom")
          }}
        />
      </PanelBody>
      <ButtonControls
        {...{
          ...createButtonControlProps(props, update, updateColorPicker),
          initialOpen: false,
          noUrl: true
        }}
      />
      <ResponsiveControls
        {...{
          ...props,
          initialOpen: false
        }}
      />
      <PanelBody {...{ title: "Filter Color", initialOpen: false }}>
        <ColorPicker
          {...{
            color: filterColor,
            update: updateColorPicker("filterColor"),
            disableAlpha: false
          }}
        />
      </PanelBody>
    </InspectorControls>
  );
};
