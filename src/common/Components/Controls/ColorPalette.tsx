import { css } from "emotion";
import { ColorPalette, PanelRow } from "@wordpress/components";

export interface Props {
  name: string;
  value: string;
  colors: string[];
  update: (value: any) => void;
  style?: React.CSSProperties;
}

export default (props: Props): JSX.Element => {
  const { name, value, colors, update, style } = props;
  const _value = value as any;
  const _colors = colors as any;

  return (
    <PanelRow
      className={css({
        margin: "16px 0",
        p: {
          marginBottom: 0,
          whiteSpace: "nowrap"
        },
        ...style
      })}
    >
      <p>
        <strong>{name}</strong>
      </p>
      <div
        style={{
          padding: "6px",
          marginLeft: "5px",
          backgroundColor: value,
          borderRadius: "50px",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "#000"
        }}
      ></div>
      <ColorPalette
        {...{
          value: _value,
          onChange: update,
          colors: _colors
        }}
      />
    </PanelRow>
  );
};
