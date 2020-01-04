import { css } from "emotion";
import classnames from "classnames";
import { Attributes } from "../editor/attributes";

export interface DividerProps extends Attributes {
  className?: string;
}

export default (props: DividerProps): JSX.Element => {
  const { backgroundImage, height, className } = props;
  return (
    <div
      className={classnames(
        css({ height }),
        `s4tw-dynablocks-image-block ${className}`
      )}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      }}
    />
  );
};
