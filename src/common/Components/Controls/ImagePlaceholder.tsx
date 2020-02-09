import { Dashicon } from "@wordpress/components";
import { MediaPlaceholder } from "@wordpress/block-editor";
import { some } from "lodash";

export interface Image {
  alt: string;
  caption: string;
  id: number;
  link: string;
  mime: string;
  sizes: any;
  subtype: string;
  type: string;
  url: string;
}

const ImagePlaceholder = (props: {
  value: Image | Image[];
  labels?: {
    title?: string;
    instructions?: string;
  };
  icon?: Dashicon.Icon | JSX.Element;
  onSelect: (value: Image | Image[]) => void;
}): JSX.Element => {
  const { value, labels, icon, onSelect } = props;

  let properties: {
    isAppender: boolean;
    addToGallery: boolean;
    multiple: boolean;
    value: any;
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

export default ImagePlaceholder;
