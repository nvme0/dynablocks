import { dispatch, select } from "@wordpress/data";
import {
  BlockEditProps,
  BlockInstance,
  createBlock,
  TemplateArray
} from "@wordpress/blocks";
import validator from "validator";
import uuid from "uuid/v4";

/* frontend */

export const getBlocksOfType = (blockName: string) => {
  const blocksOfType = document.querySelectorAll(blockName);
  const blocks: { block: Element; props: string }[] = [];
  blocksOfType.forEach(block => {
    const propsContainer = block.querySelector(".props");
    if (propsContainer) {
      let props = propsContainer.innerHTML;
      props = props.replace(new RegExp("”", "g"), '"');
      props = props.replace(new RegExp("“", "g"), '"');
      props = props.replace(new RegExp("″", "g"), '"'); // prime?
      props = props.replace(new RegExp("×", "g"), "x");
      blocks.push({ block, props });
    }
  });
  return blocks;
};

/* settings */

export const removeAttributes = (settings: any): any =>
  // the purpose of this function is to get around discrepancies with "@types/wordpress_blocks/index.d.ts"
  // where attributes should be optional
  Object.keys(settings).reduce((object, key) => {
    if (key !== "attributes") {
      object[key] = settings[key];
    }
    return object;
  }, {});

// TODO - remove this function
export const syncBlockWithParent = (
  setAttributes: (attrs: any) => void,
  clientId?: string,
  parentId?: string,
  relationship?: string
) => {
  if (!clientId || !parentId || !relationship) return;

  const rootClientId = select("core/block-editor").getBlockRootClientId(
    clientId
  );

  if (rootClientId !== parentId) {
    setAttributes({ parentId: rootClientId });
  }

  if (!rootClientId) return;

  const parentAttributes = select("core/block-editor").getBlockAttributes(
    rootClientId
  );
  if (!parentAttributes) return;
  const { innerBlocks } = parentAttributes;
  if (!innerBlocks) return;

  const blockInstance = select("core/block-editor").getBlock(clientId);
  dispatch("core/block-editor").updateBlockAttributes(rootClientId, {
    innerBlocks: {
      ...innerBlocks,
      [relationship]: blockInstance
    }
  });
};

export const generateBlockTemplate = <
  T extends {
    blockOrder: string[];
    innerBlocks: {
      [x: string]: BlockInstance<any>;
    };
  }
>(
  blockOrder: T["blockOrder"],
  innerBlocks: T["innerBlocks"]
): TemplateArray => {
  return blockOrder.map(entry => {
    const name = innerBlocks[entry].name;
    const attributes = innerBlocks[entry].attributes;

    const nestedBlocks = attributes.innerBlocks;
    if (nestedBlocks) {
      const nestedBlockOrder = attributes.blockOrder;
      return [
        name,
        attributes,
        generateBlockTemplate(nestedBlockOrder, nestedBlocks)
      ];
    }
    return [name, attributes];
  });
};

export interface UpdateFunctionProps
  extends BlockEditProps<Partial<{ parentId: string; relationship: string }>> {
  clientId?: string;
}

// TODO - remove this function & UpdateFunctionProps Interface
export const createUpdateFunction = (props: UpdateFunctionProps) => {
  const { clientId, attributes, setAttributes } = props;
  const { parentId, relationship } = attributes;
  let syncWithParent;

  if (parentId && relationship && clientId) {
    const parentAttributes = select("core/block-editor").getBlockAttributes(
      parentId
    );

    if (parentAttributes) {
      const { innerBlocks } = parentAttributes;
      if (innerBlocks) {
        syncWithParent = () => {
          const blockInstance = select("core/block-editor").getBlock(clientId);
          dispatch("core/block-editor").updateBlockAttributes(parentId, {
            innerBlocks: {
              ...innerBlocks,
              [relationship]: blockInstance
            }
          });
        };
        // sync attributes with parent
        syncWithParent();
      }
    }
  }

  if (!syncWithParent) {
    return property => value => {
      setAttributes({ [property]: value });
    };
  }

  return property => value => {
    syncWithParent();
    setAttributes({ [property]: value });
  };
};

/* color */

export const rgbaStringToObject = (rgba: string) => {
  const rgbaObj = rgba.replace(/[^\d,.]/g, "").split(",");
  return rgbaObj.length === 4 ? rgbaObj : [...rgbaObj, "1"];
};

