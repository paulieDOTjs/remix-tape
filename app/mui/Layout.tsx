import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <Box sx={{ my: 4 }}>{children}</Box>
    </Container>
  );
}
