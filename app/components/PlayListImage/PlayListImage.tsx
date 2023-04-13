import classNames from "classnames";
import styles from "./play-list-image.css";
import { Paper } from "@mui/material";

export type PlayListImageProps = { images: string[] } & Omit<
  JSX.IntrinsicElements["div"],
  "ref" | "children"
>;

const PlayListImage: (props: PlayListImageProps) => JSX.Element = ({
  className,
  ...rest
}) => {
  return (
    <Paper
      {...rest}
      elevation={3}
      className={classNames("play-list-image", className)}
    ></Paper>
  );
};

export const links = () => [{ rel: "stylesheet", href: styles }];

export default PlayListImage;
