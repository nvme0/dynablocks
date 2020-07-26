import { Attributes } from "../editor/attributes";
import { ControlProps } from "../editor/ElementControls";

import Background from "./Background";
import Content from "./Content";

export interface HeroProps extends Attributes {
  controlProps?: ControlProps;
  isSelected?: boolean;
  editMode?: boolean;
  isDraggable?: boolean;
  BackgroundSettings?: () => JSX.Element;
  update?: (property: string) => (value: any) => void;
  setAttributes?: (attrs: Partial<Attributes>) => void;
}

export default (props: HeroProps): JSX.Element => {
  const {
    height,
    filterColor,
    backgroundImage,
    backgroundImageSize,
    BackgroundSettings
  } = props;

  return (
    <>
      {backgroundImage && (
        <>
          <Content
            {...{
              ...props
            }}
          />
          <Background
            {...{
              height,
              backgroundImage,
              backgroundImageSize,
              filterColor
            }}
          />
        </>
      )}
      {BackgroundSettings && <BackgroundSettings />}
    </>
  );
};
