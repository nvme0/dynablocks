import { dispatch, select } from "@wordpress/data";
import { useEffect, useState } from "@wordpress/element";
import { BlockEditProps } from "@wordpress/blocks";
import ElementControls from "./ElementControls";
import { Attributes } from "./attributes";
import { StyledButton } from "../../../common/Components/Bootstrap/Button";
import withDraggable from "../../../common/HOCs/withDraggable";

interface EditProps extends BlockEditProps<Attributes> {
  // extends missing types
  clientId?: string; // should always have this
}

const createUpdateFunction = (props: EditProps) => {
  const { clientId, attributes, setAttributes } = props;
  const { parentId, relationship } = attributes;
  let syncWithParent;

  if (parentId && relationship && clientId) {
    const parentAttributes = select("core/block-editor").getBlockAttributes(
      parentId
    );

    if (parentAttributes) {
      syncWithParent = () => {
        const { innerBlocks } = parentAttributes;
        const blockInstance = select("core/block-editor").getBlock(clientId);
        dispatch("core/block-editor").updateBlockAttributes(parentId, {
          innerBlocks: {
            ...innerBlocks,
            [relationship]: blockInstance
          }
        });
      };

      // sync attributes with parent
      syncWithParent();
    }
  }

  if (!syncWithParent) {
    return property => value => {
      setAttributes({ [property]: value });
    };
  }

  return property => value => {
    syncWithParent();
    setAttributes({ [property]: value });
  };
};

export const Edit = (props: EditProps): JSX.Element => {
  const { attributes, setAttributes } = props;
  const {
    buttonText: text,
    buttonPositionLeft: left,
    buttonPositionTop: top
  } = attributes;

  const containerRef = React.createRef<HTMLDivElement>();
  const [parent, setParent] = useState<Element | null>();

  const handlePositionUpdateCallback = (
    position: Partial<{
      left: number;
      top: number;
    }>
  ) => {
    setAttributes({
      buttonPositionLeft: position.left,
      buttonPositionTop: position.top
    });
  };

  const DraggableStyledButton = withDraggable({
    position: { left, top },
    updateCallback: handlePositionUpdateCallback,
    parentSize: {
      width: parent ? parent.clientWidth : null,
      height: parent ? parent.clientHeight : null
    },
    lockX: false,
    lockY: true,
    style: {
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

  return (
    <div className="s4tw-dynablocks-button" ref={containerRef}>
      <ElementControls
        {...{
          ...attributes,
          update,
          updateColorPicker
        }}
      />
      <DraggableStyledButton
        {...{
          ...attributes,
          text,
          editMode: true
        }}
      />
    </div>
  );
};
