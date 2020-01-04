import { css } from "emotion";
import { TextareaControl } from "@wordpress/components";

export interface Props {
  name: string;
  rows?: number;
  value: string;
  update: (value: any) => void;
}

export default (props: Props): JSX.Element => {
  const { name, rows, value, update } = props;
  return (
    <div className={css({ marginBottom: "16px" })}>
      <p>
        <strong>{name}</strong>
      </p>
      <TextareaControl
        {...{
          rows,
          value,
          onChange: update
        }}
      />
    </div>
  );
};
