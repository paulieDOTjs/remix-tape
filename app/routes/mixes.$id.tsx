import { json, redirect } from "@remix-run/node";
import type { ActionArgs } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { prisma } from "~/utils/prisma.server";
import styles from "./mixes-styles/$id.css";
import { handleLinksSurfacing } from "~/utils/handleLinksSurfacing";
import { Form, useLoaderData } from "@remix-run/react";
import type { Mixtape } from "@prisma/client";
import { Button, IconButton, Link, TextField, Typography } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { Cancel, Save, SwipeLeftAltRounded } from "@mui/icons-material";
import { Link as RLink } from "@remix-run/react";

const inputMap = {
  songName: "song-name",
  artistName: "artist-name",
  songImg: "song-image",
};

const MixtapeId = () => {
  const thisMix = useLoaderData<Mixtape>();

  const [isEditing, setIsEditing] = useState(false);

  const handleClick = useCallback(() => {
    setIsEditing((prev) => !prev);
  }, []);

  const songEls = useMemo(
    () =>
      !thisMix.songs.length ? (
        <Typography variant="h4">
          You don't have any songs on this mixtape yet.
        </Typography>
      ) : (
        thisMix.songs.map((song) => (
          <div
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
            key={song.name + song.artist + song.photoUrl}
          >
            <img
              height="40px"
              src={song.photoUrl ?? ""}
              alt={song.name + song.artist + "album cover"}
            />
            <span>{`${song.name} - ${song.artist}`}</span>
          </div>
        ))
      ),
    [thisMix.songs]
  );

  return (
    <div>
      <div>
        <Link to="/mixes" component={RLink}>
          <SwipeLeftAltRounded /> Back
        </Link>
      </div>
      <Typography variant="h1">{thisMix.name}</Typography>
      {songEls}
      {isEditing ? (
        <Form replace method="post">
          <div className="input-wrapper">
            <TextField
              label={inputMap.songName}
              type="text"
              name={inputMap.songName}
              autoFocus
            />

            <TextField
              label={inputMap.artistName}
              type="text"
              name={inputMap.artistName}
            />

            <TextField
              label={inputMap.songImg}
              type="text"
              name={inputMap.songImg}
            />

            <div className="button-wrapper">
              <IconButton color="error" onClick={handleClick}>
                <Cancel />
              </IconButton>
              <IconButton type="submit" color="success">
                <Save />
              </IconButton>
            </div>
          </div>
        </Form>
      ) : (
        <div>
          <Button onClick={handleClick} variant="contained">
            {isEditing ? "Cancel" : "Add a song"}
          </Button>
        </div>
      )}
    </div>
  );
};

export const loader: LoaderFunction = async ({ params }) => {
  const id = params.id;
  const mixtape = await prisma.mixtape.findFirst({ where: { id } });

  if (mixtape) return mixtape;
  return redirect("/mixes");
};

export async function action({ request, params }: ActionArgs) {
  const id = params.id;

  if (request.method === "POST") {
    const body = await request.formData();
    const rawSongName = body.get(inputMap.songName);
    const rawArtist = body.get(inputMap.artistName);
    const rawPhotoUrl = body.get(inputMap.songImg);

    const songName = typeof rawSongName === "string" && rawSongName;
    const artist = typeof rawArtist === "string" && rawArtist;
    const photoUrl = (typeof rawPhotoUrl === "string" && rawPhotoUrl) || "";

    if (!songName) return json({ songName: "bad" }, { status: 422 });
    if (!artist) return json({ artist: "bad" }, { status: 422 });

    const newMix = await prisma.mixtape.update({
      where: { id },
      data: { songs: { push: { name: songName, artist, photoUrl } } },
    });
    return redirect("/mixes/" + newMix.id);
  }
  throw redirect("/mixes");
}

export const links = () =>
  handleLinksSurfacing({ rel: "stylesheet", href: styles });

export default MixtapeId;
