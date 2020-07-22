import { merge } from "lodash";
import { InnerBlocks, RichText } from "@wordpress/block-editor";
import { Fragment } from "@wordpress/element";
import { css } from "emotion";
import { Accordion, Row } from "react-bootstrap";
import { Attributes } from "../editor/attributes";
import {
  generateResponsiveCSS,
  extractSizeAndUnits,
  generateBlockTemplate
} from "@inspirewebdesigns/dynablocks-common/dist/helpers";
import { EntryPoint as DynablocksAccordionColumn } from "../../accordion-column/frontend";
import ResizableBox from "@inspirewebdesigns/dynablocks-common/dist/Components/ResizableBox";

export interface AccordionProps extends Attributes {
  clientId?: string;
  editMode?: boolean;
  isSelected?: boolean;
  update?: (property: any) => (value: any) => void;
  setAttributes?: (attrs: Partial<Attributes>) => void;
}

interface ResponsiveProperties {
  padding: string;
  titleFontSize: string;
  titleMargin: { bottom: string };
  headingFontSize: string;
  headingPaddingTopBottom: string;
  bodyFontSize: string;
  bodyPaddingBottom: string;
}

interface ResponsiveParameters {
  scaleTablet: number;
  scaleMobile: number;
  minWidthDesktop: string;
  minWidthTablet: string;
}