export const darkenColor = (rgba: string) => {
  const rgbaObj = rgbaStringToObject(rgba);
  const darkerRgba = [
    Math.round(parseInt(rgbaObj[0]) * 0.85),
    Math.round(parseInt(rgbaObj[1]) * 0.85),
    Math.round(parseInt(rgbaObj[2]) * 0.85),
    rgbaObj[3]
  ];
  return `rgba(${darkerRgba[0]},${darkerRgba[1]},${darkerRgba[2]},${darkerRgba[3]})`;
};

export const lightenColor = (rgba: string) => {
  const rgbaObj = rgbaStringToObject(rgba);
  const darkerRgba = [
    Math.round(parseInt(rgbaObj[0]) * 1.17),
    Math.round(parseInt(rgbaObj[1]) * 1.17),
    Math.round(parseInt(rgbaObj[2]) * 1.17),
    rgbaObj[3]
  ];
  return `rgba(${darkerRgba[0]},${darkerRgba[1]},${darkerRgba[2]},${darkerRgba[3]})`;
};

export const changeColorAlpha = (rgba: string, alpha: number) => {
  const rgbaObj = rgbaStringToObject(rgba);
  const newRgba = [
    parseInt(rgbaObj[0]),
    parseInt(rgbaObj[1]),
    parseInt(rgbaObj[2]),
    alpha
  ];
  return `rgba(${newRgba[0]},${newRgba[1]},${newRgba[2]},${newRgba[3]})`;
};

/* size */

export const cap = (value: number, limit: { lower: number; upper: number }) => {
  const { lower, upper } = limit;
  if (value < lower) return lower;
  if (value > upper) return upper;
  return value;
};

export const extractSizeAndUnits = (fontSize: string) => {
  if (!fontSize) return { size: 0, units: "" };
  const size = parseInt(validator.whitelist(fontSize, "0123456789."), 10);
  const units = validator.whitelist(fontSize, "cminpxtrexhvwa%");
  return {
    size,
    units
  };
};

export const scaleFontSize = (size: number, units: string, scalar: number) =>
  `${size * scalar}${units}`;

export type Responsive = Record<string, any>;

export type ResponsiveParameter =
  | {
      name: string;
      scale: number;
      breakpoint?: undefined;
    }
  | {
      name: string;
      breakpoint: string;
      scale: number;
    }
  | {
      name: string;
      breakpoint: string;
      scale?: undefined;
    };

const formatResponsiveParameter = (
  responsiveObject: Responsive,
  sizeParameters: {
    name: string;
    size: number;
    units: string;
  },
  responsiveParameter: ResponsiveParameter
) => {
  const { name, size, units } = sizeParameters;
  const breakpoint = responsiveParameter["breakpoint"];
  const scale = responsiveParameter["scale"];

  const type =
    !breakpoint && scale
      ? "minimum"
      : !scale && breakpoint
      ? "maximum"
      : "middle";

  switch (type) {
    case "minimum":
      if (!scale) break;
      return { [name]: scaleFontSize(size, units, scale) };
    case "middle":
      if (!scale || !breakpoint) break;
      if (!responsiveObject[breakpoint]) responsiveObject[breakpoint] = {};
      return {
        [breakpoint]: Object.assign(responsiveObject[breakpoint], {
          [name]: scaleFontSize(size, units, scale)
        })
      };
    case "maximum":
      if (!breakpoint) break;
      if (!responsiveObject[breakpoint]) responsiveObject[breakpoint] = {};
      return {
        [breakpoint]: Object.assign(responsiveObject[breakpoint], {
          [name]: `${size}${units}`
        })
      };
  }

  throw Error("formatResponsiveParameter: responsiveParameter is invalid");
};

export const generateResponsiveSize = (
  responsiveObject: Responsive,
  baseSizeParameter: {
    name: string;
    size: string;
  },
  responsiveParameters: ResponsiveParameter[]
): Responsive => {
  const { size, units } = extractSizeAndUnits(baseSizeParameter.size);
  responsiveParameters.forEach(responsiveParameter => {
    responsiveObject = Object.assign(
      responsiveObject,
      formatResponsiveParameter(
        responsiveObject,
        {
          name: baseSizeParameter.name,
          size,
          units
        },
        responsiveParameter
      )
    );
  });
  return responsiveObject;
};

