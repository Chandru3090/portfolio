import { useInView } from "../../hooks/useInView";

function Reveal({ children, delay = 0, as: Tag = "div", className = "" }) {
  const [ref, inView] = useInView();

  return (
    <Tag
      ref={ref}
      className={"reveal" + (inView ? " is-visible" : "") + (className ? ` ${className}` : "")}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
    >
      {children}
    </Tag>
  );
}

export default Reveal;
