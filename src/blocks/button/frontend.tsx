import Button from "./Component/Button";
import { Attributes } from "./editor/attributes";

export const className = ".s4tw-dynablocks-button";

export const EntryPoint = (props: Attributes): JSX.Element => {
  const { buttonText: text } = props;
  return (
    <Button
      {...{
        ...props,
        text
      }}
    />
  );
};
