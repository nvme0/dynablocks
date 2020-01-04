import OutputBlock, { Type } from "./OutputBlock";

export type Tag =
  | "div"
  | "section"
  | "main"
  | "article"
  | "header"
  | "footer"
  | "aside"
  | "nav";

export default (props: {
  tag: Tag;
  type: Type;
  className?: string;
}): JSX.Element => {
  const { tag, type, className } = props;

  switch (tag) {
    case "div":
      return (
        <div className={className}>
          <OutputBlock type={type} />
        </div>
      );

    case "section":
      return (
        <section className={className}>
          <OutputBlock type={type} />
        </section>
      );

    case "main":
      return (
        <main className={className}>
          <OutputBlock type={type} />
        </main>
      );

    case "article":
      return (
        <article className={className}>
          <OutputBlock type={type} />
        </article>
      );

    case "header":
      return (
        <header className={className}>
          <OutputBlock type={type} />
        </header>
      );

    case "footer":
      return (
        <footer className={className}>
          <OutputBlock type={type} />
        </footer>
      );

    case "aside":
      return (
        <aside className={className}>
          <OutputBlock type={type} />
        </aside>
      );

    case "nav":
      return (
        <nav className={className}>
          <OutputBlock type={type} />
        </nav>
      );

    default:
      throw `S4TW-BLOCK-KIT-TYPE-1: Components: ContainerElement: Tag: "${tag}" is invalid, must be "div", "section", "main", "article", "header, "footer", "aside" or "nav"`;
  }
};
