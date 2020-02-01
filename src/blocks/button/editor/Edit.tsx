import { useEffect, useState, useRef } from "@wordpress/element";
import { BlockEditProps } from "@wordpress/blocks";
import ElementControls from "./ElementControls";
import { Attributes } from "./attributes";
import { StyledButton } from "../../../common/Components/Bootstrap/Button";
import withDraggable, { Limits } from "../../../common/HOCs/withDraggable";
import { createUpdateFunction } from "../../../common/helpers";
import { Toolbar, ToolbarButton } from "@wordpress/components";
import { BlockControls } from "@wordpress/block-editor";

interface EditProps extends BlockEditProps<Attributes> {
  // extends missing types
  clientId?: string; // should always have this
}

export const Edit = (props: EditProps): JSX.Element => {
  const { attributes, setAttributes } = props;
  const { buttonText: text, buttonPosition } = attributes;

  const containerRef = useRef<HTMLDivElement>(null);
  const [parent, setParent] = useState<Element | null>();
  const [isDraggable, setIsDraggable] = useState(false);

  const updatePositionCallback = (
    position: { left: number; top: number },
    limits: Limits
  ) => {
    setAttributes({
      buttonPosition: {
        left: {
          value: position["left"] || 0,
          units: buttonPosition["left"]["units"] || "%"
        },
        top: {
          value: position["top"] || 0,
          units: buttonPosition["top"]["units"] || "px"
        }
      },
      buttonPositionLimits: limits
    });
  };

  const DraggableStyledButton = withDraggable({
    updateCallback: updatePositionCallback,
    position: buttonPosition,
    parentSize: {
      width: parent ? parent.clientWidth : null,
      height: parent ? parent.clientHeight : null
    },
    transforms: {
      translateX: { value: -50, units: "%" },
      translateY: { value: 0, units: "px" }
    },
    adjustmentFactor: {
      x: 1,
      y: 2 // negative inverse of translate.. e.g. 100/(100% - translateX(-90%)) = 1 / 0.1.
    },
    lockX: false,
    lockY: true,
    style: {
      position: "relative",
      display: "inline-block",
      transform: "translateX(-50%)"
    }
  })(StyledButton);

  const update = createUpdateFunction(props);
  const updateColorPicker = property => value => {
    const { a, b, g, r } = value.rgb;
    const rgbaValue = `rgba(${r},${g},${b},${a})`;
    update(property)(rgbaValue);
  };

  useEffect(() => {
    const { current } = containerRef;
    if (!parent && current) {
      const { offsetParent } = current;
      if (offsetParent) {
        setParent(offsetParent);
      }
    }
  }, [parent, containerRef]);

  const buttonProps = {
    ...{
      ...attributes,
      text,
      updateText: update("buttonText"),
      editMode: true
    }
  };

  const { left, top } = buttonPosition;

  return (
    <div className="s4tw-dynablocks-button" ref={containerRef}>
      <BlockControls>
        <Toolbar>
          <ToolbarButton
            {...{
              icon: "move",
              title: "Position",
              onClick: () => setIsDraggable(!isDraggable),
              isActive: isDraggable
            }}
          />
        </Toolbar>
      </BlockControls>
      <ElementControls
        {...{
          ...attributes,
          update,
          updateColorPicker
        }}
      />
      {isDraggable ? (
        <DraggableStyledButton {...{ ...buttonProps, updateText: undefined }} />
      ) : (
        <StyledButton
          {...{
            ...buttonProps,
            style: {
              position: "relative",
              transform: `translateX(-50%)`,
              left: `${left.value}${left.units}`,
              top: `${top.value}${left.units}`
            }
          }}
        />
      )}
    </div>
  );
};
