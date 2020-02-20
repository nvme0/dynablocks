import { css } from "emotion";
import { MediaUpload } from "@wordpress/block-editor";
import { IconButton } from "@wordpress/components";
import { Image } from "./ImagePlaceholder";

export interface Props {
  name: string;
  value: Image;
  multiple?: boolean;
  gallery?: boolean;
  onSelect: (value: any | any[]) => void;
}

export default (props: Props): JSX.Element => {
  const { name, value, multiple, gallery, onSelect } = props;
  return (
    <div className={css({ marginBottom: "16px" })}>
      <p>
        <strong>{name}</strong>
      </p>
      <MediaUpload
        {...{
          title: multiple
            ? "Select or Upload Images"
            : "Select or Upload an Image",
          onSelect,
          allowedTypes: ["image"],
          multiple,
          gallery,
          value: value as any
        }}
        render={({ open }) => {
          return (
            <IconButton
              {...{
                onClick: open,
                icon: "upload",
                className:
                  "editor-media-placeholder__button is-button is-default is-large"
              }}
            >
              {name}
            </IconButton>
          );
        }}
      />
    </div>
  );
};
