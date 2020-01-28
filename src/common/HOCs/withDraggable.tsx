import {
  useState,
  useEffect,
  useCallback,
  ComponentType,
  useRef
} from "@wordpress/element";
import { css } from "emotion";
import { withSize, SizeMeProps } from "react-sizeme";
import { cap } from "../../common/helpers";

type SupportedUnits = "%" | "px";

export interface PositionEntry {
  value: number;
  units: SupportedUnits;
}

export interface Limit {
  lower: number;
  upper: number;
}

export interface Limits {
  x: Limit;
  y: Limit;
}

interface Options {
  updateCallback: (
    position: { left: number; top: number },
    limits: Limits
  ) => void;
  position: { left: PositionEntry; top: PositionEntry };
  parentSize: {
    readonly width: number | null;
    readonly height: number | null;
  };
  transforms?: {
    translateX: { value: number; units: SupportedUnits };
    translateY: { value: number; units: SupportedUnits };
  };
  adjustmentFactor?: { x: number; y: number };
  lockX?: boolean;
  lockY?: boolean;
  style?: React.CSSProperties;
}

const deriveLimits = (
  units: SupportedUnits,
  transforms: { translate: { value: number; units: SupportedUnits } },
  size: number,
  parentSize: number
) => {
  let {
    // eslint-disable-next-line prefer-const
    translate: { value: translateValue, units: translateUnits }
  } = transforms;
  let lower = 0;
  let upper = 0;

  if (units === "%") {
    const percentOccupied = (size / parentSize) * 100;
    if (translateUnits === "px") {
      translateValue /= size;
    }
    translateValue *= 0.01;
    lower = -translateValue * percentOccupied;
    upper = 100 - (1 + translateValue) * percentOccupied;
  } else if (units === "px") {
    if (translateUnits === "%") {
      translateValue *= size;
    }
    lower = -translateValue;
    upper = parentSize - (size + translateValue);
  } else {
    // eslint-disable-next-line no-console
    console.warn("Units for deriveLimits must be '%' or 'px ");
  }
  return { lower: Math.round(lower), upper: Math.round(upper) };
};

interface State {
  isDragging: boolean;
  left: number;
  top: number;
  rel: { x: number; y: number };
  parentOffset: { x?: number; y?: number };
}

const withDraggable = <P extends {}>(
  options: Options,
  WrappedComponent: ComponentType<P>
) => (props: P & SizeMeProps): JSX.Element => {
  const { size } = props;
  const {
    updateCallback,
    position: positionEntry,
    parentSize: { width: xMax, height: yMax },
    transforms = {
      translateX: { value: 0, units: "px" as SupportedUnits },
      translateY: { value: 0, units: "px" as SupportedUnits }
    },
    lockX,
    lockY,
    style,
    adjustmentFactor = { x: 1.0, y: 1.0 }
  } = options;

  const containerRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<State>({
    isDragging: false,
    left: positionEntry["left"]["value"],
    top: positionEntry["top"]["value"],
    rel: { x: 0, y: 0 },
    parentOffset: {}
  });

  const limits: Limits = {
    x: deriveLimits(
      positionEntry["left"]["units"],
      { translate: transforms["translateX"] },
      size["width"] || 0,
      xMax || 0
    ),
    y: deriveLimits(
      positionEntry["top"]["units"],
      { translate: transforms["translateY"] },
      size["height"] || 0,
      yMax || 0
    )
  };

  const updatePosition = useCallback(
    (event: MouseEvent) => {
      const { isDragging, rel, parentOffset } = state;
      if (!isDragging) return;
      const {
        left: { units: unitsX },
        top: { units: unitsY }
      } = positionEntry;
      let { left, top } = state;

      if (!lockX) {
        if (!parentOffset.x) return;
        left = (event.pageX - rel.x - parentOffset.x) * adjustmentFactor.x;
        if (unitsX === "%" && xMax) {
          left = (left / xMax) * 100;
        }
        left = Math.round(left);
        left = cap(left, limits.x);
      }

      if (!lockY) {
        if (!parentOffset.y) return;
        top = (event.pageY - rel.y - parentOffset.y) * adjustmentFactor.y;
        if (unitsY === "%" && yMax) {
          top = (top / yMax) * 100;
        }
        top = Math.round(top);
        top = cap(top, limits.y);
      }

      setState(prevState => ({
        ...prevState,
        left,
        top
      }));
    },
    [
      adjustmentFactor.x,
      adjustmentFactor.y,
      limits.x,
      limits.y,
      lockX,
      lockY,
      positionEntry,
      state,
      xMax,
      yMax
    ]
  );

  const stopDragging = useCallback(() => {
    const { isDragging, left, top } = state;
    if (isDragging) {
      setState(prevState => ({
        ...prevState,
        isDragging: false
      }));
    }
    if (
      left !== positionEntry["left"]["value"] ||
      top !== positionEntry["top"]["value"]
    ) {
      updateCallback({ left, top }, limits);
    }
  }, [limits, positionEntry, state, updateCallback]);

  const startDragging = useCallback(
    (event: React.MouseEvent<Element, MouseEvent>) => {
      if (!containerRef.current) return;
      const { pageX, pageY } = event;
      const { current } = containerRef;
      const { offsetLeft, offsetTop } = current;
      const { scrollLeft, scrollTop, clientLeft, clientTop } = document.body;

      // get position of containerRef relative to page
      const { left, top } = current.getBoundingClientRect();
      const x = left + scrollLeft - clientLeft;
      const y = top + scrollTop - clientTop;

      // compute position of parent relative to page
      const parentOffsetX = x - offsetLeft;
      const parentOffsetY = y - offsetTop;

      // compute position of mouse relative to containerRef
      const relX = pageX - x;
      const relY = pageY - y;

      setState(prevState => ({
        ...prevState,
        parentOffset: { x: parentOffsetX, y: parentOffsetY },
        rel: { x: relX, y: relY },
        isDragging: true
      }));
    },
    []
  );

  // adding/cleaning up mouse event listeners
  useEffect(() => {
    const { addEventListener } = window;
    addEventListener("mousemove", updatePosition);
    addEventListener("mouseup", stopDragging);
    return () => {
      removeEventListener("mousemove", updatePosition);
      removeEventListener("mouseup", stopDragging);
    };
  }, [stopDragging, updatePosition]);

  return (
    <div
      ref={containerRef}
      onMouseUp={stopDragging}
      onMouseDown={startDragging}
      style={{
        ...style,
        left: `${state["left"]}${positionEntry["left"]["units"]}`,
        top: `${state["top"]}${positionEntry["top"]["units"]}`
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
