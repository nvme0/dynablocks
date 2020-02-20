import { css } from "emotion";
import { Attributes } from "./attributes";
import { Responsive, generateResponsiveCSS } from "../../../common/helpers";
import ResizableBox from "../../../common/Components/ResizableBox";

export interface SpacerProps extends Attributes {
  editMode?: boolean;
  isSelected?: boolean;
  update?: (value: any) => void;
  minHeight?: string | number;
  responsive?: boolean;
  scaleTablet?: number;
  scaleMobile?: number;
  minWidthDesktop?: string;
  minWidthTablet?: string;
  type?: "top" | "right" | "bottom" | "left";
  style?: React.CSSProperties;
}

export default (props: SpacerProps) => {
  const {
    editMode = false,
    isSelected = false,
    update,
    height,
    width,
    resizeRatio,
    responsive = false,
    scaleTablet = 1.0,
    scaleMobile = 1.0,
    minWidthDesktop = "1024px",
    minWidthTablet = "600px",
    type = "bottom",
    style
  } = props;

  let heightResponsive: Responsive = {};
  if (!editMode && responsive) {
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

    if (height) {
      heightResponsive = generateResponsiveCSS(
        [{ name: "height", size: height }],
        responsiveParameters
      );
    }
  }

  return editMode && update ? (
    <ResizableBox
      {...{
        height,
        width,
        update,
        isSelected,
        resizeRatio,
        enable: {
          top: type === "top",
          right: type === "right",
          bottom: type === "bottom",
          left: type === "left",
          topRight: false,
          bottomRight: false,
          bottomLeft: false,
          topLeft: false
        },
        style
      }}
    />
  ) : (
    <div className={css({ height, ...heightResponsive })} />
  );
};
