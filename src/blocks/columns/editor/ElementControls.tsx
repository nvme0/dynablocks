import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, ToggleControl, SelectControl } from "@wordpress/components";
import { Attributes } from "./attributes";
import {
  TextControl,
  ResponsiveControls,
  AlignmentButtons
} from "@solutions4theweb/dynablocks-common/dist/Components/Controls";
import { DeviceTypes } from "../Components/Columns";
import { sanitizeIntegerInput } from "@solutions4theweb/dynablocks-common/dist/helpers";
import { __ } from "@wordpress/i18n";

export interface ControlProps extends Attributes {
  numberOfItems: number;
  update: (property: any) => (value: any) => void;
  setAttributes: (attrs: Partial<Attributes>) => void;
  activeState: DeviceTypes;
  setActiveState: React.Dispatch<React.SetStateAction<DeviceTypes>>;
}

const updateColumnBreaks = (
  device: DeviceTypes,
  limits: { min: number; max: number },
  setAttributes: (attrs: Partial<Attributes>) => void,
  columnBreaks: Attributes["columnBreaks"],
  columns: Attributes["columns"]
) => (value: string) => {
  if (value === "") return;
  const sanitizedValue = sanitizeIntegerInput(value, limits);

  const updatedColumns: number[] = [];
  for (let i = 0; i < sanitizedValue; i++) {
    updatedColumns[i] = 100 / sanitizedValue;
  }

  setAttributes({
    columnBreaks: {
      ...columnBreaks,
      [device]: sanitizedValue
    },
    columns: {
      ...columns,
      [device]: updatedColumns
    }
  });
};

const updateEditorGridSize = (
  device: DeviceTypes,
  editorOptions: Attributes["editorOptions"],
  setAttributes: (attrs: Partial<Attributes>) => void
) => (value: string) => {
  if (value === "") return;
  const { gridSize } = editorOptions;
  setAttributes({
    editorOptions: {
      ...editorOptions,
      gridSize: {
        ...gridSize,
        [device]: sanitizeIntegerInput(value)
      }
    }
  });
};

const updateEditorOption = <T extends any>(
  option: string,
  editorOptions: Attributes["editorOptions"],
  setAttributes: (attrs: Partial<Attributes>) => void
) => (value: T) => {
  setAttributes({
    editorOptions: {
      ...editorOptions,
      [option]: value
    }
  });
};

export default (props: ControlProps): JSX.Element => {
  const {
    columnBreaks,
    columns,
    gridGaps,
    editorOptions,
    editorOptions: { gridSize, gridSnap, gridShow },
    responsive,
    numberOfItems,
    setAttributes,
    activeState,
    setActiveState
  } = props;

  return (
    <InspectorControls>
      <PanelBody {...{ title: "Grid Settings", initialOpen: true }}>
        <ToggleControl
          {...{
            label: __("Snap to Grid"),
            checked: gridSnap,
            onChange: updateEditorOption(
              "gridSnap",
              editorOptions,
              setAttributes
            )
          }}
        />
        <SelectControl
          {...{
            label: __("Show Grid"),
            value: gridShow,
            options: [
              { label: "front", value: "front" },
              { label: "back", value: "back" },
              { label: "hide", value: "hide" }
            ],
            onChange: updateEditorOption(
              "gridShow",
              editorOptions,
              setAttributes
            )
          }}
        />
        <p>Number of Columns</p>
        <TextControl
          {...{
            name: __("Desktop:"),
            value: gridSize["desktop"],
            update: updateEditorGridSize(
              "desktop",
              editorOptions,
              setAttributes
            ),
            secondary: true,
            type: "number"
          }}
        />
        <TextControl
          {...{
            name: __("Tablet:"),
            value: gridSize["tablet"],
            update: updateEditorGridSize(
              "tablet",
              editorOptions,
              setAttributes
            ),
            secondary: true,
            type: "number"
          }}
        />
        <TextControl
          {...{
            name: __("Mobile:"),
            value: gridSize["mobile"],
            update: updateEditorGridSize(
              "mobile",
              editorOptions,
              setAttributes
            ),
            secondary: true,
            type: "number"
          }}
        />
      </PanelBody>
      <ResponsiveControls
        {...{
          ...props,
          initialOpen: !responsive
        }}
      />
      {responsive && (
        <PanelBody {...{ title: __("Column Breaks"), initialOpen: false }}>
          <p>Device Layout</p>
          <AlignmentButtons
            {...{
              lowerLimit: { label: "Desktop", value: "desktop" },
              centerPosition: { label: "Tablet", value: "tablet" },
              upperLimit: { label: "Mobile", value: "mobile" },
              update: setActiveState,
              isActive: activeState
            }}
          />
          <p style={{ margin: "16px 0 16px 0" }}>Number of Columns</p>
          <p>
            <em>
              Changing the number of columns causes all column widths to be
              equal for the affected device.
            </em>
          </p>
          <TextControl
            {...{
              name: __("Desktop:"),
              value: columnBreaks["desktop"],
              update: updateColumnBreaks(
                "desktop",
                { min: 1, max: numberOfItems },
                setAttributes,
                columnBreaks,
                columns
              ),
              secondary: true,
              type: "number"
            }}
          />
          <TextControl
            {...{
              name: __("Tablet:"),
              value: columnBreaks["tablet"],
              update: updateColumnBreaks(
                "tablet",
                { min: 1, max: numberOfItems },
                setAttributes,
                columnBreaks,
                columns
              ),
              secondary: true,
              type: "number"
            }}
          />
          <TextControl
            {...{
              name: __("Mobile:"),
              value: columnBreaks["mobile"],
              update: updateColumnBreaks(
                "mobile",
                { min: 1, max: numberOfItems },
                setAttributes,
                columnBreaks,
                columns
              ),
              secondary: true,
              type: "number"
            }}
          />
        </PanelBody>
      )}
      <PanelBody {...{ title: __("Grid Gaps"), initialOpen: false }}>
        <TextControl
          {...{
            name: __("Row:"),
            value: gridGaps["row"],
            units: "px",
            update: value =>
              setAttributes({
                gridGaps: {
                  ...gridGaps,
                  row: sanitizeIntegerInput(value)
                }
              }),
            secondary: true,
            type: "number"
          }}
        />
        <TextControl
          {...{
            name: __("Column:"),
            value: gridGaps["column"],
            units: "px",
            update: value =>
              setAttributes({
                gridGaps: {
                  ...gridGaps,
                  column: sanitizeIntegerInput(value)
                }
              }),
            secondary: true,
            type: "number"
          }}
        />
      </PanelBody>
    </InspectorControls>
  );
};
