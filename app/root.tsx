import type { V2_MetaFunction } from "@remix-run/node";
import { Outlet, isRouteErrorResponse, useRouteError } from "@remix-run/react";
import Layout from "./mui/Layout";
import { Document, links as documentLinks } from "./mui/Document";
import type { LinksFunction } from "@remix-run/node";
import resetCss from "./styles/reset.css";
import indexCss from "./styles/index.css";

export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}
export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Oops</h1>
        <p>Status: {error.status}</p>
        <p>{error.data.message}</p>
      </div>
    );
  }

  let errorMessage = "Unknown error";

  if (
    error &&
    typeof error === "object" &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    errorMessage = error.message;
  }

  return (
    <div>
      <h1>Uh oh ...</h1>
      <p>Something went wrong.</p>
      <pre>{errorMessage}</pre>
    </div>
  );
}

export const meta: V2_MetaFunction = () => {
  return [{ title: "Remixtape" }];
};

export const links: LinksFunction = () => [
  ...documentLinks(),
  { rel: "stylesheet", href: resetCss },
  { rel: "stylesheet", href: indexCss },
];
