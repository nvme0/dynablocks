import validator from "validator";
import { PanelBody, ToggleControl } from "@wordpress/components";
import { Fragment, useState } from "@wordpress/element";
import {
  ColorPalette,
  ColorPicker,
  Dropdown,
  TextControl
} from "../../Controls";
import { Attributes } from "./attributes";

export interface ButtonControlProps extends Attributes {
  updateUrl: (value: any) => void;
  updateStyle: (value: any) => void;
  updateFontSize: (value: any) => void;
  updateColor: (value: any) => void;
  updateHoverColor: (value: any) => void;
  updatePrimaryColor: (value: any) => void;
  updateBorderRadius: (value: any) => void;
  updateBorderWidth: (value: any) => void;
  updateBorderStyle: (value: any) => void;
  updateButtonText?: (value: any) => void;
  buttonText?: string;
  initialOpen?: boolean;
  noUrl?: boolean;
}

export default (props: ButtonControlProps): JSX.Element => {
  const {
    initialOpen,
    noUrl = false,
    buttonUrl: url,
    buttonStyle: style,
    buttonFontSize: fontSize,
    buttonColor: color,
    buttonHoverColor: hoverColor,
    buttonPrimaryColor: primaryColor,
    buttonBorderRadius: borderRadius,
    buttonBorderWidth: borderWidth,
    buttonBorderStyle: borderStyle,
    // update callbacks
    updateUrl,
    updateStyle,
    updateFontSize,
    updateColor,
    updateHoverColor,
    updatePrimaryColor,
    updateBorderRadius,
    updateBorderWidth,
    updateBorderStyle,
    updateButtonText,
    // button text
    buttonText = ""
  } = props;

  const [hoverColorControls, enableHoverColorControls] = useState(
    hoverColor === color
  );

  return (
    <Fragment>
      <PanelBody {...{ title: "Button", initialOpen }}>
        {!noUrl && (
          <TextControl
            {...{
              name: "Url:",
              value: url,
              update: updateUrl,
              secondary: true
            }}
          />
        )}
        <Dropdown
          {...{
            name: "Style:",
            value: style,
            options: ["primary", "secondary"],
            update: updateStyle
          }}
        />
        <Dropdown
          {...{
            name: "Font Size:",
            value: (() => {
              switch (fontSize) {
                case "sm":
                  return "small";
                case "":
                  return "medium";
                case "lg":
                  return "large";
                default:
                  return "custom";
              }
            })(),
            options: ["small", "medium", "large", "custom"],
            update: (value: string) => {
              switch (value) {
                case "small":
                  updateFontSize("sm");
                  break;
                case "medium":
                  updateFontSize("");
                  break;
                case "large":
                  updateFontSize("lg");
                  break;
                case "custom":
                  updateFontSize("16px");
                  break;
              }
            }
          }}
        />
        <TextControl
          {...{
            name: "Font Size:",
            value: fontSize,
            update: (value: string) => {
              updateFontSize(
                validator.whitelist(value, "0123456789cminpxtrexhvwa")
              );
            },
            disabled:
              fontSize === "sm" || fontSize === "" || fontSize === "lg"
                ? true
                : false,
            secondary: true
          }}
        />
      </PanelBody>
      <PanelBody {...{ title: "Button Colors", initialOpen }}>
        <ColorPalette
          {...{
            name: "Font Color:",
            value: color,
            colors: [],
            update: updateColor
          }}
        />
        <div style={{ height: "8px" }} />
        <ToggleControl
          {...{
            label: "Font Color on Hover",
            checked: hoverColorControls,
            onChange: (value: boolean) => {
              enableHoverColorControls(value);
              if (!value) {
                updateHoverColor(color);
              }
            }
          }}
        />
        {hoverColorControls && (
          <ColorPalette
            {...{
              name: "Color",
              value: hoverColor,
              colors: [],
              update: updateHoverColor,
              style: {
                marginTop: "-16px",
                marginBottom: "20px"
              }
            }}
          />
        )}
        <ColorPicker
          {...{
            name: "Primary Color:",
            color: primaryColor,
            update: updatePrimaryColor,
            disableAlpha: false
          }}
        />
      </PanelBody>
      <PanelBody {...{ title: "Button Border", initialOpen }}>
        <TextControl
          {...{
            name: "Radius:",
            value: borderRadius,
            update: updateBorderRadius,
            secondary: true
          }}
        />
        <TextControl
          {...{
            name: "Width:",
            value: borderWidth,
            update: updateBorderWidth,
            secondary: true
          }}
        />
        <Dropdown
          {...{
            name: "Style:",
            value: borderStyle,
            options: [
              "solid",
              "dotted",
              "dashed",
              "double",
              "groove",
              "ridge",
              "inset",
              "outset",
              "none",
              "hidden"
            ],
            update: updateBorderStyle
          }}
        />
      </PanelBody>
    </Fragment>
  );
};

export const createButtonControlProps = (
  props: Attributes,
  update: (property: string) => (value: any) => void,
  updateColorPicker: (property: string) => (value: any) => void,
  initialOpen?: boolean,
  keys?: {
    url: string;
    style: string;
    fontSize: string;
    color: string;
    primaryColor: string;
    borderRadius: string;
    borderWidth: string;
    borderStyle: string;
    position: string;
    limits: string;
  }
): ButtonControlProps => {
  const {
    buttonUrl,
    buttonStyle,
    buttonFontSize,
    buttonColor,
    buttonHoverColor,
    buttonPrimaryColor,
    buttonBorderRadius,
    buttonBorderWidth,
    buttonBorderStyle
  } = props;

  return {
    initialOpen,
    buttonUrl,
    buttonStyle,
    buttonFontSize,
    buttonColor,
    buttonHoverColor,
    buttonPrimaryColor,
    buttonBorderRadius,
    buttonBorderWidth,
    buttonBorderStyle,
    updateUrl: update(keys ? keys["url"] : "buttonUrl"),
    updateStyle: update(keys ? keys["style"] : "buttonStyle"),
    updateFontSize: update(keys ? keys["fontSize"] : "buttonFontSize"),
    updateColor: update(keys ? keys["color"] : "buttonColor"),
    updateHoverColor: update(keys ? keys["hoverColor"] : "buttonHoverColor"),
    updatePrimaryColor: updateColorPicker(
      keys ? keys["primaryColor"] : "buttonPrimaryColor"
    ),
    updateBorderRadius: update(
      keys ? keys["borderRadius"] : "buttonBorderRadius"
    ),
    updateBorderWidth: update(keys ? keys["borderWidth"] : "buttonBorderWidth"),
    updateBorderStyle: update(keys ? keys["borderStyle"] : "buttonBorderStyle")
  };
};
