import { compose } from "@wordpress/compose";
import { withDispatch } from "@wordpress/data";
import { useState } from "@wordpress/element";
import { ResizableBox } from "@wordpress/components";
import classnames from "classnames";
import { css } from "emotion";
import { extractSizeAndUnits } from "../../../common/helpers";

export type ResizableDirection =
  | "top"
  | "right"
  | "bottom"
  | "left"
  | "topRight"
  | "bottomRight"
  | "bottomLeft"
  | "topLeft";

export type Size = { height: string; width: string };
export type DeltaSize = {
  direction: ResizableDirection;
  deltaHeight: number;
  deltaWidth: number;
};
export type Delta = {
  direction: string;
  delta: number;
};
export type UpdateProps = Size | DeltaSize | string | Delta;

export interface ResizableBoxProps {
  style?: React.CSSProperties;
  height?: string;
  width?: string;
  resizeRatio?: number;
  returnDelta?: boolean;
  isSelected: boolean;
  update: (value: UpdateProps) => void;
  enable?: {
    top?: boolean | undefined;
    right?: boolean | undefined;
    bottom?: boolean | undefined;
    left?: boolean | undefined;
    topRight?: boolean | undefined;
    bottomRight?: boolean | undefined;
    bottomLeft?: boolean | undefined;
    topLeft?: boolean | undefined;
  };
}

interface DispatchProps {
  toggleSelection: (isSelectionEnabled?: boolean | undefined) => void;
}

type Props = ResizableBoxProps & DispatchProps;

const Core = (props: Props) => {
  const {
    style,
    height,
    width,
    resizeRatio,
    returnDelta = false,
    isSelected = false,
    update,
    toggleSelection,
    enable
  } = props;

  const [isResizing, setIsResizing] = useState(false);

  return (
    <ResizableBox
      {...{
        style,
        minWidth: 0,
        minHeight: 0,
        className: classnames(
          {
            "is-selected": isSelected
          },
          css({
            marginBottom: 0,
            backgroundColor: isResizing ? "rgba(255, 255, 0, 0.5)" : undefined
          })
        ),
        size: { height, width },
        resizeRatio,
        enable,
        onResizeStop: (event, direction, elt, delta) => {
          setIsResizing(false);
          toggleSelection(true);
          if (height && width) {
            if (returnDelta) {
              update({
                direction,
                deltaHeight: delta.height,
                deltaWidth: delta.width
              });
            } else {
              const { size: hSize, units: hUnits } = extractSizeAndUnits(
                height
              );
              const boxHeight = Math.round(hSize + delta.height);
              const { size: wSize, units: wUnits } = extractSizeAndUnits(width);
              const boxWidth = Math.round(wSize + delta.width);
              update({
                height: `${boxHeight}${hUnits}`,
                width: `${boxWidth}${wUnits}`
              });
            }
          } else if (height) {
            if (returnDelta) {
              update({ direction, delta: delta.height });
            } else {
              const { size, units } = extractSizeAndUnits(height);
              const boxHeight = Math.round(size + delta.height);
              update(`${boxHeight}${units}`);
            }
          } else if (width) {
            if (returnDelta) {
              update({ direction, delta: delta.width });
            } else {
              const { size, units } = extractSizeAndUnits(width);
              const boxWidth = Math.round(size + delta.width);
              update(`${boxWidth}${units}`);
            }
          }
        },
        onResizeStart: () => {
          toggleSelection(false);
          setIsResizing(true);
        }
      }}
    />
  );
};

const Box: (props: ResizableBoxProps) => JSX.Element = compose(
  withDispatch(dispatch => {
    const { toggleSelection } = dispatch("core/block-editor");
    return { toggleSelection };
  })
)(Core);

export default Box;
