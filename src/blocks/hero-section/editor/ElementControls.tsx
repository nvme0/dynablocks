import { isEmpty, concat } from "lodash";
import validator from "validator";
import { InspectorControls } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import {
  PanelBody,
  PanelRow,
  ToggleControl,
  RangeControl,
  SelectControl
} from "@wordpress/components";
import KeywordSelector from "../Components/KeywordSelector";
import {
  ColorPicker,
  ColorPalette,
  TextControl,
  TextareaControl,
  AlignmentButtons,
  ResponsiveControls
} from "@inspirewebdesigns/dynablocks-common/dist/Components/Controls";
import { Attributes } from "./attributes";
import { PositionEntry } from "@inspirewebdesigns/dynablocks-common/dist/HOCs/withDraggable";
import { getImageSizeOptions } from "@inspirewebdesigns/dynablocks-common/dist/Components/Controls/ImagePlaceholder";

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
}

export type Props = Attributes & ControlProps;

export default (props: Props): JSX.Element => {
  const {
    state,
    actions,
    keywordsArray,
    update,
    updateColorPicker,
    filterColor,
    headingType,
    h2FontSize,
    h2MarginBottom,
    keywords,
    keywordsColor,
    keywordsInterval,
    h2Color,
    height,
    hasButton,
    backgroundImage,
    backgroundImageSize,
    elementsPosition: position,
    elementsPositionLimits: limits,
    elementsTranslate: translate
  } = props;
  const { index, cycleKeywords } = state;
  const { setIndex, setCycleKeywords } = actions;

  const updatePositionEntry = (
    attributeName: string,
    attribute: { [entry: string]: PositionEntry }
  ) => (entry: string) => (value: number) => {
    update(attributeName)({
      ...attribute,
      [entry]: {
        ...attribute[entry],
        value
      }
    });
  };

  const updateElementsPosition = updatePositionEntry(
    "elementsPosition",
    position
  );
  const updateElementsTranslate = updatePositionEntry(
    "elementsTranslate",
    translate
  );

  const imageSizeOptions = backgroundImageSize
    ? getImageSizeOptions(backgroundImage)
    : concat([{ label: "", value: "" }], getImageSizeOptions(backgroundImage));

  return (
    <InspectorControls>
      <PanelBody {...{ title: "Heading", initialOpen: false }}>
        <SelectControl
          {...{
            label: __("Heading Type"),
            value: headingType,
            options: [
              { label: "H1", value: "h1" },
              { label: "H2", value: "h2" },
              { label: "H3", value: "h3" },
              { label: "H4", value: "h4" },
              { label: "H5", value: "h5" },
              { label: "H6", value: "h6" }
            ],
            onChange: update("headingType")
          }}
        />
      </PanelBody>
      <PanelBody {...{ title: "Text Style", initialOpen: false }}>
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
      <PanelBody {...{ title: "Button", initialOpen: false }}>
        <ToggleControl
          {...{
            label: "Enable Button",
            checked: hasButton,
            onChange: update("hasButton")
          }}
        />
      </PanelBody>
      <PanelBody {...{ title: "Image Settings", initialOpen: false }}>
        {!isEmpty(imageSizeOptions) && (
          <SelectControl
            {...{
              label: __("Image Size"),
              value: backgroundImageSize,
              options: imageSizeOptions,
              onChange: update("backgroundImageSize")
            }}
          />
        )}
        <ColorPicker
          {...{
            color: filterColor,
            disableAlpha: false,
            update: updateColorPicker("filterColor")
          }}
        />
      </PanelBody>
      <PanelBody {...{ title: "Cycling Text", initialOpen: false }}>
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
      <PanelBody {...{ title: "Height", initialOpen: false }}>
        <TextControl
          {...{
            name: "",
            value: height,
            update: update("height")
          }}
        />
      </PanelBody>
      <PanelBody {...{ title: "Position", initialOpen: false }}>
        <p>
          <strong>Left</strong>
        </p>
        <AlignmentButtons
          {...{
            lowerLimit: { label: "left", value: limits.x.lower },
            centerPosition: { label: "center", value: 50 },
            upperLimit: { label: "right", value: limits.x.upper },
            update: updateElementsPosition("left")
          }}
        />
        <RangeControl
          {...{
            value: position["left"]["value"],
            onChange: updateElementsPosition("left"),
            min: limits["x"]["lower"],
            max: limits["x"]["upper"]
          }}
        />
        <p>
          <strong>Top</strong>
        </p>
        <AlignmentButtons
          {...{
            lowerLimit: { label: "top", value: limits.y.lower },
            centerPosition: { label: "center", value: 50 },
            upperLimit: { label: "bottom", value: limits.y.upper },
            update: updateElementsPosition("top")
          }}
        />
        <RangeControl
          {...{
            value: position["top"]["value"],
            onChange: updateElementsPosition("top"),
            min: limits["y"]["lower"],
            max: limits["y"]["upper"]
          }}
        />
      </PanelBody>
      <PanelBody {...{ title: "Transforms", initialOpen: false }}>
        <p>
          <strong>Translate X</strong>
        </p>
        <AlignmentButtons
          {...{
            lowerLimit: { label: "-100%", value: -100 },
            centerPosition: { label: "center", value: -50 },
            upperLimit: { label: "none", value: 0 },
            update: updateElementsTranslate("left")
          }}
        />
        <RangeControl
          {...{
            value: translate["left"]["value"],
            onChange: updateElementsTranslate("left"),
            min: -100,
            max: 0
          }}
        />
        <p>
          <strong>Translate Y</strong>
        </p>
        <AlignmentButtons
          {...{
            lowerLimit: { label: "-100%", value: -100 },
            centerPosition: { label: "center", value: -50 },
            upperLimit: { label: "none", value: 0 },
            update: updateElementsTranslate("top")
          }}
        />
        <RangeControl
          {...{
            value: translate["top"]["value"],
            onChange: updateElementsTranslate("top"),
            min: -100,
            max: 0
          }}
        />
      </PanelBody>
      <ResponsiveControls
        {...{
          ...props,
          initialOpen: false
        }}
      />
    </InspectorControls>
  );
};
