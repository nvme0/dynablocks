import _ from "lodash";
import { select, dispatch } from "@wordpress/data";
import { BlockSaveProps, BlockInstance } from "@wordpress/blocks";

const syncBlockOrder = (
  editorId: string,
  savedBlockOrder: string[],
  savedBlocks: {
    [relationship: string]: BlockInstance<any>;
  }
) => {
  const editorBlockOrder = select("core/block-editor").getBlockOrder(editorId);
  const editorBlocks: typeof savedBlocks = {};
  select("core/block-editor")
    .getBlocksByClientId(editorBlockOrder)
    .forEach(block => {
      if (block) {
        editorBlocks[block.clientId] = block;
      }
    });

  // recursive depth-first synchronization of child blocks
  editorBlockOrder.forEach(clientId => {
    const attributes = select("core/block-editor").getBlockAttributes(clientId);
    if (attributes) {
      const { blockOrder, innerBlocks } = attributes;
      if (blockOrder && innerBlocks) {
        syncBlockOrder(clientId, blockOrder, innerBlocks);
      }
    }
  });

  const blockOrderHasChanged = !_.isEqual(savedBlockOrder, editorBlockOrder);
  const blockDataHasChanged = !_.isEqual(savedBlocks, editorBlocks);
  const hasChanged = blockOrderHasChanged || blockDataHasChanged;

  if (!hasChanged) return;

  const blockInstance = select("core/block-editor").getBlock(editorId);
  if (!blockInstance) return;

  dispatch("core/block-editor").updateBlockAttributes(editorId, {
    blockOrder: editorBlockOrder,
    innerBlocks: editorBlocks
  });
};

const Save = <
  Attributes extends {
    editorId: string;
    blockOrder: string[];
    innerBlocks: { [relationship: string]: BlockInstance<any> };
  }
>(
  props: BlockSaveProps<Attributes>
) => {
  const { attributes } = props;
  const { editorId, blockOrder, innerBlocks } = attributes;
  if (editorId) {
    syncBlockOrder(editorId, blockOrder, innerBlocks);
  }
  return null;
};

export default Save;
