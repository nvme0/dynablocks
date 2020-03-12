import { RichText } from "@wordpress/block-editor";
import { Icon } from "@wordpress/components";
import { Fragment, useState } from "@wordpress/element";
import { Attributes } from "../editor/attributes";
import { Accordion } from "react-bootstrap";

export interface ElementProps extends Attributes {
  editMode?: boolean;
  isSelected?: boolean;
  update?: (property: any) => (value: any) => void;
}

export default (props: ElementProps): JSX.Element => {
  const {
    editorId = "0",
    editMode,
    isSelected,
    update,
    headingText,
    bodyText
  } = props;

  const [isOpen, setIsOpen] = useState(false);

  const IconElement = (): JSX.Element => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Icon
        {...{
          icon: isOpen ? "minus" : "plus",
          style: {
            cursor: "pointer",
            height: "100%"
          }
        }}
      />
    </div>
  );

  return (
    <div
      className="s4tw-dynablocks-accordion-column-element"
      style={{ outline: isSelected ? "3px solid #0093dc" : undefined }}
    >
      {editMode && update ? (
        <Fragment>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "9fr 1fr",
              cursor: "pointer"
            }}
          >
            <RichText
              {...{
                value: headingText,
                placeholder: "How long does it take to build a website?",
                onChange: update("headingText"),
                tagName: "h4"
              }}
            />
            <Accordion.Toggle
              {...{
                eventKey: editorId,
                as: "span",
                style: {
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                },
                onClick: () => setIsOpen(!isOpen)
              }}
            >
              <IconElement />
            </Accordion.Toggle>
          </div>
          <Accordion.Collapse
            {...{
              eventKey: editorId
            }}
          >
            <RichText
              {...{
                value: bodyText,
                placeholder:
                  "Factors such as the level of customization, how clear the specifications are and how long it takes you to review the changes affect the time it takes to get your website online. Using plugins such as this one saves you time, getting your site online faster.",
                onChange: update("bodyText"),
                tagName: "p"
              }}
            />
          </Accordion.Collapse>
        </Fragment>
      ) : (
        <Fragment>
          <Accordion.Toggle
            {...{
              eventKey: editorId,
              as: "div",
              style: {
                display: "grid",
                gridTemplateColumns: "9fr 1fr",
                cursor: "pointer"
              },
              onClick: () => setIsOpen(!isOpen)
            }}
          >
            <RichText.Content
              {...{
                value: headingText,
                tagName: "h4"
              }}
            />
            <IconElement />
          </Accordion.Toggle>
          <Accordion.Collapse
            {...{
              eventKey: editorId
            }}
          >
            <RichText.Content
              {...{
                value: bodyText,
                tagName: "p"
              }}
            />
          </Accordion.Collapse>
        </Fragment>
      )}
    </div>
  );
};
