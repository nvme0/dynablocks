import { css } from "emotion";
import { ColorPicker } from "@wordpress/components";
import { Fragment } from "@wordpress/element";

export interface Props {
  name?: string;
  color: string;
  disableAlpha: boolean;
  update: (value: any) => void;
}

export default (props: Props): JSX.Element => {
  const { name, color, disableAlpha, update } = props;
  return (
    <Fragment>
      {name && (
        <p>
          <strong>{name}</strong>
        </p>
      )}
      <div
        className={css({
          ".components-color-picker__inputs-fields": {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            marginBottom: "8px",
            ".components-base-control__field": {
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              margin: "0 6px",
              label: {
                whiteSpace: "nowrap"
              }
            }
          }
        })}
      >
        <ColorPicker
          {...{
            color,
            onChangeComplete: update,
            disableAlpha
          }}
        />
      </div>
    </Fragment>
  );
};
