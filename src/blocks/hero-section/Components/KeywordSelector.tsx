import { SelectControl } from "@wordpress/components";

export default (props: {
  keywordsArray: string[];
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  disabled?: boolean;
}): JSX.Element => {
  const { keywordsArray, index, setIndex, disabled } = props;

  const options = keywordsArray
    ? keywordsArray.map(value => ({
        value,
        label: value
      }))
    : undefined;

  const onChange = (keyword: string) =>
    setIndex(keywordsArray.findIndex(element => element === keyword));

  return (
    <SelectControl
      label={"Show keyword"}
      value={keywordsArray[index]}
      options={options}
      onChange={onChange}
      disabled={disabled}
    />
  );
};
