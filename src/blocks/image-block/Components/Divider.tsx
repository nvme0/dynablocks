import { css } from "emotion";
import classnames from "classnames";
import { Attributes } from "../editor/attributes";

export interface DividerProps extends Attributes {
  className?: string;
  editMode?: boolean;
}

export default (props: DividerProps): JSX.Element => {
  const {
    backgroundImage,
    backgroundImageSize,
    filterColor,
    height,
    margin,
    backgroundPosition,
    className,
    editMode
  } = props;

  const imageSrc = backgroundImage
    ? backgroundImageSize
      ? backgroundImage.sizes[backgroundImageSize].url
      : backgroundImage.url
    : undefined;

  return (
    <div
      className={classnames(
        `${className}`,
        css({
          height,
          margin: editMode
            ? undefined
            : `${margin["top"]}px ${margin["right"]}px ${margin["bottom"]}px ${margin["left"]}px`
        })
      )}
      style={{
        backgroundImage: `url(${imageSrc})`,
        backgroundPosition:
          backgroundPosition["type"] !== "custom"
            ? backgroundPosition["type"]
            : `${backgroundPosition["x"].value}${backgroundPosition["x"].units} ${backgroundPosition["y"].value}${backgroundPosition["y"].units}`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundColor: filterColor
      }}
    >
      <div
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: filterColor
        }}
      />
    </div>
  );
};
