import { NavLink } from "@remix-run/react";
import styles from "./nav-bar.css";
import type { LinksFunction } from "@remix-run/node";
import { Container, Link } from "@mui/material";

export type NavBarProps = Omit<
  JSX.IntrinsicElements["div"],
  "size" | "ref" | "children"
>;

export const NavBar: (props: NavBarProps) => JSX.Element = ({
  className,
  ...rest
}) => {
  return (
    <div {...rest} className={"nav-bar"}>
      <Container>
        <div className="links-wrapper">
          <Link to="/" component={NavLink}>
            Home
          </Link>
          <Link to="/mixes" component={NavLink}>
            Mixtapes
          </Link>
        </div>
      </Container>
    </div>
  );
};

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];