export const generateResponsiveCSS = (
  baseSizeParameters: { name: string; size: string }[],
  responsiveParameters: ResponsiveParameter[]
) => {
  let responsive: Responsive = {};
  baseSizeParameters.forEach(baseSizeParameter => {
    responsive = generateResponsiveSize(
      responsive,
      baseSizeParameter,
      responsiveParameters
    );
  });
  return responsive;
};

/* InnerBlocks Actions -- TODO - remove these */

export const addInnerBlock = <
  Attributes extends {
    blockOrder: string[];
    innerBlocks: { [x: string]: BlockInstance<any> };
  }
>(params: {
  blockName: string;
  clientId: string;
  attributes: Attributes;
  setAttributes: (
    attrs: Partial<{
      blockOrder: string[];
      innerBlocks: { [x: string]: BlockInstance<any> };
    }>
  ) => void;
}) => {
  const { blockName, clientId, attributes, setAttributes } = params;
  const { blockOrder, innerBlocks } = attributes;
  const innerBlocksKeys = Object.keys(innerBlocks);

  const uniqueId = uuid();
  const innerBlock = createBlock(blockName, {
    parentId: clientId,
    relationship: uniqueId
  });

  const newBlockOrder: Attributes["blockOrder"] = [];
  blockOrder.forEach(entry => {
    newBlockOrder.push(entry);
  });
  newBlockOrder.push(uniqueId);

  const innerBlocksArray: Array<BlockInstance<Attributes>> = [];
  innerBlocksKeys.forEach(key => {
    innerBlocksArray.push(innerBlock[key]);
  });
  innerBlocksArray.push(innerBlock as BlockInstance<any>);

  const { getBlockOrder } = select("core/block-editor");
  const insertIndex = getBlockOrder(clientId).length;
  dispatch("core/block-editor").insertBlock(
    innerBlock,
    insertIndex,
    clientId,
    false
  );

  setAttributes({
    blockOrder: newBlockOrder,
    innerBlocks: {
      ...innerBlocks,
      [uniqueId]: innerBlock
    }
  });
};

export const deleteInnerBlock = <
  Attributes extends {
    blockOrder: string[];
    innerBlocks: { [x: string]: BlockInstance<any> };
  }
>(params: {
  index: number;
  innerBlocksKeys: string[];
  attributes: Attributes;
  setAttributes: (
    attrs: Partial<{
      blockOrder: string[];
      innerBlocks: { [x: string]: BlockInstance<any> };
    }>
  ) => void;
}) => {
  const { index, innerBlocksKeys, attributes, setAttributes } = params;
  const { blockOrder, innerBlocks } = attributes;

  const deleteKey = blockOrder[index];
  const updatedInnerBlocks: Attributes["innerBlocks"] = innerBlocksKeys
    .filter(key => key !== deleteKey)
    .reduce((result, current) => {
      result[current] = innerBlocks[current];
      return result;
    }, {});

  const newBlockOrder: string[] = blockOrder.filter(
    entry => entry !== deleteKey
  );

  dispatch("core/block-editor").removeBlock(innerBlocks[deleteKey].clientId);
  setAttributes({
    blockOrder: newBlockOrder,
    innerBlocks: updatedInnerBlocks
  });
};

export const moveInnerBlock = <
  Attributes extends {
    blockOrder: string[];
    innerBlocks: { [x: string]: BlockInstance<any> };
  }
>(params: {
  currentIndex: number;
  newIndex: number;
  clientId: string;
  attributes: Attributes;
  setAttributes: (
    attrs: Partial<{
      blockOrder: string[];
      innerBlocks: { [x: string]: BlockInstance<any> };
    }>
  ) => void;
}) => {
  const {
    currentIndex,
    newIndex,
    clientId,
    attributes,
    setAttributes
  } = params;
  const { blockOrder, innerBlocks } = attributes;

  const newBlockOrder: string[] = blockOrder.filter(_entry => true);
  newBlockOrder.splice(newIndex, 0, newBlockOrder.splice(currentIndex, 1)[0]);

  const innerBlocksArray: BlockInstance<{ [k: string]: any }>[] = [];
  newBlockOrder.forEach(entry => {
    innerBlocksArray.push(innerBlocks[entry]);
  });
  dispatch("core/block-editor").replaceInnerBlocks(
    clientId,
    innerBlocksArray,
    false
  );

  setAttributes({ blockOrder: newBlockOrder });
};
