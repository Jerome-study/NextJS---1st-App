import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from "./NavBar";
import { Container } from "react-bootstrap";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Image Gallery",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        <main>
          <Container className="py-4">
            {children}
          </Container>
        </main>
      </body>
    </html>
  );
}
