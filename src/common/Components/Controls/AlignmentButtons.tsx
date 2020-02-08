import { ButtonGroup, Button } from "@wordpress/components";

export default <T extends any>(props: {
  lowerLimit: {
    label: string;
    value: T;
  };
  centerPosition: {
    label: string;
    value: T;
  };
  upperLimit: {
    label: string;
    value: T;
  };
  update: (value: T) => void;
  isActive?: T;
}): JSX.Element => {
  const { lowerLimit, centerPosition, upperLimit, update, isActive } = props;
  const activeButtonStyle = {
    color: "#fff"
  };
  return (
    <ButtonGroup>
      <Button
        {...{
          isSmall: true,
          isTertiary: true,
          isPrimary: isActive === lowerLimit.value,
          style: isActive === lowerLimit.value ? activeButtonStyle : undefined,
          onClick: () => update(lowerLimit.value)
        }}
      >
        {lowerLimit.label}
      </Button>
      <Button
        {...{
          isSmall: true,
          isTertiary: true,
          isPrimary: isActive === centerPosition.value,
          style:
            isActive === centerPosition.value ? activeButtonStyle : undefined,
          onClick: () => update(centerPosition.value)
        }}
      >
        {centerPosition.label}
      </Button>
      <Button
        {...{
          isSmall: true,
          isTertiary: true,
          isPrimary: isActive === upperLimit.value,
          style: isActive === upperLimit.value ? activeButtonStyle : undefined,
          onClick: () => update(upperLimit.value)
        }}
      >
        {upperLimit.label}
      </Button>
    </ButtonGroup>
  );
};
