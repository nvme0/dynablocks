import { InnerBlocks, RichText } from "@wordpress/block-editor";
import { Fragment } from "@wordpress/element";
import { css } from "emotion";
import { Attributes } from "../editor/attributes";
import { Responsive } from "../../../common/helpers";
import { EntryPoint as DynablocksButton } from "../../button/frontend";
import { EntryPoint as DynablocksSpacer } from "../../spacer/frontend";

export interface ElementsProps extends Attributes {
  clientId?: string;
  editMode?: boolean;
  h2Responsive: Responsive;
  update?: (property: string) => (value: any) => void;
}

export default (props: ElementsProps): JSX.Element => {
  const {
    clientId,
    update,
    innerBlocks,
    height,
    h2Responsive,
    h2Text,
    h2FontSize,
    h2Color,
    editMode = false,
    responsive = false
  } = props;

  const h2Style = {
    margin: "0 auto",
    color: h2Color,
    fontSize: !responsive || editMode ? h2FontSize : undefined
  };

  const h2ClassName = css({
    textAlign: "center",
    ...h2Responsive
  });

  return (
    <div
      className="content"
      style={{
        height,
        width: "100%",
        position: "absolute",
        fontFamily: "'Varela Round', sans-serif, Arial, Helvetica"
      }}
    >
      <div
        style={{
          display: "inline-block",
          position: "relative",
          transform: "translate(-50%, -50%)",
          top: "50%",
          left: "50%",
          animationName: "show1",
          animationDuration: "1s"
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
            <InnerBlocks
              {...{
                template: [
                  [
                    "s4tw/dynablocks-spacer",
                    {
                      ...(innerBlocks["spacer-0"]
                        ? innerBlocks["spacer-0"].attributes
                        : undefined),
                      parentId: clientId,
                      relationship: "spacer-0",
                      resizeRatio: 2
                    }
                  ],
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
            <DynablocksSpacer {...innerBlocks["spacer-0"].attributes} />
            <DynablocksButton {...innerBlocks["button-0"].attributes} />
          </Fragment>
        )}
      </div>
    </div>
  );
};
