"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useState } from "react";

type Market =
  | "global"
  | "ghana"
  | "nigeria"
  | "east-africa"
  | "uk"
  | "us"
  | "eu"
  | "australia"
  | "latin-america";
type Variant = "hero" | "finance" | "operations";

const marketSources: Record<Variant, Record<Market, string>> = {
  hero: {
    global: "/assets/v2-hero-customer-followup.png",
    ghana: "/assets/v2-ghana-hero.png",
    nigeria: "/assets/v2-nigeria-hero.png",
    "east-africa": "/assets/v2-east-africa-hero.png",
    uk: "/assets/v2-uk-hero.png",
    us: "/assets/v2-us-hero.png",
    eu: "/assets/v2-eu-hero.png",
    australia: "/assets/v2-australia-hero.png",
    "latin-america": "/assets/v2-latin-america-hero.png",
  },
  finance: {
    global: "/assets/v2-insurance-explained.png",
    ghana: "/assets/v2-ghana-finance.png",
    nigeria: "/assets/v2-insurance-explained.png",
    "east-africa": "/assets/v2-insurance-explained.png",
    uk: "/assets/v2-insurance-explained.png",
    us: "/assets/v2-insurance-explained.png",
    eu: "/assets/v2-insurance-explained.png",
    australia: "/assets/v2-insurance-explained.png",
    "latin-america": "/assets/v2-insurance-explained.png",
  },
  operations: {
    global: "/assets/v2-operations-review.png",
    ghana: "/assets/v2-ghana-operations.png",
    nigeria: "/assets/v2-operations-review.png",
    "east-africa": "/assets/v2-operations-review.png",
    uk: "/assets/v2-operations-review.png",
    us: "/assets/v2-operations-review.png",
    eu: "/assets/v2-operations-review.png",
    australia: "/assets/v2-operations-review.png",
    "latin-america": "/assets/v2-operations-review.png",
  },
};

let marketPromise: Promise<Market> | null = null;

function detectMarket() {
  if (!marketPromise) {
    marketPromise = fetch("/api/geo")
      .then((response) => response.json())
      .then((data: { market?: Market }) => data.market || "global")
      .catch(() => "global");
  }
  return marketPromise;
}

type MarketImageProps = Omit<ImageProps, "src"> & { variant: Variant };

export function MarketImage({ variant, alt, ...props }: MarketImageProps) {
  const [market, setMarket] = useState<Market>("global");

  useEffect(() => {
    let active = true;
    detectMarket().then((detectedMarket) => {
      if (active) setMarket(detectedMarket);
    });

    return () => {
      active = false;
    };
  }, []);

  return <Image {...props} src={marketSources[variant][market]} alt={alt} />;
}
