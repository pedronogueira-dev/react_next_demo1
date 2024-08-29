import { Box, Card } from "@radix-ui/themes";

export default function MainProductsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Card >
      <Box p={"2"}>
        {children}
      </Box>
    </Card>
  );
}
