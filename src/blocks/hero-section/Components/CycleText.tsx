import { useState, useEffect } from "@wordpress/element";

export interface BaseProps {
  style: { color: string };
}

export interface ElementProps extends BaseProps {
  keyword: string;
}

export const Element = (props: ElementProps) => {
  const { keyword, style } = props;
  const { color } = style;
  return (
    <span className="dynamic-wrapper" style={{ color }}>
      {keyword}
    </span>
  );
};

export interface ContentProps extends BaseProps {
  interval: number;
  keywordsArray: string[];
}

export const Content = (props: ContentProps) => {
  const [index, setIndex] = useState(0);
  const { keywordsArray, interval } = props;

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(index => (index + 1) % keywordsArray.length);
    }, interval);
    return () => {
      clearInterval(timer);
    };
  }, [interval, keywordsArray.length]);

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
