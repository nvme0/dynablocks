import * as CycleText from "../Components/CycleText";
import { StyledButton } from "../../../common/Components/Bootstrap/Button";
import { Attributes } from "../editor/attributes";
import { ControlProps } from "../editor/ElementControls";
import { Responsive, generateResponsiveCSS } from "../../../common/helpers";

export interface HeroProps extends Attributes {
  controlProps?: ControlProps;
}

export default (props: HeroProps): JSX.Element => {
  const {
    controlProps,
    backgroundImage,
    filterColor,
    h2Text,
    h2Color,
    h2FontSize,
    h2MarginBottom,
    keywords,
    keywordsColor,
    keywordsInterval,
    buttonText,
    height,
    responsive,
    scaleMobile,
    scaleTablet,
    minWidthTablet,
    minWidthDesktop
  } = props;

  let h2Responsive: Responsive = {};
  if (!controlProps && responsive) {
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

  let CycleTextElement: () => JSX.Element;
  if (controlProps) {
    const {
      keywordsArray,
      state: { index }
    } = controlProps;
    CycleTextElement = () => (
      <CycleText.Editor
        {...{
          staticText: h2Text,
          style: {
            staticText: { color: h2Color },
            keyword: { color: keywordsColor },
            fontSize: h2FontSize,
            marginBottom: h2MarginBottom
          },
          keyword: keywordsArray[index]
        }}
      />
    );
  } else {
    const keywordsArray = keywords.split(" ");
    CycleTextElement = () => (
      <CycleText.Content
        {...{
          staticText: h2Text,
          style: {
            staticText: { color: h2Color },
            keyword: { color: keywordsColor },
            fontSize: !responsive ? h2FontSize : undefined,
            marginBottom: !responsive ? h2MarginBottom : undefined
          },
          interval: keywordsInterval,
          keywordsArray,
          h2Responsive
        }}
      />
    );
  }

  return (
    <div className="wrapper">
      <div
        className="hero-container"
        style={{ backgroundImage: `url(${backgroundImage})`, height }}
      >
        <div className="dimmer-filter" style={{ backgroundColor: filterColor }}>
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
            <CycleTextElement />
            <StyledButton
              {...{
                ...props,
                text: buttonText,
                editMode: controlProps ? true : false
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
