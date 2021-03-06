import { InnerBlocks, RichText } from "@wordpress/block-editor";
import { IconButton } from "@wordpress/components";
import { createBlock } from "@wordpress/blocks";
import { dispatch } from "@wordpress/data";
import { css } from "emotion";
import { ControlProps } from "../editor/ElementControls";
import { Attributes } from "../editor/attributes";
import { Responsive } from "@inspirewebdesigns/dynablocks-common/dist/helpers";
import { EntryPoint as DynablocksButtonGroup } from "../../button-group/frontend";
import ResizableBox from "@inspirewebdesigns/dynablocks-common/dist/Components/ResizableBox";
import * as CycleText from "../Components/CycleText";

export interface ElementsProps extends Attributes {
  controlProps?: ControlProps;
  clientId?: string;
  isSelected?: boolean;
  editMode?: boolean;
  h2Responsive: Responsive;
  update?: (property: string) => (value: any) => void;
  style?: React.CSSProperties;
}

const RenderAppender = (props: {
  clientId?: string;
  numberOfBlocks: number;
}): JSX.Element => {
  const { clientId, numberOfBlocks } = props;
  return (
    <div>
      <IconButton
        {...{
          icon: "insert",
          className:
            "components-button block-list-appender__toggle block-editor-button-block-appender",
          onClick: () => {
            if (!clientId) return;
            const innerBlock = createBlock("s4tw/dynablocks-button-group");
            dispatch("core/block-editor").insertBlock(
              innerBlock,
              numberOfBlocks,
              clientId,
              false
            );
          }
        }}
      />
    </div>
  );
};

const Heading = ({
  headingType,
  h2ClassName,
  h2Style,
  children
}: ElementsProps & {
  h2ClassName: any;
  h2Style: any;
  children?: React.ReactNode;
}) => {
  switch (headingType) {
    case "h1":
      return (
        <h1 className={h2ClassName} style={h2Style}>
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2 className={h2ClassName} style={h2Style}>
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3 className={h2ClassName} style={h2Style}>
          {children}
        </h3>
      );
    case "h4":
      return (
        <h4 className={h2ClassName} style={h2Style}>
          {children}
        </h4>
      );
    case "h5":
      return (
        <h5 className={h2ClassName} style={h2Style}>
          {children}
        </h5>
      );
    case "h6":
      return (
        <h6 className={h2ClassName} style={h2Style}>
          {children}
        </h6>
      );
  }
};

export default (props: ElementsProps): JSX.Element => {
  const {
    clientId,
    innerBlocks,
    blockOrder,
    isSelected,
    update,
    style,
    h2Responsive,
    h2Text,
    h2TextAlignment,
    h2FontSize,
    h2MarginBottom,
    h2Color,
    hasButton,
    editMode = false,
    responsive = false,
    controlProps,
    keywords,
    keywordsColor,
    keywordsInterval
  } = props;

  const h2Style = {
    fontSize: !responsive || editMode ? h2FontSize : undefined,
    marginBottom: editMode
      ? update
        ? 0
        : h2MarginBottom
      : !responsive
      ? h2MarginBottom
      : undefined
  };

  const h2ClassName = css({
    textAlign: h2TextAlignment,
    ...h2Responsive
  });

  let CycleTextElement: () => JSX.Element;
  if (controlProps) {
    const {
      keywordsArray,
      state: { index }
    } = controlProps;
    CycleTextElement = () => (
      <CycleText.Editor
        {...{
          style: { color: keywordsColor },
          keyword: keywordsArray[index]
        }}
      />
    );
  } else {
    const keywordsArray = keywords.split(" ");
    CycleTextElement = () => (
      <CycleText.Content
        {...{
          style: { color: keywordsColor },
          interval: keywordsInterval,
          keywordsArray
        }}
      />
    );
  }

  return (
    <div style={{ ...style }}>
      {editMode && update ? (
        <>
          <Heading {...{ ...props, h2ClassName, h2Style }}>
            <RichText
              {...{
                value: h2Text,
                onChange: update("h2Text"),
                tagName: "span",
                placeholder: "Click to edit text",
                className: "static-wrapper",
                style: { color: h2Color }
              }}
            />{" "}
            <CycleTextElement />
          </Heading>
          <ResizableBox
            {...{
              height: h2MarginBottom,
              update: update("h2MarginBottom"),
              isSelected: isSelected ? true : false,
              resizeRatio: 2,
              enable: {
                top: false,
                right: false,
                bottom: true,
                left: false,
                topRight: false,
                bottomRight: false,
                bottomLeft: false,
                topLeft: false
              }
            }}
          />
          {hasButton && (
            <InnerBlocks
              {...{
                template: [
                  [
                    "s4tw/dynablocks-button-group",
                    {
                      ...(innerBlocks[blockOrder[0]]
                        ? innerBlocks[blockOrder[0]].attributes
                        : undefined)
                    }
                  ]
                ],
                allowedBlocks: ["s4tw/dynablocks-button-group"]
              }}
            />
          )}
          {blockOrder.length < 1 && hasButton && (
            <RenderAppender
              {...{ clientId, numberOfBlocks: blockOrder.length }}
            />
          )}
        </>
      ) : (
        <>
          <Heading {...{ ...props, h2ClassName, h2Style }}>
            <RichText.Content
              {...{
                value: h2Text,
                tagName: "span",
                className: "static-wrapper",
                style: { color: h2Color }
              }}
            />{" "}
            <CycleTextElement />
          </Heading>
          {hasButton && (
            <DynablocksButtonGroup {...innerBlocks[blockOrder[0]].attributes} />
          )}
        </>
      )}
    </div>
  );
};
