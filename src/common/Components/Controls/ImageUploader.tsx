import { css } from "emotion";
import { MediaUpload } from "@wordpress/block-editor";
import { IconButton } from "@wordpress/components";

export interface Props {
  name: string;
  value: number | number[] | undefined;
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
          title: "Select or Upload an Image",
          onSelect,
          allowedTypes: ["image"],
          multiple,
          gallery,
          value
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
