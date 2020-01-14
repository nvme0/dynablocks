import { Fragment } from "@wordpress/element";
import { css } from "emotion";
import Slider from "react-slick";
import { StyledButton } from "../../../common/Components/Bootstrap/Button";
import { Attributes } from "../editor/attributes";
import { Responsive, generateResponsiveCSS } from "../../../common/helpers";

export interface SliderProps extends Attributes {
  editMode?: boolean;
  BackgroundSettings?: () => JSX.Element;
}

export default (props: SliderProps): JSX.Element => {
  const {
    backgroundImages: images,
    filterColor,
    h2Text,
    h2FontSize,
    h2MarginBottom,
    h2Color,
    buttonText,
    height,
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
      <Slider
        accessibility={false}
        speed={500}
        autoplaySpeed={4000}
        autoplay={true}
        arrows={false}
        fade={true}
        dots={true}
      >
        {images.map(image => (
          <div className="wrapper">
            <div
              className="slide-container"
              style={{ backgroundImage: `url(${image.url})`, height }}
            >
              <div
                className="dimmer-filter"
                style={{ backgroundColor: filterColor }}
              >
                <div
                  className="content"
                  style={{
                    top: "50%",
                    left: "50%",
                    animationName: "show1",
                    animationDuration: "1s",
                    fontFamily: "'Varela Round', sans-serif, Arial, Helvetica"
                  }}
                >
                  <h2
                    style={{
                      color: h2Color,
                      fontSize:
                        !responsive || editMode ? h2FontSize : undefined,
                      marginBottom:
                        !responsive || editMode ? h2MarginBottom : undefined
                    }}
                    className={css({
                      textAlign: "center",
                      ...h2Responsive
                    })}
                    dangerouslySetInnerHTML={{
                      __html: h2Text.replace(/(?:\r\n|\r|\n)/g, "<br />")
                    }}
                  />
                  <StyledButton
                    {...{
                      ...props,
                      text: buttonText,
                      editMode
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      {BackgroundSettings && <BackgroundSettings />}
      {/* {editMode && (!images.length || isSelected) && <BackgroundSettings />} */}
    </Fragment>
  );
};
