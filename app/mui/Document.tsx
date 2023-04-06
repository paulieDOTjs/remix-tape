import { ThemeProvider, withEmotionCache } from "@emotion/react";
import { unstable_useEnhancedEffect as useEnhancedEffect } from "@mui/material";
import theme from "./theme";
import ClientStyleContext from "./ClientStyleContext";
import { useContext } from "react";
import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { NavBar, links as navBarLinks } from "~/components/NavBar/NavBar";
import type { LinksFunction } from "@remix-run/node";

interface DocumentProps {
  children: React.ReactNode;
  title?: string;
}

export const Document = withEmotionCache(
  ({ children, title }: DocumentProps, emotionCache) => {
    const clientStyleData = useContext(ClientStyleContext);

    useEnhancedEffect(() => {
      emotionCache.sheet.container = document.head;
      const tags = emotionCache.sheet.tags;
      emotionCache.sheet.flush();
      tags.forEach((tag) => {
        (emotionCache.sheet as any)._insertTag(tag);
      });
      clientStyleData.reset();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <meta name="theme-color" content={theme.palette.primary.main} />
          {title ? <title>{title}</title> : null}
          <Meta />
          <Links />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <meta
            name="emotion-insertion-point"
            content="emotion-insertion-point"
          />
        </head>
        <body>
          <ThemeProvider theme={theme}>
            <NavBar />
            {children}
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
          </ThemeProvider>
        </body>
      </html>
    );
  }
);

export const links: LinksFunction = () => [...navBarLinks()];
