import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orbita · Robots animados",
  description: "Elige entre 5 guías Orbita articuladas — saludo y modo scan.",
};

export default function OrbitoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
