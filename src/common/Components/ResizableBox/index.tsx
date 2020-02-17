import { compose } from "@wordpress/compose";
import { withDispatch } from "@wordpress/data";
import { useState } from "@wordpress/element";
import { ResizableBox } from "@wordpress/components";
import classnames from "classnames";
import { css } from "emotion";
import { extractSizeAndUnits } from "../../../common/helpers";

export interface ResizableBoxProps {
  style?: React.CSSProperties;
  height?: string;
  width?: string;
  resizeRatio?: number;
  isSelected: boolean;
  update: (value: any) => void;
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
            const { size: hSize, units: hUnits } = extractSizeAndUnits(height);
            const boxHeight = Math.round(hSize + delta.height);

            const { size: wSize, units: wUnits } = extractSizeAndUnits(width);
            const boxWidth = Math.round(wSize + delta.height);

            update({
              deltaHeight: `${boxHeight}${hUnits}`,
              deltaWidth: `${boxWidth}${wUnits}`
            });
          } else if (height) {
            const { size, units } = extractSizeAndUnits(height);
            const boxHeight = Math.round(size + delta.height);
            update(`${boxHeight}${units}`);
          } else if (width) {
            const { size, units } = extractSizeAndUnits(width);
            const boxWidth = Math.round(size + delta.height);
            update(`${boxWidth}${units}`);
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
