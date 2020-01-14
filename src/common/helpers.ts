import validator from "validator";

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

export const extractSizeAndUnits = (fontSize: string) => {
  if (!fontSize) return { size: 0, units: "" };
  const size = parseInt(validator.whitelist(fontSize, "0123456789"), 10);
  const units = validator.whitelist(fontSize, "cminpxtrexhvwa%");
  return {
    size,
    units
  };
};

export const scaleFontSize = (size: number, units: string, scalar: number) =>
  `${size * scalar}${units}`;

export type Responsive = { [x: string]: string | { [x: string]: string } };

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
