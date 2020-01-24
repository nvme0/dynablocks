import { Fragment } from "@wordpress/element";
import { css } from "emotion";
import Slider from "react-slick";
import { Attributes } from "../editor/attributes";
import { Responsive, generateResponsiveCSS } from "../../../common/helpers";
import Slide from "./Slide";
import Elements from "./Elements";

export interface SliderProps extends Attributes {
  clientId?: string;
  editMode?: boolean;
  BackgroundSettings?: () => JSX.Element;
  update?: (property: string) => (value: any) => void;
}

export default (props: SliderProps): JSX.Element => {
  const {
    update,
    backgroundImages: images,
    h2FontSize,
    h2MarginBottom,
    editMode = false,
    responsive = false,
    scaleTablet = 1.0,
    scaleMobile = 1.0,
    minWidthDesktop = "1024px",
    minWidthTablet = "608px",
    BackgroundSettings
  } = props;

  let h2Responsive: Responsive = {};
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

    h2Responsive = generateResponsiveCSS(
      [
        { name: "fontSize", size: h2FontSize },
        { name: "marginBottom", size: h2MarginBottom }
      ],
      responsiveParameters
    );
  }

  return (
    <Fragment>
      <Elements {...{ ...props, h2Responsive, update }} />
      <Slider
        accessibility={false}
        speed={500}
        autoplaySpeed={4000}
        autoplay={true}
        arrows={false}
        fade={true}
        dots={true}
        className={css({ zIndex: -1 })}
      >
        {images.map(image => (
          <Slide {...{ ...props, image }} />
        ))}
      </Slider>
      {BackgroundSettings && <BackgroundSettings />}
    </Fragment>
  );
};
