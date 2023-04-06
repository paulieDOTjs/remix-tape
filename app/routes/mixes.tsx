export type mixesProps = {} & Omit<
  JSX.IntrinsicElements["div"],
  "ref" | "children"
>;

const mixes: (props: mixesProps) => JSX.Element = ({ className, ...rest }) => {
  return <div {...rest}></div>;
};

export default mixes;
