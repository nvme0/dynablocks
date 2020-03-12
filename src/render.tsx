import { render, Fragment } from "@wordpress/element";
import { getBlocksOfType } from "@solutions4theweb/dynablocks-common/dist/helpers";

const context = require.context("./blocks", true, /frontend\.tsx$/);

const Wrapper = (parameters: {
  props: string;
  EntryPoint: (props) => JSX.Element;
}) => {
  const { props, EntryPoint } = parameters;
  return (
    <Fragment>
      <div className="props" style={{ display: "none" }}>
        {props}
      </div>
      <EntryPoint {...JSON.parse(props)} />
    </Fragment>
  );
};

context.keys().forEach(modulePath => {
  const { className, EntryPoint } = context(modulePath);
  if (className && EntryPoint) {
    getBlocksOfType(className).forEach(({ block, props }) => {
      render(React.createElement(Wrapper, { props, EntryPoint }), block);
    });
  }
});
