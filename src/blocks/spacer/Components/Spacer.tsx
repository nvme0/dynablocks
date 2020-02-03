import { compose } from "@wordpress/compose";
import { withDispatch } from "@wordpress/data";
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
  toggleSelection: (isSelectionEnabled?: boolean | undefined) => void;
}

const Core = (props: SliderProps) => {
  const {
    editMode = false,
    isSelected = false,
    update,
    toggleSelection,
    height,
    resizeRatio,
    responsive = false,
    scaleTablet = 1.0,
    scaleMobile = 1.0,
    minWidthDesktop = "1024px",
    minWidthTablet = "600px"
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
        className: classnames(
          "block-library-spacer__resize-container",
          {
            "is-selected": isSelected
          },
          css({ marginBottom: 0 })
        ),
        size: { height },
        minHeight: 20,
        resizeRatio,
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
          toggleSelection(true);
          const { size, units } = extractSizeAndUnits(height);
          const spacerHeight = Math.round(size + delta.height);
          update(`${spacerHeight}${units}`);
        },
        onResizeStart: () => toggleSelection(false)
      }}
    />
  ) : (
    <div className={css({ height, ...heightResponsive })} />
  );
};

export default compose(
  withDispatch(dispatch => {
    const { toggleSelection } = dispatch("core/block-editor");
    return { toggleSelection };
  })
)(Core);
