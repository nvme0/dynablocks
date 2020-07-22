import { BlockEditProps } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { useRef } from "@wordpress/element";
import ElementControls from "./ElementControls";
import { css } from "emotion";
import classnames from "classnames";
import { Attributes } from "./attributes";
import Divider from "../Components/Divider";
import { icon } from "./settings";
import { ImagePlaceholder } from "@inspirewebdesigns/dynablocks-common/dist/Components/Controls";
import { Image } from "@inspirewebdesigns/dynablocks-common/dist/Components/Controls/ImagePlaceholder";
import Spacer from "@inspirewebdesigns/dynablocks-common/dist/Components/Spacer";
import { extractSize } from "@inspirewebdesigns/dynablocks-common/dist/helpers";

export const Edit = (props: BlockEditProps<Attributes>): JSX.Element => {
  const { className, attributes, setAttributes, isSelected } = props;
  const { backgroundImage, backgroundImageSize, margin } = attributes;

  const containerRef = useRef<HTMLDivElement>(null);

  const update = property => value => {
    setAttributes({ [property]: value });
  };

  const updateBackgroundImage = (value: Image) => {
    const image = value as Image;
    if (!image.sizes[backgroundImageSize]) {
      update("backgroundImageSize")(undefined);
    }
    update("backgroundImage")(image);
  };

  const updateColorPicker = property => value => {
    const { a, b, g, r } = value.rgb;
    const rgbaValue = `rgba(${r},${g},${b},${a})`;
    update(property)(rgbaValue);
  };

  const BackgroundSettings = (): JSX.Element => (
    <ImagePlaceholder
      {...{
        value: backgroundImage,
        labels: {
          title: __("Image Cover Block"),
          instructions: __(
            "Drag an image, upload a new one or select one from your library."
          )
        },
        icon,
        onSelect: value => {
          const image = value as Image;
          if (!image.sizes[backgroundImageSize]) {
            update("backgroundImageSize")(undefined);
          }
          update("backgroundImage")(image);
        }
      }}
    />
  );

  return (
    <div className="s4tw-dynablocks-image-block" ref={containerRef}>
      <ElementControls
        {...{
          ...attributes,
          editmode: true,
          setAttributes,
          update,
          updateColorPicker,
          updateBackgroundImage
        }}
      />
      {!backgroundImage ? (
        <BackgroundSettings />
      ) : (
        <div style={{ display: "flex" }}>
          {isSelected && (
            <Spacer
              {...{
                resizeRatio: 1,
                width: `${margin["left"]}px`,
                isSelected,
                update: value => {
                  setAttributes({
                    margin: { ...margin, left: extractSize(value) }
                  });
                },
                editMode: true,
                type: "right",
                style: { flexShrink: 0 }
              }}
            />
          )}
          <div
            className={classnames(
              `${className}`,
              css({
                padding: isSelected
                  ? undefined
                  : `${margin["top"]}px ${margin["right"]}px ${margin["bottom"]}px ${margin["left"]}px`
              })
            )}
            style={{ width: "100%" }}
          >
            {isSelected && (
              <Spacer
                {...{
                  resizeRatio: 1,
                  height: `${margin["top"]}px`,
                  isSelected,
                  update: value => {
                    setAttributes({
                      margin: { ...margin, top: extractSize(value) }
                    });
                  },
                  editMode: true,
                  type: "bottom"
                }}
              />
            )}
            <Divider
              {...{
                ...attributes,
                className,
                editMode: true
              }}
            />
            {isSelected && (
              <Spacer
                {...{
                  resizeRatio: 1,
                  height: `${margin["bottom"]}px`,
                  isSelected,
                  update: value => {
                    setAttributes({
                      margin: { ...margin, bottom: extractSize(value) }
                    });
                  },
                  editMode: true,
                  type: "bottom"
                }}
              />
            )}
          </div>
          {isSelected && (
            <Spacer
              {...{
                resizeRatio: 1,
                width: `${margin["right"]}px`,
                isSelected,
                update: value => {
                  setAttributes({
                    margin: { ...margin, right: extractSize(value) }
                  });
                },
                editMode: true,
                type: "left",
                style: { flexShrink: 0 }
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};
