export default ({
  height,
  backgroundImage,
  backgroundImageSize,
  filterColor
}) => {
  const imageSrc = backgroundImage
    ? backgroundImageSize
      ? backgroundImage.sizes[backgroundImageSize].url
      : backgroundImage.url
    : undefined;

  return (
    <div className="wrapper">
      <div
        className="hero-container"
        style={{
          backgroundImage: `url(${imageSrc})`,
          height
        }}
      >
        <div
          className="dimmer-filter"
          style={{ backgroundColor: filterColor }}
        />
      </div>
    </div>
  );
};
