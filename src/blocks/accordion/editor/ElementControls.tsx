import _ from "lodash";
import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, PanelRow } from "@wordpress/components";
import validator from "validator";
import { Attributes } from "./attributes";
import {
  TextControl,
  ColorPalette,
  AlignmentButtons,
  ResponsiveControls
} from "../../../common/Components/Controls";

export interface ControlProps extends Attributes {
  clientId?: string;
  numberOfColumns: number;
  update: (property: any) => (value: any) => void;
}

const TextStyleControl = (props: {
  update: (property: any) => (value: any) => void;
  title: string;
  initialOpen: boolean;
  fontSize: { attribute: string; value: string };
  color: { attribute: string; value: string };
  textAlign: { attribute: string; value: string };
}) => {
  const { update, title, initialOpen, fontSize, color, textAlign } = props;
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
    numberOfColumns,
    columnBreaks,
    titleFontSize,
    titleColor,
    titleTextAlign,
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
          title: "Title",
          initialOpen: false,
          fontSize: { attribute: "titleFontSize", value: titleFontSize },
          color: { attribute: "titleColor", value: titleColor },
          textAlign: { attribute: "titleTextAlign", value: titleTextAlign }
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
              update: value => {
                const sanitizedValue = _.clamp(
                  parseInt(validator.whitelist(value, "0123456789")),
                  0,
                  numberOfColumns
                );

                update("columnBreaks")({
                  ...columnBreaks,
                  tablet: sanitizedValue
                });
              },
              secondary: true
            }}
          />
          <TextControl
            {...{
              name: "Mobile:",
              value: columnBreaks["mobile"],
              update: value => {
                const sanitizedValue = _.clamp(
                  parseInt(validator.whitelist(value, "0123456789")),
                  0,
                  numberOfColumns
                );

                update("columnBreaks")({
                  ...columnBreaks,
                  mobile: sanitizedValue
                });
              },
              secondary: true
            }}
          />
        </PanelBody>
      )}
    </InspectorControls>
  );
};
