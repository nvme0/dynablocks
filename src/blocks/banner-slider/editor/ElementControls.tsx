import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, RangeControl } from "@wordpress/components";
import {
  ColorPalette,
  ColorPicker,
  TextControl
} from "../../../common/Components/Controls";
import {
  AlignmentButtons,
  ResponsiveControls
} from "../../../common/Components/Controls";
import { Attributes } from "./attributes";
import { PositionEntry } from "src/common/HOCs/withDraggable";

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
    height,
    elementsPosition: position,
    elementsPositionLimits: limits,
    elementsTranslate: translate
  } = props;

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
