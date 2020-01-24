import { dispatch, select } from "@wordpress/data";
import { BlockEditProps } from "@wordpress/blocks";
import ElementControls from "./ElementControls";
import { Attributes } from "./attributes";
import { StyledButton } from "../../../common/Components/Bootstrap/Button";

interface EditProps extends BlockEditProps<Attributes> {
  // extends missing types
  clientId: string | undefined; // should always have this
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
  const { attributes } = props;
  const { buttonText: text } = attributes;

  const update = createUpdateFunction(props);
  const updateColorPicker = property => value => {
    const { a, b, g, r } = value.rgb;
    const rgbaValue = `rgba(${r},${g},${b},${a})`;
    update(property)(rgbaValue);
  };

  return (
    <div className="s4tw-dynablocks-button">
      <ElementControls
        {...{
          ...attributes,
          update,
          updateColorPicker
        }}
      />
      <StyledButton
        {...{
          ...attributes,
          text,
          editMode: true
        }}
      />
    </div>
  );
};
