import "./globals.css";

export const metadata = {
  title: "Planetary Space Weather Service",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
