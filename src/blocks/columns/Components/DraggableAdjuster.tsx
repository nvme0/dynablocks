import { ResizeHandle } from "./ResizeHandle";
import withDraggable from "@solutions4theweb/dynablocks-common/dist/HOCs/withDraggable";
import { Fragment } from "@wordpress/element";

export interface Props {
  numberOfColumns: number;
  position: { [x: number]: number };
  setPosition: (position: { [x: number]: number }) => void;
  width: { [x: number]: number };
  setWidth: (width: { [x: number]: number }) => void;
  containerRef: React.RefObject<HTMLDivElement>;
  gridX?: number;
  sticky?: boolean;
}

const DraggableAdjuster = (props: Props): JSX.Element => {
  const {
    numberOfColumns,
    position,
    setPosition,
    width,
    setWidth,
    containerRef,
    gridX = 100,
    sticky = true
  } = props;

  const indicies: number[] = [];
  for (let i = 0; i < numberOfColumns - 1; i++) indicies[i] = i;

  return (
    <Fragment>
      {indicies.map(index => {
        const DraggableResizeHandle = withDraggable({
          updateCallback: newPosition => {
            const newWidth =
              index === 0
                ? newPosition.left
                : newPosition.left - position[index - 1];
            const dw = width[index] - newWidth;
            setPosition({ ...position, [index]: newPosition.left });
            setWidth({
              ...width,
              [index]: newWidth,
              [index + 1]: width[index + 1] + dw
            });
          },
          position: {
            top: { value: 0, units: "px" },
            left: {
              value: position[index],
              units: "%"
            }
          },
          parentSize: {
            width: containerRef.current
              ? containerRef.current.clientWidth
              : null,
            height: containerRef.current
              ? containerRef.current.clientHeight
              : null
          },
          lockX: false,
          lockY: true,
          style: { position: "absolute", height: "100%" },
          grid: { gridX: gridX, gridY: 0 },
          sticky
        })(ResizeHandle);
        return (
          <DraggableResizeHandle
            {...{
              left: position[index],
              top: 0
            }}
          />
        );
      })}
    </Fragment>
  );
};

export default DraggableAdjuster;
