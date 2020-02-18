import { times, isEqual } from "lodash";
import { InnerBlocks } from "@wordpress/block-editor";
import { useRef, useState, useEffect } from "@wordpress/element";
import { withSize } from "react-sizeme";
import { css } from "emotion";
import classnames from "classnames";
import { Attributes } from "../editor/attributes";
import DraggableAdjuster from "./DraggableAdjuster";

export type DeviceTypes = "desktop" | "tablet" | "mobile";

export interface AccordionProps extends Attributes {
  numberOfItems: number;
  isDraggable: boolean;
  activeState: DeviceTypes;
  setActiveState: React.Dispatch<React.SetStateAction<DeviceTypes>>;
  setAttributes: (attrs: Partial<Attributes>) => void;
}

const generatePosition = (columns: number[]): { [x: number]: number } => {
  const position: { [x: number]: number } = {};
  columns.forEach((value, index) => {
    position[index] = index === 0 ? value : value + position[index - 1];
  });
  return position;
};

const generateWidth = (columns: number[]): { [x: number]: number } => {
  const width: { [x: number]: number } = {};
  columns.forEach((value, index) => {
    width[index] = value;
  });
  return width;
};

interface SizeMeOptions {
  readonly size: {
    readonly width: number | null;
    readonly height: number | null;
  };
}

export type Props = AccordionProps & SizeMeOptions;

export const Columns = (props: Props): JSX.Element => {
  const {
    columns,
    columnBreaks,
    gridGaps,
    editorOptions: { gridSize, gridShow, gridSnap },
    numberOfItems,
    isDraggable,
    activeState,
    setAttributes
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(generateWidth(columns[activeState]));
  const [position, setPosition] = useState(
    generatePosition(columns[activeState])
  );

  const gridTemplateColumns = columns[activeState].reduce(
    (columns, entry) =>
      columns +
      `calc(${entry}% - ${(1 - entry / 100) * gridGaps["column"]}px) `,
    ""
  );

  useEffect(() => {
    setWidth(generateWidth(columns[activeState]));
    setPosition(generatePosition(columns[activeState]));
  }, [activeState, columns]);

  const classNameStyles = {
    ">.block-editor-inner-blocks": {
      ">.block-editor-block-list__layout": {
        gridTemplateColumns,
        gridColumnGap: gridGaps["column"],
        gridRowGap: gridGaps["row"],
        ">.block-editor-block-list__block": {
          ".s4tw-dynablocks-columns-element": {
            outline: isDraggable
              ? "2px solid rgba(0, 115, 170, 0.5)"
              : undefined
          }
        }
      }
    }
  };

  return (
    <div
      style={{
        margin: 0,
        height: numberOfItems < 1 ? "62px" : undefined
      }}
      className={css(classNameStyles)}
    >
      <div
        className={classnames(
          "s4tw-alignment-grid",
          css({
            gridTemplateColumns: `repeat(${gridSize[activeState]}, 1fr)`,
            gridColumnGap: gridGaps["column"]
          })
        )}
        style={{
          zIndex: gridShow !== "front" ? 0 : undefined
        }}
      >
        {times(gridSize[activeState]).map(index => (
          <div
            className={classnames(
              "s4tw-alignment-grid-column",
              css({
                borderLeft: !isDraggable
                  ? "1px solid rgb(221, 221, 221)"
                  : undefined,
                borderRight: !isDraggable
                  ? "1px solid rgb(221, 221, 221)"
                  : undefined,
                outline: isDraggable
                  ? "1px solid rgb(221, 221, 221)"
                  : undefined
              })
            )}
            style={{
              display: gridShow === "hide" ? "none" : undefined,
              zIndex: gridShow === "front" ? 10000 : undefined
            }}
            key={index}
          />
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          height: "100%",
          width: `calc(100% + ${gridGaps["column"]}px)`,
          marginLeft: `-${gridGaps["column"] / 2.0}px`
        }}
        ref={containerRef}
      >
        {isDraggable && (
          <DraggableAdjuster
            {...{
              numberOfColumns: columnBreaks[activeState],
              position,
              setPosition,
              width,
              setWidth: newWidth => {
                setWidth(newWidth);
                const indicies = Object.keys(newWidth).map(value =>
                  parseInt(value)
                );
                indicies.sort();

                const updatedColumns = indicies.map(index => newWidth[index]);
                if (isEqual(columns[activeState], updatedColumns)) return;

                setAttributes({
                  columns: {
                    ...columns,
                    [activeState]: updatedColumns
                  }
                });
              },
              containerRef,
              gridX: gridSnap ? gridSize[activeState] : undefined,
              sticky: !gridSnap
            }}
          />
        )}
      </div>
      <InnerBlocks
        {...{ allowedBlocks: ["s4tw/dynablocks-columns-element"] }}
      />
    </div>
  );
};

export default withSize({
  monitorWidth: true,
  monitorHeight: true
})(Columns);
