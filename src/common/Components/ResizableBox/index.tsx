import { compose } from "@wordpress/compose";
import { withDispatch } from "@wordpress/data";
import { useState } from "@wordpress/element";
import { ResizableBox } from "@wordpress/components";
import classnames from "classnames";
import { css } from "emotion";
import { extractSizeAndUnits } from "../../../common/helpers";

export interface ResizableBoxProps {
  height: string;
  resizeRatio: number;
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
    height,
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
        className: classnames(
          {
            "is-selected": isSelected
          },
          css({
            marginBottom: 0,
            backgroundColor: isResizing ? "rgba(255, 255, 0, 0.5)" : undefined
          })
        ),
        size: { height },
        resizeRatio,
        enable,
        onResizeStop: (event, direction, elt, delta) => {
          setIsResizing(false);
          toggleSelection(true);
          const { size, units } = extractSizeAndUnits(height);
          const spacerHeight = Math.round(size + delta.height);
          update(`${spacerHeight}${units}`);
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
