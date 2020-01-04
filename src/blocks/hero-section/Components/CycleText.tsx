import { useState, useEffect } from "@wordpress/element";
import { Responsive } from "src/common/helpers";
import { css } from "emotion";

export interface BaseProps {
  staticText: string;
  style: {
    staticText: { color: string };
    keyword: { color: string };
    fontSize?: string;
    marginBottom?: string;
  };
  h2Responsive?: Responsive;
}

export interface ElementProps extends BaseProps {
  keyword: string;
}

export const Element = (props: ElementProps) => {
  const { staticText, keyword, style, h2Responsive } = props;
  const {
    staticText: textStyle,
    keyword: keywordStyle,
    fontSize,
    marginBottom
  } = style;
  return (
    <h2
      className={css({ ...h2Responsive })}
      style={{
        fontSize,
        marginBottom
      }}
    >
      <span
        className="static-wrapper"
        style={{ color: textStyle["color"] }}
        dangerouslySetInnerHTML={{
          __html: staticText.replace(/(?:\r\n|\r|\n)/g, "<br />")
        }}
      />{" "}
      <span
        className="dynamic-wrapper"
        style={{ color: keywordStyle["color"] }}
      >
        {keyword}
      </span>
    </h2>
  );
};

export interface ContentProps extends BaseProps {
  interval: number;
  keywordsArray: string[];
}

export const Content = (props: ContentProps) => {
  const [index, setIndex] = useState(0);
  const [timer, setTimer] = useState();
  const { keywordsArray, interval } = props;

  useEffect(() => {
    setTimer(
      setInterval(() => {
        setIndex(index => (index + 1) % keywordsArray.length);
      }, interval)
    );
    return () => {
      clearInterval(timer);
    };
  }, [interval]);

  return (
    <Element
      {...{
        keyword: keywordsArray[index],
        ...props
      }}
    />
  );
};

export interface EditorProps extends BaseProps {
  keyword: string;
}

export const Editor = (props: EditorProps) => {
  const { keyword } = props;
  return (
    <Element
      {...{
        keyword,
        ...props
      }}
    />
  );
};
