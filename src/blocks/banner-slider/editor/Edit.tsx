import { BlockEditProps } from "@wordpress/blocks";
import { BlockControls, AlignmentToolbar } from "@wordpress/block-editor";
import { useState } from "@wordpress/element";
import { Toolbar, ToolbarButton } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import Slider from "../Components/Slider";
import ElementControls from "./ElementControls";
import { Attributes } from "./attributes";
import { icon } from "./settings";
import { ImagePlaceholder } from "@solutions4theweb/dynablocks-common/dist/Components/Controls";

export interface EditProps extends BlockEditProps<Attributes> {
  clientId?: string;
}

export const Edit = (props: EditProps): JSX.Element => {
  const { attributes, setAttributes, isSelected, clientId } = props;
  const { editorId, backgroundImages, h2TextAlignment } = attributes;

  if (clientId !== editorId) {
    setTimeout(() => setAttributes({ editorId: clientId }), 1000);
  }

  const [isDraggable, setIsDraggable] = useState(false);

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
        onSelect: update("backgroundImages")
      }}
    />
  );

  return (
    <div className="s4tw-dynablocks-banner-slider">
      <BlockControls>
        <Toolbar>
          <ToolbarButton
            {...{
              icon: "move",
              title: "Position",
              onClick: () => {
                setIsDraggable(!isDraggable);
              },
              isActive: isDraggable
            }}
          />
          <AlignmentToolbar
            {...{
              value: h2TextAlignment,
              onChange: value => update("h2TextAlignment")(value)
            }}
          />
        </Toolbar>
      </BlockControls>
      <ElementControls
        {...{
          update,
          updateColorPicker,
          ...attributes
        }}
      />
      <Slider
        {...{
          isSelected,
          update,
          setAttributes,
          isDraggable,
          editMode: true,
          BackgroundSettings:
            backgroundImages.length < 1 || isSelected
              ? BackgroundSettings
              : undefined,
          ...attributes
        }}
      />
    </div>
  );
};
