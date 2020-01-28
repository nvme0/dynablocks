import { StyledButton } from "../../common/Components/Bootstrap/Button";
import { Attributes } from "./editor/attributes";

export const className = ".s4tw-dynablocks-button";

export const EntryPoint = (props: Attributes): JSX.Element => {
  const {
    buttonText: text,
    buttonPosition: { left, top }
  } = props;
  const style: React.CSSProperties = {
    position: "relative",
    // display: "inline-block", - should this be inline block?? probably not.
    transform: "translateX(-50%)",
    left: `${left.value}${left.units}`,
    top: `${top.value}${left.units}`
  };
  return (
    <StyledButton
      {...{
        ...props,
        text,
        style
      }}
    />
  );
};
