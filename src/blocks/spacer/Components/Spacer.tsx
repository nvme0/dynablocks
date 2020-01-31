import { css } from "emotion";
import { Attributes } from "../editor/attributes";
import { Responsive, generateResponsiveCSS } from "../../../common/helpers";

export interface SliderProps extends Attributes {
  editMode?: boolean;
  update?: (property: string) => (value: any) => void;
}

export default (props: SliderProps) => {
  const {
    update,
    height,
    editMode = false,
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

  return <div className={css({ ...heightResponsive })}></div>;
};
