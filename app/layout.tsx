import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Best Craft Material",
  description: "เบสท์ คราฟท์ แมททีเรียล - แหล่งรวมวัสดุคุณภาพครบวงจร",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
