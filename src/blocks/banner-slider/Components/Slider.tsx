import { Fragment } from "@wordpress/element";
import { InnerBlocks } from "@wordpress/block-editor";
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
                  {/* Are these 3 different components?? Should banner-slider be a "Layout"??
                    Blocks: h2, StyledButton
                    Layout: banner-slider
                  */}
                  {/* <h2>hello, world</h2> */}
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
                  {editMode ? (
                    // TODO - figure out a better way to render blocks on frontend
                    // Maybe give each block an Inner Blocks Attribute (Array of blocks)
                    // Also give each block a "render method" and same class, that way
                    // one render method can be used for all blocks
                    <InnerBlocks
                      {...{
                        template: [
                          [
                            "s4tw/dynablocks-button",
                            { ...props, text: buttonText, editMode }
                          ]
                        ],
                        templateLock: "all"
                      }}
                    />
                  ) : (
                    <StyledButton {...{ ...props, text: buttonText }} />
                  )}
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

// export default hot(SliderWrapper);
