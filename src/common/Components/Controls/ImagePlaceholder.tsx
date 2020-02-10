import { Dashicon } from "@wordpress/components";
import { MediaPlaceholder, EditorBaseSetting } from "@wordpress/block-editor";
import { some, get, map, filter } from "lodash";
import { select } from "@wordpress/data";

export interface ImageSize {
  height: number;
  width: number;
  url: string;
  orientation: string;
}

export interface Image {
  alt: string;
  caption: string;
  id: number;
  link: string;
  mime: string;
  sizes: { [slug: string]: ImageSize };
  subtype: string;
  type: string;
  url: string;
}

export const getImageSizeOptions = (image: Image | undefined) => {
  if (!image) return [];
  const { imageSizes } = select("core/block-editor").getSettings();
  const sizeOptions = map(
    filter(imageSizes, ({ slug }) => get(image, ["sizes", slug, "url"]))
  ) as EditorBaseSetting[];
  return sizeOptions.map(({ name, slug }) => ({ value: slug, label: name }));
};

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
