import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, PanelRow } from "@wordpress/components";
import { Attributes } from "./attributes";
import {
  TextControl,
  ColorPalette,
  AlignmentButtons,
  ResponsiveControls
} from "@inspirewebdesigns/dynablocks-common/dist/Components/Controls";
import { sanitizeIntegerInput } from "@inspirewebdesigns/dynablocks-common/dist/helpers";

export interface ControlProps extends Attributes {
  clientId?: string;
  numberOfColumns: number;
  update: (property: any) => (value: any) => void;
  setAttributes: (attrs: Partial<Attributes>) => void;
}

const updateColumnBreaks = (
  value: string,
  device: string,
  limits: { min: number; max: number },
  update: (property: any) => (value: any) => void,
  columnBreaks: { [x: string]: number }
) => {
  const sanitizedValue = sanitizeIntegerInput(value, limits);
  update("columnBreaks")({
    ...columnBreaks,
    [device]: sanitizedValue
  });
};

const TextStyleControl = (props: {
  update: (property: any) => (value: any) => void;
  setAttributes?: (attrs: Partial<Attributes>) => void;
  title: string;
  initialOpen: boolean;
  fontSize: { attribute: string; value: string };
  color: { attribute: string; value: string };
  textAlign: { attribute: string; value: string };
  margin?: { attribute: string; value: { bottom: string } };
}) => {
  const {
    update,
    setAttributes,
    title,
    initialOpen,
    fontSize,
    color,
    textAlign,
    margin
  } = props;

  return (
    <PanelBody {...{ title, initialOpen }}>
      <TextControl
        {...{
          name: "Font Size:",
          value: fontSize.value,
          secondary: true,
          update: update(fontSize.attribute)
        }}
      />
      <ColorPalette
        {...{
          name: "Font Color:",
          value: color.value,
          colors: [],
          update: update(color.attribute)
        }}
      />
      {margin && setAttributes && (
        <TextControl
          {...{
            name: "Margin Bottom:",
            value: margin.value.bottom,
            secondary: true,
            update: value =>
              setAttributes({
                titleMargin: {
                  ...margin.value,
                  bottom: value
                }
              })
          }}
        />
      )}
      <PanelRow>
        <p>
          <strong>Text Alignment</strong>
        </p>
        <AlignmentButtons
          {...{
            lowerLimit: { label: "left", value: "left" },
            centerPosition: { label: "center", value: "center" },
            upperLimit: { label: "right", value: "right" },
            update: update(textAlign.attribute),
            isActive: textAlign.value
          }}
        />
      </PanelRow>
    </PanelBody>
  );
};

export default (props: ControlProps): JSX.Element => {
  const {
    update,
    setAttributes,
    numberOfColumns,
    columnBreaks,
    titleFontSize,
    titleColor,
    titleTextAlign,
    titleMargin,
    headingFontSize,
    headingColor,
    headingTextAlign,
    bodyFontSize,
    bodyColor,
    bodyTextAlign,
    responsive
  } = props;

  return (
    // TODO move/copy these controls to the relevant blocks. Make blocks sync with global variable, i.e. store truth attributes here.
    <InspectorControls>
      <div style={{ height: "16px" }} />
      <TextStyleControl
        {...{
          update,
          setAttributes,
          title: "Title",
          initialOpen: false,
          fontSize: { attribute: "titleFontSize", value: titleFontSize },
          color: { attribute: "titleColor", value: titleColor },
          textAlign: { attribute: "titleTextAlign", value: titleTextAlign },
          margin: { attribute: "titleMargin", value: titleMargin }
        }}
      />
      <TextStyleControl
        {...{
          update,
          title: "Heading",
          initialOpen: false,
          fontSize: { attribute: "headingFontSize", value: headingFontSize },
          color: { attribute: "headingColor", value: headingColor },
          textAlign: { attribute: "headingTextAlign", value: headingTextAlign }
        }}
      />
      <TextStyleControl
        {...{
          update,
          title: "Body",
          initialOpen: false,
          fontSize: { attribute: "bodyFontSize", value: bodyFontSize },
          color: { attribute: "bodyColor", value: bodyColor },
          textAlign: { attribute: "bodyTextAlign", value: bodyTextAlign }
        }}
      />
      <ResponsiveControls
        {...{
          ...props,
          initialOpen: false
        }}
      />
      {responsive && (
        <PanelBody {...{ title: "Column Breaks", initialOpen: false }}>
          <h6 style={{ margin: "16px 0 16px 0" }}>Number of Columns</h6>
          <TextControl
            {...{
              name: "Tablet:",
              value: columnBreaks["tablet"],
              update: value =>
                updateColumnBreaks(
                  value,
                  "tablet",
                  { min: 0, max: numberOfColumns },
                  update,
                  columnBreaks
                ),
              secondary: true
            }}
          />
          <TextControl
            {...{
              name: "Mobile:",
              value: columnBreaks["mobile"],
              update: value =>
                updateColumnBreaks(
                  value,
                  "tablet",
                  { min: 0, max: numberOfColumns },
                  update,
                  columnBreaks
                ),
              secondary: true
            }}
          />
        </PanelBody>
      )}
    </InspectorControls>
  );
};
