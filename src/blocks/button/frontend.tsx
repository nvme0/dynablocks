import { StyledButton } from "../../common/Components/Bootstrap/Button";
import { Attributes } from "./editor/attributes";

export const className = ".s4tw-dynablocks-button";

export const EntryPoint = (props: Attributes): JSX.Element => {
  const { buttonText: text } = props;
  return (
    <StyledButton
      {...{
        ...props,
        text,
        style: {
          position: "relative",
          transform: `translateX(-50%)`
        }
      }}
    />
  );
};
