import validator from "validator";
import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, PanelRow, ToggleControl } from "@wordpress/components";
import KeywordSelector from "../Components/KeywordSelector";
import ButtonControls, {
  createButtonControlProps
} from "../../../common/Components/Bootstrap/Button/ElementControls";
import {
  ColorPicker,
  ColorPalette,
  ImageUploader,
  TextControl,
  TextareaControl
} from "../../../common/Components/Controls";
import { ResponsiveControls } from "../../../common/Components/Controls";
import { Attributes } from "./attributes";

export interface ControlProps {
  state: {
    index: number;
    cycleKeywords: boolean;
    timer?: NodeJS.Timeout | undefined;
  };
  actions: {
    setIndex: React.Dispatch<React.SetStateAction<number>>;
    setCycleKeywords: React.Dispatch<React.SetStateAction<boolean>>;
    setTimer?: React.Dispatch<React.SetStateAction<NodeJS.Timeout | undefined>>;
  };
  keywordsArray: string[];
  update: (property: string) => (value: any) => void;
  updateColorPicker: (property: string) => (value: any) => void;
  updateBackgroundImage: (image: { id: number } & { [k: string]: any }) => void;
}

export type Props = Attributes & ControlProps;

export default (props: Props): JSX.Element => {
  const {
    state,
    actions,
    keywordsArray,
    update,
    updateColorPicker,
    updateBackgroundImage,
    backgroundImage,
    filterColor,
    h2Text,
    h2FontSize,
    h2MarginBottom,
    buttonText,
    keywords,
    keywordsColor,
    keywordsInterval,
    h2Color,
    height
  } = props;
  const { index, cycleKeywords } = state;
  const { setIndex, setCycleKeywords } = actions;

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
        {...{ title: "Static Text & Button Text", initialOpen: false }}
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
            name: "Button Text",
            value: buttonText,
            update: update("buttonText")
          }}
        />
      </PanelBody>
      <PanelBody {...{ title: "Dynamic Text", initialOpen: false }}>
        <TextareaControl
          {...{
            name: "Keywords (Space Separated)",
            rows: 2,
            value: keywords,
            update: update("keywords")
          }}
        />
        <KeywordSelector
          {...{
            keywordsArray,
            index,
            setIndex,
            disabled: cycleKeywords
          }}
        />
        <PanelRow>
          <TextControl
            {...{
              name: "Interval",
              value: keywordsInterval,
              update: value => {
                value = validator.whitelist(value, "0123456789");
                update("keywordsInterval")(parseInt(value));
              },
              secondary: true,
              units: "ms"
            }}
          />
        </PanelRow>
        <ToggleControl
          {...{
            label: "Cycle Keywords",
            checked: cycleKeywords,
            onChange: setCycleKeywords
          }}
        />
      </PanelBody>
      <PanelBody {...{ title: "Static & Dynamic Text", initialOpen: false }}>
        <h6>Font Size</h6>
        <TextControl
          {...{
            name: "",
            value: h2FontSize,
            update: update("h2FontSize")
          }}
        />
        <h6>Color</h6>
        <ColorPalette
          {...{
            name: "Static:",
            value: h2Color,
            colors: [],
            update: update("h2Color")
          }}
        />
        <ColorPalette
          {...{
            name: "Dynamic:",
            value: keywordsColor,
            colors: [],
            update: update("keywordsColor")
          }}
        />
        <h6>Margin Bottom</h6>
        <TextControl
          {...{
            name: "",
            value: h2MarginBottom,
            update: update("h2MarginBottom")
          }}
        />
      </PanelBody>
      <ButtonControls
        {...{
          ...createButtonControlProps(props, update, updateColorPicker),
          initialOpen: false
        }}
      />
      <ResponsiveControls
        {...{
          ...props,
          initialOpen: false
        }}
      />
      <PanelBody {...{ title: "Background", initialOpen: false }}>
        <ImageUploader
          {...{
            name: "Background Image",
            value: backgroundImage,
            multiple: false,
            gallery: false,
            onSelect: updateBackgroundImage
          }}
        />
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
