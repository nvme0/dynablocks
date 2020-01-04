import { css } from "emotion";
import { TextControl } from "@wordpress/components";

export interface Props {
  name: string;
  value: string | number;
  update: (value: any) => void;
  disabled?: boolean;
  secondary?: boolean;
  units?: string;
}

export default (props: Props): JSX.Element => {
  const { name, value, update, disabled, secondary, units } = props;
  return secondary ? (
    <div
      className={css({
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        marginBottom: "16px",
        p: {
          display: "flex",
          alignItems: "center",
          margin: 0
        }
      })}
    >
      <p>
        <strong>{name}</strong>
      </p>
      <TextControl
        {...{
          value,
          onChange: update,
          disabled,
          className: css({
            maxWidth: "154px",
            marginBottom: 0 + "!important",
            ".components-base-control__field": {
              marginBottom: 0
            }
          })
        }}
      />
      {units && <p>{units}</p>}
    </div>
  ) : (
    <div className={css({ marginBottom: "16px" })}>
      <p>
        <strong>{name}</strong>
      </p>
      <TextControl
        {...{
          value,
          onChange: update,
          disabled
        }}
      />
      {units && <p>{units}</p>}
    </div>
  );
};
