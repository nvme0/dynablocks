import { css } from "emotion";
import Button from "react-bootstrap/Button";
import validator from "validator";
import { Attributes } from "./attributes";
import { darkenColor, changeColorAlpha } from "../../../helpers";

export interface ButtonStyle {
  color: string;
  backgroundColor?: string;
  borderColor?: string;
  borderRadius: string;
  borderWidth: string;
  borderStyle:
    | "solid"
    | "dotted"
    | "dashed"
    | "double"
    | "groove"
    | "ridge"
    | "inset"
    | "outset"
    | "none"
    | "hidden";
}

export const convertButtonStylePropsToCSS = (
  props: Attributes
): ButtonStyle => {
  const {
    buttonStyle,
    buttonColor: color,
    buttonPrimaryColor: primaryColor,
    buttonBorderRadius: borderRadius,
    buttonBorderWidth: borderWidth,
    buttonBorderStyle: borderStyle
  } = props;

  const backgroundColor = buttonStyle === "primary" ? primaryColor : undefined;
  const borderColor = primaryColor;

  return {
    color,
    backgroundColor,
    borderColor,
    borderRadius,
    borderWidth,
    borderStyle
  };
};

const scaleFontSize = (fontSize: string, scalar: number) => {
  const size =
    parseInt(validator.whitelist(fontSize, "0123456789"), 10) * scalar;
  const units = validator.whitelist(fontSize, "cminpxtrexhvwa%");
  return size ? `${size}${units}` : undefined;
};

const fontSizeToPadding = (fontSize: string, scalar = 1) => {
  const size =
    parseInt(validator.whitelist(fontSize, "0123456789"), 10) * scalar;
  const units = validator.whitelist(fontSize, "cminpxtrexhvwa%");
  return size ? `${size * 0.375}${units} ${size * 0.75}${units}` : undefined;
};

export interface StyledButtonProps extends Attributes {
  text: string;
  editMode?: boolean;
  responsive?: boolean;
  scaleTablet?: number;
  scaleMobile?: number;
  minWidthDesktop?: string;
  minWidthTablet?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const StyledButton = (props: StyledButtonProps): JSX.Element => {
  const {
    text,
    buttonUrl,
    buttonStyle,
    buttonFontSize,
    editMode = false,
    responsive = false,
    scaleTablet = 1.0,
    scaleMobile = 1.0,
    minWidthDesktop = "1024px",
    minWidthTablet = "608px",
    onClick
  } = props;
  const {
    color,
    backgroundColor,
    borderColor,
    borderRadius,
    borderWidth,
    borderStyle
  } = convertButtonStylePropsToCSS(props);

  const backgroundColorHover =
    buttonStyle === "secondary" && borderColor
      ? changeColorAlpha(borderColor, 0.1)
      : backgroundColor
      ? darkenColor(backgroundColor)
      : "";
  const borderColorHover = borderColor ? darkenColor(borderColor) : "";
  const boxShadowFocus = changeColorAlpha(backgroundColorHover, 0.5);

  const fontSize =
    buttonFontSize !== "sm" && buttonFontSize !== "lg"
      ? buttonFontSize
      : undefined;
  const padding = fontSize ? fontSizeToPadding(fontSize) : undefined;

  // set reponsive params
  let fontSizeMobile;
  let paddingMobile;
  let stylesResponsive;
  if (!editMode && responsive && fontSize) {
    fontSizeMobile = scaleFontSize(fontSize, scaleMobile);
    paddingMobile = fontSizeToPadding(fontSize, scaleMobile);
    stylesResponsive = {
      [`@media all and (min-width: ${minWidthTablet})`]: {
        fontSize: scaleFontSize(fontSize, scaleTablet),
        padding: fontSizeToPadding(fontSize, scaleTablet)
      },
      [`@media all and (min-width: ${minWidthDesktop})`]: {
        fontSize,
        padding
      }
    };
  }
  // TODO: support option to open in new tab
  return (
    <Button
      {...{
        onClick,
        href: !editMode && buttonUrl ? buttonUrl : undefined,
        variant: buttonStyle === "secondary" ? "outline-primary" : "primary",
        size:
          buttonFontSize === "sm" || buttonFontSize === "lg"
            ? buttonFontSize
            : undefined,
        className: css({
          fontSize: fontSizeMobile ? fontSizeMobile : fontSize,
          color,
          backgroundColor,
          borderColor,
          borderRadius,
          borderWidth,
          borderStyle,
          padding: paddingMobile ? paddingMobile : padding,
          "&:hover": {
            backgroundColor: backgroundColorHover,
            borderColor: borderColorHover
          },
          "&:focus": {
            backgroundColor: backgroundColorHover,
            borderColor: borderColorHover,
            boxShadow: `0 0 0 2px ${boxShadowFocus}`
          },
          "&:not(:disabled):not(.disabled):active": {
            backgroundColor: backgroundColorHover,
            borderColor: borderColorHover,
            "&:focus": {
              boxShadow: `0 0 0 2px ${boxShadowFocus}`
            }
          },
          ...stylesResponsive
        })
      }}
    >
      {text}
    </Button>
  );
};
