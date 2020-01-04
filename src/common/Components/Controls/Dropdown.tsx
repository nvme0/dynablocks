import { SelectControl } from "@wordpress/components";

export interface Props {
  name: string;
  value: string;
  options: string[];
  update: (value: any) => void;
}

export default (props: Props): JSX.Element => {
  const { name, value, options, update } = props;
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <p style={{ display: "flex", alignItems: "center" }}>
        <strong>{name}</strong>
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
