import {
  useState,
  useEffect,
  useCallback,
  ComponentType
} from "@wordpress/element";
import { css } from "emotion";
import { withSize, SizeMeProps } from "react-sizeme";
import { cap } from "../../common/helpers";

interface Options {
  updateCallback: (position: { left: number; top: number }) => void;
  position: { left: number; top: number };
  parentSize: {
    readonly width: number | null;
    readonly height: number | null;
  };
  lockX?: boolean;
  lockY?: boolean;
  style?: React.CSSProperties;
}

const getNewPosition = (
  x: number,
  dx: number,
  xMax: number,
  limits: { lower: number; upper: number }
) => {
  const { lower, upper } = limits;
  return cap(x + (dx / xMax) * 100, { lower, upper });
};

const withDraggable = <P extends {}>(
  options: Options,
  WrappedComponent: ComponentType<P>
) => (props: P & SizeMeProps): JSX.Element => {
  const { size } = props;
  const { style, updateCallback } = options;
  const containerRef = React.createRef<HTMLDivElement>();
  const [isDragging, setDragging] = useState(false);
  const [position, setPosition] = useState({
    left: options.position.left,
    top: options.position.top
  });

  const [limits, setLimits] = useState<{
    left: number;
    right: number;
    top: number;
    bottom: number;
  }>();

  const updatePosition = useCallback(
    (event: MouseEvent) => {
      if (!isDragging || !limits) return;
      const {
        parentSize: { width: parentWidth, height: parentHeight },
        lockX,
        lockY
      } = options;
      const { movementX, movementY } = event;

      if (!lockX && parentWidth) {
        const left = getNewPosition(position.left, movementX, parentWidth, {
          lower: limits.left,
          upper: limits.right
        });
        setPosition({ ...position, left });
      }

      if (!lockY && parentHeight) {
        const top = getNewPosition(position.top, movementY, parentHeight, {
          lower: limits.top,
          upper: limits.bottom
        });
        setPosition({ ...position, top });
      }
    },
    [isDragging, limits, position]
  );

  const startDragging = useCallback(() => setDragging(true), []);
  const stopDragging = useCallback(() => {
    setDragging(false);
    updateCallback({ ...position });
  }, [position, updateCallback]);

  useEffect(() => {
    const { addEventListener } = document;
    addEventListener("mousemove", updatePosition);
    addEventListener("mouseup", stopDragging);
    return () => {
      removeEventListener("mousemove", updatePosition);
      removeEventListener("mouseup", stopDragging);
    };
  }, [updatePosition, stopDragging]);

  useEffect(() => {
    const { parentSize } = options;
    if (size && parentSize) {
      const { width, height } = size;
      const { width: parentWidth, height: parentHeight } = parentSize;
      const halfWidth = parentWidth && width ? (width * 50) / parentWidth : 0;
      const halfHeight =
        parentHeight && height ? (height * 50) / parentHeight : 0;
      setLimits({
        left: 0 + halfWidth,
        right: 100 - halfWidth,
        top: 0 + halfHeight,
        bottom: 100 - halfHeight
      });
    }
  }, [size]);

  return (
    <div
      ref={containerRef}
      onMouseUp={stopDragging}
      onMouseDown={startDragging}
      style={{
        ...style,
        position: "relative",
        top: `${position.top}%`,
        left: `${position.left}%`
      }}
      className={css({
        cursor: "grab",
        "&:active": {
          cursor: "grabbing"
        }
      })}
    >
      <WrappedComponent {...props} />
    </div>
  );
};

export default (options: Options) => <P extends {}>(
  WrappedComponent: ComponentType<P>
) =>
  withSize({
    monitorWidth: !options.lockX,
    monitorHeight: !options.lockY
  })(withDraggable(options, WrappedComponent));
