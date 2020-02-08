import { StyledButton } from "../../../common/Components/Bootstrap/Button";
import { Attributes } from "../editor/attributes";

export interface ButtonProps extends Attributes {
  editMode?: boolean;
  updateText?: (value: any) => void;
}

// TODO - make only child of button-group (remove independence). Remove alignment -> support none
export default (props: ButtonProps) => {
  const { buttonText: text, align, updateText } = props;
  return (
    <div className="s4tw-dynablocks-button" style={{ textAlign: align }}>
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