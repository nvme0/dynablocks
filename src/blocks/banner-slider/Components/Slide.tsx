import { Attributes } from "../editor/attributes";
import { Image } from "../../../common/Components/Controls/ImagePlaceholder";

export interface SlideProps extends Attributes {
  editMode?: boolean;
  image: Image;
}

export default (props: SlideProps): JSX.Element => {
  const { image, filterColor, height } = props;
  return (
    <div className="wrapper">
      <div
        className="slide-container"
        style={{ backgroundImage: `url(${image.url})`, height }}
      >
        <div
          className="dimmer-filter"
          style={{ backgroundColor: filterColor }}
        />
      </div>
    </div>
  );
};
