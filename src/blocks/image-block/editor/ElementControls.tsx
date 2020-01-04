import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody } from "@wordpress/components";
import { Attributes } from "./attributes";
import {
  ImageUploader,
  TextControl
} from "../../../common/Components/Controls";

export interface ControlProps {
  update: (property: string) => (value: any) => void;
  updateBackgroundImage: (image: { id: number } & { [k: string]: any }) => void;
}

export type Props = Attributes & ControlProps;

export default (props: Props): JSX.Element => {
  const { backgroundImage, updateBackgroundImage, update, height } = props;
  return (
    <InspectorControls>
      <PanelBody {...{ title: "Settings" }}>
        <TextControl
          {...{
            name: "Height:",
            value: height,
            secondary: true,
            update: update("height")
          }}
        />
        <ImageUploader
          {...{
            name: "Background Image",
            value: backgroundImage,
            multiple: false,
            gallery: false,
            onSelect: updateBackgroundImage
          }}
        />
      </PanelBody>
    </InspectorControls>
  );
};
