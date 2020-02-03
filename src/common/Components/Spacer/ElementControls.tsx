import { PanelBody } from "@wordpress/components";
import { TextControl } from "../../../common/Components/Controls";
import { Attributes } from "./attributes";

export interface ControlProps {
  update: (property: string) => (value: any) => void;
  initialOpen?: boolean;
}

export type Props = Attributes & ControlProps;

export const SpacerControls = (props: Props): JSX.Element => {
  const { update, height, initialOpen = false } = props;
  return (
    <PanelBody {...{ title: "Height", initialOpen }}>
      <TextControl
        {...{
          name: "",
          value: height,
          update: update("height")
        }}
      />
    </PanelBody>
  );
};
