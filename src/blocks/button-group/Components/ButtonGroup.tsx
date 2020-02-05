import { InnerBlocks } from "@wordpress/block-editor";
import { Template } from "@wordpress/blocks";
import { css } from "emotion";
import { Attributes } from "../editor/attributes";
import { EntryPoint as DynablocksButton } from "../../button/frontend";

export interface ButtonGroupProps extends Attributes {
  clientId?: string;
  editMode?: boolean;
}

export default (props: ButtonGroupProps): JSX.Element => {
  const { innerBlocks, blockOrder, clientId, editMode, align } = props;

  const template: Array<Template> = blockOrder.map(entry => [
    "s4tw/dynablocks-button",
    {
      ...innerBlocks[entry].attributes,
      parentId: clientId,
      relationship: entry
    }
  ]);

  return editMode ? (
    <div
      className={css({
        display: "block",
        "> .block-editor-inner-blocks > .block-editor-block-list__layout": {
          display: "flex",
          flexWrap: "nowrap",
          "> div": {
            transition: "none !important",
            transform: "none !important",
            width: "100%"
          }
        }
      })}
    >
      <InnerBlocks
        {...{
          template,
          templateLock: "all"
        }}
      />
    </div>
  ) : (
    <div
      style={{ textAlign: align }}
      className={css({
        display: "flex"
      })}
    >
      {blockOrder.map(entry => (
        <DynablocksButton {...innerBlocks[entry].attributes} />
      ))}
    </div>
  );
};
