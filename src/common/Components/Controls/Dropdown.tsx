import { SelectControl } from "@wordpress/components";

export interface Props {
  name: string;
  value: string;
  options: string[];
  update: (value: any) => void;
  type?: "primary" | "secondary";
}

export default (props: Props): JSX.Element => {
  const { name, value, options, update, type = "primary" } = props;
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <p style={{ display: "flex", alignItems: "center" }}>
        {type === "primary" && <strong>{name}</strong>}
        {type === "secondary" && name}
      </p>
      <SelectControl
        {...{
          value,
          options: options.map(selected => ({
            value: selected,
            label: selected
          })),
          onChange: update
        }}
      />
    </div>
  );
};
