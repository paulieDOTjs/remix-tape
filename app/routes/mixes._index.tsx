import type {
  ActionArgs,
  LinksFunction,
  LoaderFunction,
} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import type { Mixtape } from "@prisma/client";
import { prisma } from "~/utils/prisma.server";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import PlayListDisplay, {
  links as playlistLinks,
} from "~/components/PlayListDisplay/PlayListDisplay";
import styles from "./mixes-styles/_index.css";
import { handleLinksSurfacing } from "~/utils/handleLinksSurfacing";
import { Cancel, Save } from "@mui/icons-material";

const inputName = "mixtape-name";

const Mixes = () => {
  const mixtapes = useLoaderData<Mixtape[]>();

  const [isEditing, setIsEditing] = useState(false);

  const handleClick = useCallback(() => {
    setIsEditing((prev) => !prev);
  }, []);

  const mixtapeEls = useMemo(
    () =>
      !mixtapes.length ? (
        <Typography variant="h4">You don't have any mixtapes.</Typography>
      ) : (
        mixtapes.map((mixtape) => (
          <PlayListDisplay
            key={mixtape.id}
            mixtapeId={mixtape.id}
            name={mixtape.name}
            songs={mixtape.songs}
          />
        ))
      ),
    [mixtapes]
  );

  return (
    <div>
      <Typography variant="h1">Your mixtapes</Typography>
      <div>{mixtapeEls}</div>
      {isEditing ? (
        <Form replace method="post">
          <div className="input-wrapper">
            <TextField
              label={inputName}
              type="text"
              name={inputName}
              autoFocus
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
            {isEditing ? "Cancel" : "Make a new playlist"}
          </Button>
        </div>
      )}
    </div>
  );
};

export const loader: LoaderFunction = async () =>
  await prisma.mixtape.findMany();

export const links: LinksFunction = () =>
  handleLinksSurfacing({ rel: "stylesheet", href: styles }, playlistLinks);

export async function action({ request }: ActionArgs) {
  if (request.method === "POST") {
    const body = await request.formData();
    const mixtapeName = body.get(inputName);
    if (mixtapeName && typeof mixtapeName === "string") {
      const newMix = await prisma.mixtape.create({
        data: { name: mixtapeName },
      });
      return redirect("/mixes/" + newMix.id);
    }
  }
  throw redirect("/mixes");
}

export default Mixes;
