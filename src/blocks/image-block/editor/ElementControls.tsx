import { isEmpty, concat } from "lodash";
import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, SelectControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { Attributes } from "./attributes";
import {
  ImageUploader,
  TextControl,
  ColorPicker
} from "../../../common/Components/Controls";
import {
  Image,
  getImageSizeOptions
} from "../../../common/Components/Controls/ImagePlaceholder";
import { sanitizeIntegerInput } from "../../../common/helpers";

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
    margin
  } = props;

  const imageSizeOptions = backgroundImageSize
    ? getImageSizeOptions(backgroundImage)
    : concat([{ label: "", value: "" }], getImageSizeOptions(backgroundImage));

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
