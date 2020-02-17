import { Popover } from "@wordpress/components";
import { css } from "emotion";
import { useRef } from "@wordpress/element";

// import classnames from "classnames";
// import { transform } from "@babel/core";

export interface ResizeHandleProps {
  // height: number;
  left: number;
  top: number;
  // isSelected: boolean;
}

export const ResizeHandle = (props: ResizeHandleProps) => {
  const { left, top } = props;
  const ref = useRef<HTMLDivElement>(null);

  const positionLeft = ref.current
    ? ref.current.parentElement
      ? ref.current.parentElement.style.left
      : `${left}%`
    : `${left}%`;

  return (
    <div
      className="components-resizable-box__handle components-resizable-box__side-handle components-resizable-box__handle-left"
      style={{
        top: top + "%",
        display: "block",
        position: "absolute"
      }}
      ref={ref}
    >
      <Popover
        {...{
          className: css({
            ">.components-popover__content": {
              minWidth: "0 !important",
              padding: "0 10px",
              textAlign: "center"
            }
          })
        }}
      >
        {positionLeft}
      </Popover>
    </div>
  );
};
