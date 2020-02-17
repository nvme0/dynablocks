import validator from "validator";
import { Fragment } from "@wordpress/element";
import { PanelBody, PanelRow, ToggleControl } from "@wordpress/components";
import { Attributes } from "./attributes";
import { TextControl } from "../../../../common/Components/Controls";

export interface ResponsiveControlProps extends Attributes {
  update: (property: string) => (value: any) => void;
  initialOpen?: boolean;
}

export default (props: ResponsiveControlProps): JSX.Element => {
  const {
    update,
    initialOpen,
    responsive,
    scaleMobile,
    scaleTablet,
    minWidthTablet,
    minWidthDesktop
  } = props;

  return (
    <PanelBody {...{ title: "Responsive", initialOpen }}>
      <PanelRow>
        <ToggleControl
          {...{
            label: "Responsive",
            checked: responsive,
            onChange: update("responsive")
          }}
        />
      </PanelRow>
      {responsive && (
        <Fragment>
          <p>Scale</p>
          <TextControl
            {...{
              name: "Tablet:",
              value: scaleTablet * 100,
              units: "%",
              update: value => {
                const sanitizedValue = validator.whitelist(value, "0123456789");
                update("scaleTablet")(parseInt(sanitizedValue) / 100.0);
              },
              secondary: true
            }}
          />
          <TextControl
            {...{
              name: "Mobile:",
              value: scaleMobile * 100,
              units: "%",
              update: value => {
                const sanitizedValue = validator.whitelist(value, "0123456789");
                update("scaleMobile")(parseInt(sanitizedValue) / 100.0);
              },
              secondary: true
            }}
          />
          <p style={{ margin: "16px 0" }}>Breakpoints</p>
          <TextControl
            {...{
              name: "Desktop:",
              value: minWidthDesktop,
              update: value => {
                update("minWidthDesktop")(
                  validator.whitelist(value, "0123456789cminpxtrexhvwa")
                );
              },
              secondary: true
            }}
          />
          <TextControl
            {...{
              name: "Tablet:",
              value: minWidthTablet,
              update: value => {
                update("minWidthTablet")(
                  validator.whitelist(value, "0123456789cminpxtrexhvwa")
                );
              },
              secondary: true
            }}
          />
        </Fragment>
      )}
    </PanelBody>
  );
};
