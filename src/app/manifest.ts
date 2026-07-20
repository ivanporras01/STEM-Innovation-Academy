import type { MetadataRoute } from "next";
import { NOVA_STEM_HUB } from "@/lib/novahub-brand";
import { SITE_URL } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: NOVA_STEM_HUB.name,
    short_name: "NOVA",
    description:
      "STEM education ecosystem — School, College, Language programs, and official NOVA Shop merchandise.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a1628",
    theme_color: "#00b4d8",
    orientation: "portrait-primary",
    lang: "en",
    scope: "/",
    id: SITE_URL,
    categories: ["education", "productivity"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
