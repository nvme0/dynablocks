import { render } from "@wordpress/element";
import { StyledButton } from "../../common/Components/Bootstrap/Button";
import { Attributes } from "./editor/attributes";

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

const buttons = document.querySelectorAll(".s4tw-dynablocks-button");
buttons.forEach(button => {
  let properties = button.innerHTML;
  properties = properties.replace(new RegExp("”", "g"), '"');
  properties = properties.replace(new RegExp("“", "g"), '"');
  properties = properties.replace(new RegExp("″", "g"), '"'); // prime?
  properties = properties.replace(new RegExp("×", "g"), "x");
  render(<StyledButtonWrapper {...JSON.parse(properties)} />, button);
});
