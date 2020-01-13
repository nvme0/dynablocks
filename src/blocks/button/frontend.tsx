import { render } from "@wordpress/element";
import { StyledButton } from "../../common/Components/Bootstrap/Button";
import { Attributes } from "./editor/attributes";
import { getBlocksOfType } from "../../common/helpers";

export const StyledButtonWrapper = (props: Attributes): JSX.Element => {
  const { buttonText: text } = props;
  return (
    <StyledButton
      {...{
        ...props,
        text
      }}
    />
  );
};

const blocks = getBlocksOfType(".s4tw-dynablocks-button");
blocks.forEach(({ block, props }) => {
  render(<StyledButtonWrapper {...JSON.parse(props)} />, block);
});
