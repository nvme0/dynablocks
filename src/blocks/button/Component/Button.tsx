import { StyledButton } from "@solutions4theweb/dynablocks-common/dist/Components/Bootstrap/Button";
import { Attributes } from "../editor/attributes";

export interface ButtonProps extends Attributes {
  updateText?: (value: any) => void;
}

// TODO - make only child of button-group (remove independence). Remove alignment -> support none
export default (props: ButtonProps) => {
  const { buttonText: text, updateText } = props;
  return (
    <div className="s4tw-dynablocks-button">
      <StyledButton
        {...{
          ...props,
          text,
          editMode: !!updateText
        }}
      />
    </div>
  );
};
