import { InnerBlocks, RichText } from "@wordpress/block-editor";
import { Fragment } from "@wordpress/element";
import { IconButton } from "@wordpress/components";
import { createBlock } from "@wordpress/blocks";
import { dispatch } from "@wordpress/data";
import { css } from "emotion";
import { Attributes } from "../editor/attributes";
import { Responsive } from "@solutions4theweb/dynablocks-common/dist/helpers";
import { EntryPoint as DynablocksButtonGroup } from "../../button-group/frontend";
import ResizableBox from "@solutions4theweb/dynablocks-common/dist/Components/ResizableBox";

export interface ElementsProps extends Attributes {
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
    editMode = false,
    responsive = false
  } = props;

  const h2Style = {
    margin: "0 auto",
    color: h2Color,
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

  return (
    <div style={{ ...style }}>
      {editMode && update ? (
        <Fragment>
          <RichText
            {...{
              value: h2Text,
              onChange: update("h2Text"),
              tagName: "h2",
              style: h2Style,
              className: h2ClassName,
              placeholder: "Click to edit text"
            }}
          />
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
          {blockOrder.length < 1 && (
            <RenderAppender
              {...{ clientId, numberOfBlocks: blockOrder.length }}
            />
          )}
        </Fragment>
      ) : (
        <Fragment>
          <RichText.Content
            {...{
              value: h2Text,
              tagName: "h2",
              style: h2Style,
              className: h2ClassName
            }}
          />
          <DynablocksButtonGroup {...innerBlocks[blockOrder[0]].attributes} />
        </Fragment>
      )}
    </div>
  );
};
