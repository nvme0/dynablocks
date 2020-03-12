import { Fragment, useRef } from "@wordpress/element";
import { Attributes } from "../editor/attributes";
import { ControlProps } from "../editor/ElementControls";
import {
  Responsive,
  generateResponsiveCSS
} from "@solutions4theweb/dynablocks-common/dist/helpers";
import withDraggable, {
  updatePositionCallback
} from "@solutions4theweb/dynablocks-common/dist/HOCs/withDraggable";
import Elements from "./Elements";

export interface HeroProps extends Attributes {
  controlProps?: ControlProps;
  isSelected?: boolean;
  editMode?: boolean;
  isDraggable?: boolean;
  BackgroundSettings?: () => JSX.Element;
  update?: (property: string) => (value: any) => void;
  setAttributes?: (attrs: Partial<Attributes>) => void;
}

export default (props: HeroProps): JSX.Element => {
  const {
    isSelected,
    setAttributes,
    isDraggable,
    elementsPosition,
    elementsTranslate: { left: translateX, top: translateY },
    height,
    filterColor,
    backgroundImage,
    backgroundImageSize,
    h2FontSize,
    h2MarginBottom,
    editMode = false,
    responsive = false,
    scaleTablet = 1.0,
    scaleMobile = 1.0,
    minWidthDesktop = "1024px",
    minWidthTablet = "600px",
    BackgroundSettings,
    controlProps
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);

  let h2Responsive: Responsive = {};
  if (!controlProps && responsive) {
    const responsiveParameters = [
      { name: "mobile", scale: scaleMobile },
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

    h2Responsive = generateResponsiveCSS(
      [
        { name: "fontSize", size: h2FontSize },
        { name: "marginBottom", size: h2MarginBottom }
      ],
      responsiveParameters
    );
  }

  const DraggableElements =
    editMode && setAttributes
      ? withDraggable({
          updateCallback: updatePositionCallback(
            "elementsPosition",
            "elementsPositionLimits",
            {
              left: elementsPosition["left"]["units"],
              top: elementsPosition["top"]["units"]
            },
            setAttributes
          ),
          position: elementsPosition,
          parentSize: {
            width: containerRef.current
              ? containerRef.current.clientWidth
              : null,
            height: containerRef.current
              ? containerRef.current.clientHeight
              : null
          },
          transforms: {
            translateX: {
              value: translateX["value"],
              units: translateX["units"]
            },
            translateY: {
              value: translateY["value"],
              units: translateY["units"]
            }
          },
          adjustmentFactor: {
            x: 1,
            y: 1 // negative inverse of translate.. e.g. 100/(100% - translateX(-90%)) = 1 / 0.1.
          },
          lockX: false,
          lockY: false,
          style: {
            display: "inline-block",
            position: "relative",
            transform: `translate(${translateX["value"]}${translateX["units"]}, ${translateY["value"]}${translateY["units"]})`
          }
        })(Elements)
      : Elements;

  const { left, top } = elementsPosition;

  const imageSrc = backgroundImage
    ? backgroundImageSize
      ? backgroundImage.sizes[backgroundImageSize].url
      : backgroundImage.url
    : undefined;

  return (
    <Fragment>
      {backgroundImage && (
        <Fragment>
          <div
            className="content"
            style={{
              height,
              width: "100%",
              position: "absolute",
              fontFamily: "'Varela Round', sans-serif, Arial, Helvetica"
            }}
            ref={containerRef}
          >
            {isDraggable ? (
              <DraggableElements
                {...{ ...props, h2Responsive, update: undefined }}
              />
            ) : (
              <Elements
                {...{
                  ...props,
                  isSelected,
                  h2Responsive,
                  style: {
                    display: "inline-block",
                    position: "relative",
                    transform: `translate(${translateX["value"]}${translateX["units"]}, ${translateY["value"]}${translateY["units"]})`,
                    left: `${left.value}${left.units}`,
                    top: `${top.value}${left.units}`
                  }
                }}
              />
            )}
          </div>
          <div className="wrapper">
            <div
              className="hero-container"
              style={{
                backgroundImage: `url(${imageSrc})`,
                height
              }}
            >
              <div
                className="dimmer-filter"
                style={{ backgroundColor: filterColor }}
              />
            </div>
          </div>
        </Fragment>
      )}
      {BackgroundSettings && <BackgroundSettings />}
    </Fragment>
  );
};
