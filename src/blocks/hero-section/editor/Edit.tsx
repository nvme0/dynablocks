import { BlockEditProps } from "@wordpress/blocks";
import { BlockControls, AlignmentToolbar } from "@wordpress/block-editor";
import { useState, useEffect } from "@wordpress/element";
import { Toolbar, ToolbarButton } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import Hero from "../Components/Hero";
import ElementControls, { ControlProps } from "./ElementControls";
import { Attributes } from "./attributes";
import { icon } from "./settings";
import { ImagePlaceholder } from "../../../common/Components/Controls";
import { Image } from "../../../common/Components/Controls/ImagePlaceholder";

export interface EditProps extends BlockEditProps<Attributes> {
  clientId?: string;
}

export const Edit = (props: EditProps) => {
  const { attributes, setAttributes, isSelected, clientId } = props;
  const {
    editorId,
    keywords,
    keywordsInterval,
    backgroundImage,
    backgroundImageSize,
    h2TextAlignment
  } = attributes;

  if (clientId !== editorId) {
    setTimeout(() => setAttributes({ editorId: clientId }), 1000);
  }

  const keywordsArray = keywords.split(" ");
  const [index, setIndex] = useState(0);
  const [cycleKeywords, setCycleKeywords] = useState(false);
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
        value: backgroundImage,
        labels: {
          title: __("Hero Section"),
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

  const controlProps: ControlProps = {
    state: {
      index,
      cycleKeywords
    },
    actions: {
      setIndex,
      setCycleKeywords
    },
    keywordsArray,
    update,
    updateColorPicker
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (timer && !cycleKeywords) {
      clearInterval(timer);
      timer = undefined;
    }

    if (!timer && cycleKeywords) {
      timer = setInterval(() => {
        setIndex(index => (index + 1) % keywordsArray.length);
      }, keywordsInterval);
    }

    if (timer && cycleKeywords) {
      clearInterval(timer);
      timer = setInterval(() => {
        setIndex(index => (index + 1) % keywordsArray.length);
      }, keywordsInterval);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [cycleKeywords, keywordsArray.length, keywordsInterval]);

  return (
    <div className="s4tw-dynablocks-hero-section">
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
          ...controlProps,
          ...attributes
        }}
      />
      <Hero
        {...{
          isSelected,
          update,
          setAttributes,
          isDraggable,
          editMode: true,
          BackgroundSettings:
            !backgroundImage || isSelected ? BackgroundSettings : undefined,
          controlProps,
          ...attributes
        }}
      />
    </div>
  );
};
