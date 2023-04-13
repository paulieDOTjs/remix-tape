import type { LinkDescriptor, LinksFunction } from "@remix-run/node";

export const handleLinksSurfacing = (
  ...links: Array<LinkDescriptor | LinksFunction>
): LinkDescriptor[] =>
  links
    .map((link) => {
      if (typeof link === "function") return link();
      return link;
    })
    .flat();
