import { css } from "emotion";
import Slider from "react-slick";
import { StyledButton } from "@solutions4theweb/dynablocks-common/dist/Components/Bootstrap/Button";
import { Attributes } from "../editor/attributes";
import {
  Responsive,
  generateResponsiveCSS
} from "@solutions4theweb/dynablocks-common/dist/helpers";

export interface SliderProps extends Attributes {
  posts: any[];
  editMode?: boolean;
}

export default (props: SliderProps): JSX.Element => {
  const {
    posts,
    filterColor,
    h2FontSize,
    h2MarginBottom,
    h2Color,
    h3FontSize,
    h3MarginBottom,
    h3Color,
    height,
    editMode = false,
    responsive = false,
    scaleTablet = 1.0,
    scaleMobile = 1.0,
    minWidthDesktop = "1024px",
    minWidthTablet = "600px"
  } = props;

  let h2Responsive: Responsive = {};
  let h3Responsive: Responsive = {};
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
    h3Responsive = generateResponsiveCSS(
      [
        { name: "fontSize", size: h3FontSize },
        { name: "marginBottom", size: h3MarginBottom }
      ],
      responsiveParameters
    );
  }

  return (
    <Slider
      accessibility={false}
      speed={1000}
      autoplaySpeed={4000}
      autoplay={false}
      arrows={true}
      fade={true}
      dots={true}
    >
      {posts ? (
        posts.map(post => (
          <div className="wrapper">
            <div
              className="slide-container"
              style={{
                backgroundImage: `url(${post.featuredImageSrc})`,
                height
              }}
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
                  <a href={editMode ? undefined : post.link}>
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
                    >
                      {post.title}
                    </h2>
                  </a>
                  <h3
                    style={{
                      color: h3Color,
                      fontSize:
                        !responsive || editMode ? h3FontSize : undefined,
                      marginBottom:
                        !responsive || editMode ? h3MarginBottom : undefined
                    }}
                    className={css({
                      textAlign: "center",
                      ...h3Responsive
                    })}
                  >
                    {post.subtitle}
                  </h3>
                  <StyledButton
                    {...{
                      ...props,
                      text: "Read More",
                      editMode,
                      buttonUrl: post.link
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="wrapper"></div>
      )}
    </Slider>
  );
};
