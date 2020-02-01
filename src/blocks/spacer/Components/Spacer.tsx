import { ResizableBox } from "@wordpress/components";
import classnames from "classnames";
import { css } from "emotion";
import { Attributes } from "../editor/attributes";
import {
  Responsive,
  generateResponsiveCSS,
  extractSizeAndUnits
} from "../../../common/helpers";

export interface SliderProps extends Attributes {
  editMode?: boolean;
  isSelected?: boolean;
  update?: (value: any) => void;
}

export default (props: SliderProps) => {
  const {
    editMode = false,
    isSelected = false,
    update,
    height,
    responsive = false,
    scaleTablet = 1.0,
    scaleMobile = 1.0,
    minWidthDesktop = "1024px",
    minWidthTablet = "608px"
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

    heightResponsive = generateResponsiveCSS(
      [{ name: "height", size: height }],
      responsiveParameters
    );
  }

  return editMode && update ? (
    <ResizableBox
      {...{
        className: classnames("block-library-spacer__resize-container", {
          "is-selected": isSelected
        }),
        size: { height },
        minHeight: 0,
        enable: {
          top: false,
          right: false,
          bottom: true,
          left: false,
          topRight: false,
          bottomRight: false,
          bottomLeft: false,
          topLeft: false
        },
        onResizeStop: (event, direction, elt, delta) => {
          const { size, units } = extractSizeAndUnits(height);
          const spacerHeight = Math.round(size + delta.height);
          update(`${spacerHeight}${units}`);
        }
      }}
    />
  ) : (
    <div className={css({ height, ...heightResponsive })} />
  );
};
