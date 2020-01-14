import { Dashicon } from "@wordpress/components";
import { MediaPlaceholder } from "@wordpress/block-editor";
import { some } from "lodash";

export interface Props {
  value: any;
  labels?: {
    title?: string;
    instructions?: string;
  };
  icon?: Dashicon.Icon | JSX.Element;
  onSelect: (value: Array<{ id: number } & { [k: string]: any }>) => void;
}

export default (props: Props): JSX.Element => {
  const { value, labels, icon, onSelect } = props;

  let properties: {
    isAppender: boolean;
    addToGallery: boolean;
    multiple: boolean;
    value: number | number[] | undefined;
  };

  if (Array.isArray(value)) {
    const hasImages = !!value.length;
    const hasImagesWithId = hasImages && some(value, ({ id }) => id);
    properties = {
      isAppender: hasImages,
      addToGallery: hasImagesWithId,
      multiple: true,
      value: hasImagesWithId ? value : undefined
    };
  } else {
    properties = {
      isAppender: false,
      addToGallery: false,
      multiple: false,
      value
    };
  }

  return (
    <MediaPlaceholder
      {...{
        labels,
        icon,
        onSelect,
        accept: "image/*",
        allowedTypes: ["image"],
        ...properties
      }}
    />
  );
};
