import { InnerBlocks, RichText } from "@wordpress/block-editor";
import { Fragment } from "@wordpress/element";
import { css } from "emotion";
import { Attributes } from "../editor/attributes";
import { Responsive } from "../../../common/helpers";
import { EntryPoint as DynablocksButton } from "../../button/frontend";
import ResizableBox from "../../../common/Components/ResizableBox";

export interface ElementsProps extends Attributes {
  clientId?: string;
  isSelected?: boolean;
  editMode?: boolean;
  h2Responsive: Responsive;
  update?: (property: string) => (value: any) => void;
  style?: React.CSSProperties;
}

export default (props: ElementsProps): JSX.Element => {
  const {
    clientId,
    isSelected,
    update,
    style,
    innerBlocks,
    h2Responsive,
    h2Text,
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
    textAlign: "center",
    ...h2Responsive
  });

  return (
    <div
      style={{
        ...style
        // animationName: "show1",
        // animationDuration: "1s"
      }}
    >
      {editMode && update ? (
        <Fragment>
          <RichText
            {...{
              value: h2Text,
              onChange: update("h2Text"),
              tagName: "h2",
              style: h2Style,
              className: h2ClassName
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
                  "s4tw/dynablocks-button",
                  {
                    ...(innerBlocks["button-0"]
                      ? innerBlocks["button-0"].attributes
                      : undefined),
                    parentId: clientId,
                    relationship: "button-0"
                  }
                ]
              ],
              templateLock: "all"
            }}
          />
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
          <DynablocksButton {...innerBlocks["button-0"].attributes} />
        </Fragment>
      )}
    </div>
  );
};
