import classNames from "classnames";
import styles from "./play-list-display.css";
import type { Song } from "@prisma/client";
import { handleLinksSurfacing } from "~/utils/handleLinksSurfacing";
import { useMemo } from "react";
import PlayListImage, {
  links as playListImagesLinks,
} from "../PlayListImage/PlayListImage";
import { Typography } from "@mui/material";
import { Link } from "@remix-run/react";

export type PlayListDisplayProps = {
  mixtapeId: string;
  name: string;
  songs: Song[];
} & Omit<JSX.IntrinsicElements["div"], "ref" | "children">;

const PlayListDisplay: (props: PlayListDisplayProps) => JSX.Element = ({
  mixtapeId,
  name,
  songs,
  className,
  ...rest
}) => {
  const images = useMemo(() => {
    const songImages: string[] = [];
    songs.every(({ photoUrl }) => {
      if (photoUrl) songImages.push(photoUrl);
      if (songImages.length > 4) return false;
      return true;
    });
    return songImages;
  }, [songs]);
  return (
    <div {...rest} className={classNames("play-list-display", className)}>
      <PlayListImage images={images} />
      <Typography variant="h6">{name}</Typography>
      <div>
        <Link to={`/mixes/` + mixtapeId}>See More</Link>
      </div>
    </div>
  );
};

export const links = () =>
  handleLinksSurfacing(
    { rel: "stylesheet", href: styles },
    playListImagesLinks
  );

export default PlayListDisplay;
