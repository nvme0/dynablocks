import { ButtonGroup, Button } from "@wordpress/components";

export default (props: {
  lowerLimit: {
    label: string;
    value: number;
  };
  centerPosition: {
    label: string;
    value: number;
  };
  upperLimit: {
    label: string;
    value: number;
  };
  update: (value: number) => void;
}): JSX.Element => {
  const { lowerLimit, centerPosition, upperLimit, update } = props;
  return (
    <ButtonGroup>
      <Button
        {...{
          isSmall: true,
          isSecondary: true,
          onClick: () => update(lowerLimit.value)
        }}
      >
        {lowerLimit.label}
      </Button>
      <Button
        {...{
          isSmall: true,
          isSecondary: true,
          onClick: () => update(centerPosition.value)
        }}
      >
        {centerPosition.label}
      </Button>
      <Button
        {...{
          isSmall: true,
          isSecondary: true,
          onClick: () => update(upperLimit.value)
        }}
      >
        {upperLimit.label}
      </Button>
    </ButtonGroup>
  );
};
