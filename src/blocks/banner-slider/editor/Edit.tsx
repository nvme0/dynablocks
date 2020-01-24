import { BlockEditProps } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import Slider from "../Components/Slider";
import ElementControls from "./ElementControls";
import { Attributes } from "./attributes";
import { icon } from "./settings";
import { ImagePlaceholder } from "../../../common/Components/Controls";

interface EditProps extends BlockEditProps<Attributes> {
  clientId?: string;
}

export const Edit = (props: EditProps): JSX.Element => {
  const { attributes, setAttributes, isSelected, clientId } = props;
  const { backgroundImages } = attributes;

  const update = property => value => {
    setAttributes({ [property]: value });
  };

  const updateColorPicker = property => value => {
    const { a, b, g, r } = value.rgb;
    const rgbaValue = `rgba(${r},${g},${b},${a})`;
    update(property)(rgbaValue);
  };

  const BackgroundSettings = (): JSX.Element => (
    <ImagePlaceholder
      {...{
        value: backgroundImages,
        labels: {
          title: __("Banner Slider"),
          instructions: __(
            "Drag images, upload new ones or select files from your library."
          )
        },
        icon,
        onSelect: value => {
          if (update) {
            update("backgroundImages")(value);
          }
        }
      }}
    />
  );

  return (
    <div className="s4tw-dynablocks-banner-slider">
      <ElementControls
        {...{
          update,
          updateColorPicker,
          ...attributes
        }}
      />
      <Slider
        {...{
          clientId,
          update,
          editMode: true,
          BackgroundSettings:
            backgroundImages.length < 1 || isSelected
              ? BackgroundSettings
              : undefined,
          backgroundImages,
          ...attributes
        }}
      />
    </div>
  );
};
