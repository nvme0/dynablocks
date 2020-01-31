import { Attributes } from "./editor/attributes";
import Spacer from "./Components/Spacer";

export const className = ".s4tw-dynablocks-banner-slider";

export const EntryPoint = (props: Attributes): JSX.Element => {
  const { height } = props;
  return (
    <div className="s4tw-dynablocks-spacer" style={{ height: height }}>
      <Spacer {...props} />
    </div>
  );
};