const generateResponsiveStyles = (
  {
    padding,
    titleFontSize,
    titleMargin,
    headingFontSize,
    headingPaddingTopBottom,
    bodyFontSize,
    bodyPaddingBottom
  }: ResponsiveProperties,
  {
    scaleTablet,
    scaleMobile,
    minWidthDesktop,
    minWidthTablet
  }: ResponsiveParameters
) => {
  const responsiveParameters = [
    {
      name: "mobile",
      scale: scaleMobile
    },
    {
      name: "tablet",
      breakpoint: `@media all and (min-width: ${minWidthTablet})`,
      scale: scaleTablet
    },
    {
      name: "desktop",
      breakpoint: `@media all and (min-width: ${minWidthDesktop})`
    }
  ];

  const paddingResponsive = generateResponsiveCSS(
    [{ name: "padding", size: padding }],
    responsiveParameters
  );

  const paddingColumnResponsive = generateResponsiveCSS(
    [
      { name: "paddingLeft", size: padding },
      { name: "paddingRight", size: padding }
    ],
    responsiveParameters
  );

  const titleResponsive = generateResponsiveCSS(
    [
      { name: "fontSize", size: titleFontSize },
      { name: "padding", size: titleFontSize },
      { name: "marginBottom", size: titleMargin["bottom"] }
    ],
    responsiveParameters
  );

  const headingResponsive = generateResponsiveCSS(
    [
      { name: "fontSize", size: headingFontSize },
      { name: "paddingTop", size: headingPaddingTopBottom },
      { name: "paddingBottom", size: headingPaddingTopBottom }
    ],
    responsiveParameters
  );

  const bodyResponsive = generateResponsiveCSS(
    [
      { name: "fontSize", size: bodyFontSize },
      { name: "paddingBottom", size: bodyPaddingBottom }
    ],
    responsiveParameters
  );

  return {
    paddingResponsive,
    paddingColumnResponsive,
    titleResponsive,
    headingResponsive,
    bodyResponsive
  };
};
// TODO - manually set outside padding with responsive
// TODO - schema https://schema.org/FAQPage -> what is this -> can check this out later...
export default (props: AccordionProps): JSX.Element => {
  const {
    innerBlocks,
    blockOrder,
    clientId,
    editMode,
    update,
    setAttributes,
    isSelected,
    columnBreaks,
    responsive = false,
    scaleTablet = 1.0,
    scaleMobile = 1.0,
    minWidthDesktop = "1024px",
    minWidthTablet = "600px",
    titleText,
    titleFontSize,
    titleColor,
    titleTextAlign,
    titleMargin,
    headingFontSize,
    headingColor,
    headingTextAlign,
    bodyFontSize,
    bodyColor,
    bodyTextAlign
  } = props;

  const template =
    editMode && clientId
      ? generateBlockTemplate(blockOrder, innerBlocks)
      : undefined;

  const {
    size: headingFontSizeValue,
    units: headingFontSizeUnits
  } = extractSizeAndUnits(headingFontSize);
  const {
    size: bodyFontSizeValue,
    units: bodyFontSizeUnits
  } = extractSizeAndUnits(bodyFontSize);

  const padding = `${headingFontSizeValue * 0.5}${headingFontSizeUnits}`;
  const headingPaddingTopBottom = `${
    headingFontSizeValue * 1.33
  }${headingFontSizeUnits}`;
  const bodyPaddingBottom = `${bodyFontSizeValue * 1.33}${bodyFontSizeUnits}`;

  const {
    paddingResponsive,
    paddingColumnResponsive,
    titleResponsive,
    headingResponsive,
    bodyResponsive
  } =
    !editMode && responsive
      ? generateResponsiveStyles(
          {
            padding,
            titleFontSize,
            titleMargin,
            headingFontSize,
            headingPaddingTopBottom,
            bodyFontSize,
            bodyPaddingBottom
          },
          {
            scaleTablet,
            scaleMobile,
            minWidthDesktop,
            minWidthTablet
          }
        )
      : {
          paddingResponsive: {
            padding
          },
          paddingColumnResponsive: {
            paddingLeft: padding,
            paddingRight: padding
          },
          titleResponsive: undefined,
          headingResponsive: {
            fontSize: headingFontSize,
            paddingTop: headingPaddingTopBottom,
            paddingBottom: headingPaddingTopBottom
          },
          bodyResponsive: {
            fontSize: bodyFontSize,
            paddingBottom: bodyPaddingBottom
          }
        };

  const numberOfColumns = {
    mobile: columnBreaks["mobile"],
    tablet: columnBreaks["tablet"],
    desktop: Object.keys(innerBlocks).length
  };

  const columnsResponsive =
    !editMode && responsive
      ? {
          [`@media all and (min-width: ${minWidthTablet})`]: {
            maxWidth: `${(1 / numberOfColumns["tablet"]) * 100}%`,
            flexBasis: `${(1 / numberOfColumns["tablet"]) * 100}%`
          },
          [`@media all and (min-width: ${minWidthDesktop})`]: {
            maxWidth: `${(1 / numberOfColumns["desktop"]) * 100}%`,
            flexBasis: `${(1 / numberOfColumns["desktop"]) * 100}%`
          }
        }
      : undefined;

  return (
    <Accordion
      {...{
        style: { padding: 0 },
        className: css({
          textAlign: titleTextAlign,
          ".s4tw-dynablocks-accordion-column": {
            textAlign: headingTextAlign,
            maxWidth:
              !editMode && responsive
                ? `${(1 / numberOfColumns.mobile) * 100}%`
                : "100%",
            flexBasis:
              !editMode && responsive
                ? `${(1 / numberOfColumns.mobile) * 100}%`
                : "100%",
            ...merge({}, columnsResponsive, paddingColumnResponsive),
            ".s4tw-dynablocks-accordion-column-element": {
              textAlign: bodyTextAlign,
              ...paddingResponsive,
              ".dashicon": {
                width: headingFontSize,
                path: {
                  fill: headingColor
                }
              },
              h4: {
                color: headingColor,
                margin: 0,
                ...merge({}, paddingResponsive, headingResponsive)
              },
              p: {
                color: bodyColor,
                margin: 0,
                ...merge({}, paddingResponsive, bodyResponsive)
              }
            }
          }
        })
      }}
    >
      {editMode && update && setAttributes ? (
        <Fragment>
          <RichText
            {...{
              value: titleText,
              placeholder: "Dynablocks Accordion",
              onChange: update("titleText"),
              tagName: "h2",
              style: {
                color: titleColor,
                fontSize: titleFontSize,
                margin: 0,
                padding: 0
              }
            }}
          />
          <ResizableBox
            {...{
              height: titleMargin["bottom"],
              update: value => {
                setAttributes({
                  titleMargin: {
                    ...titleMargin,
                    bottom: value as string
                  }
                });
              },
              isSelected: isSelected ? true : false,
              resizeRatio: 1,
              enable: {
                top: false,
                right: false,
                bottom: true,
                left: false,
                topRight: false,
                bottomRight: false,
                bottomLeft: false,
                topLeft: false
              }
            }}
          />
          <InnerBlocks
            {...{
              template,
              allowedBlocks: ["s4tw/dynablocks-accordion-column"]
            }}
          />
        </Fragment>
      ) : (
        <Fragment>
          <RichText.Content
            {...{
              value: titleText,
              tagName: "h2",
              style: {
                color: titleColor,
                marginBottom: !responsive ? titleMargin["bottom"] : undefined,
                marginTop: 0,
                marginRight: 0,
                marginLeft: 0,
                padding: 0
              },
              className: css({
                ...titleResponsive
              })
            }}
          />
          <Row
            {...{
              style: {
                margin: 0
              }
            }}
          >
            {blockOrder.map(entry => (
              <DynablocksAccordionColumn
                {...{
                  ...innerBlocks[entry].attributes
                }}
              />
            ))}
          </Row>
        </Fragment>
      )}
    </Accordion>
  );
};
