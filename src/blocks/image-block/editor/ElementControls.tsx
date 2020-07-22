import { isEmpty, concat } from "lodash";
import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, SelectControl, RangeControl } from "@wordpress/components";
import { Fragment } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { Attributes } from "./attributes";
import {
  ImageUploader,
  TextControl,
  ColorPicker,
  Dropdown
} from "@inspirewebdesigns/dynablocks-common/dist/Components/Controls";
import {
  Image,
  getImageSizeOptions
} from "@inspirewebdesigns/dynablocks-common/dist/Components/Controls/ImagePlaceholder";
import { sanitizeIntegerInput } from "@inspirewebdesigns/dynablocks-common/dist/helpers";

export interface ControlProps {
  setAttributes: (attrs: Partial<Attributes>) => void;
  update: (property: string) => (value: any) => void;
  updateBackgroundImage: (image: Image) => void;
  updateColorPicker: (property: string) => (value: any) => void;
}

export type Props = Attributes & ControlProps;

export default (props: Props): JSX.Element => {
  const {
    setAttributes,
    update,
    updateBackgroundImage,
    updateColorPicker,
    backgroundImage,
    backgroundImageSize,
    filterColor,
    height,
    margin,
    backgroundPosition
  } = props;

  const imageSizeOptions = backgroundImageSize
    ? getImageSizeOptions(backgroundImage)
    : concat([{ label: "", value: "" }], getImageSizeOptions(backgroundImage));

  const positionLimits: { [type: string]: { min: number; max: number } } = {
    px: { min: -800, max: 800 },
    em: { min: -100, max: 100 },
    "%": { min: -100, max: 100 },
    vw: { min: -100, max: 100 },
    vh: { min: -100, max: 100 }
  };

  return (
    <InspectorControls>
      <div style={{ marginTop: "16px" }}></div>
      <TextControl
        {...{
          name: "Height:",
          value: height,
          secondary: true,
          update: update("height")
        }}
      />
      <ImageUploader
        {...{
          name: "Background Image",
          value: backgroundImage,
          multiple: false,
          gallery: false,
          onSelect: updateBackgroundImage
        }}
      />
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
      <div style={{ marginTop: "16px" }}></div>
      <Dropdown
        {...{
          name: "Position:",
          value: backgroundPosition["type"],
          options: [
            "center center",
            "center top",
            "center bottom",
            "left center",
            "left top",
            "left bottom",
            "right center",
            "right top",
            "right bottom",
            "custom"
          ],
          update: value => {
            setAttributes({
              backgroundPosition: {
                ...backgroundPosition,
                type: value
              }
            });
          },
          type: "secondary"
        }}
      />
      {backgroundPosition["type"] === "custom" && (
        <Fragment>
          <Dropdown
            {...{
              name: "X Position",
              value: backgroundPosition["x"].units,
              options: ["px", "em", "%", "vw"],
              update: value => {
                setAttributes({
                  backgroundPosition: {
                    ...backgroundPosition,
                    x: {
                      ...backgroundPosition["x"],
                      value: 0,
                      units: value
                    }
                  }
                });
              },
              type: "secondary"
            }}
          />
          <RangeControl
            {...{
              value: backgroundPosition["x"].value,
              onChange: value => {
                if (value === undefined) return;
                setAttributes({
                  backgroundPosition: {
                    ...backgroundPosition,
                    x: { ...backgroundPosition["x"], value }
                  }
                });
              },
              min: positionLimits[backgroundPosition["x"].units].min,
              max: positionLimits[backgroundPosition["x"].units].max
            }}
          />
          <Dropdown
            {...{
              name: "Y Position",
              value: backgroundPosition["y"].units,
              options: ["px", "em", "%", "vh"],
              update: value => {
                setAttributes({
                  backgroundPosition: {
                    ...backgroundPosition,
                    y: {
                      ...backgroundPosition["y"],
                      value: 0,
                      units: value
                    }
                  }
                });
              },
              type: "secondary"
            }}
          />
          <RangeControl
            {...{
              value: backgroundPosition["y"].value,
              onChange: value => {
                if (value === undefined) return;
                setAttributes({
                  backgroundPosition: {
                    ...backgroundPosition,
                    y: { ...backgroundPosition["y"], value }
                  }
                });
              },
              min: positionLimits[backgroundPosition["y"].units].min,
              max: positionLimits[backgroundPosition["y"].units].max
            }}
          />
        </Fragment>
      )}
      <PanelBody {...{ title: "Margin", initialOpen: false }}>
        <TextControl
          {...{
            name: "Top",
            value: margin["top"],
            update: value => {
              setAttributes({
                margin: {
                  ...margin,
                  top: sanitizeIntegerInput(value)
                }
              });
            },
            secondary: true,
            units: "px"
          }}
        />
        <TextControl
          {...{
            name: "Right",
            value: margin["right"],
            update: value => {
              setAttributes({
                margin: {
                  ...margin,
                  right: sanitizeIntegerInput(value)
                }
              });
            },
            secondary: true,
            units: "px"
          }}
        />
        <TextControl
          {...{
            name: "Bottom",
            value: margin["bottom"],
            update: value => {
              setAttributes({
                margin: {
                  ...margin,
                  bottom: sanitizeIntegerInput(value)
                }
              });
            },
            secondary: true,
            units: "px"
          }}
        />
        <TextControl
          {...{
            name: "left",
            value: margin["left"],
            update: value => {
              setAttributes({
                margin: {
                  ...margin,
                  left: sanitizeIntegerInput(value)
                }
              });
            },
            secondary: true,
            units: "px"
          }}
        />
      </PanelBody>
      <PanelBody {...{ title: "Color Filter", initialOpen: false }}>
        <ColorPicker
          {...{
            color: filterColor,
            disableAlpha: false,
            update: updateColorPicker("filterColor")
          }}
        />
      </PanelBody>
    </InspectorControls>
  );
};
