import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const fallbackEndpoint = "https://ipapi.co/{ip}/json/";
const euCountryCodes = new Set([
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU",
  "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE",
]);
const latinAmericaCountryCodes = new Set([
  "AR", "BO", "BR", "CL", "CO", "CR", "DO", "EC", "GT", "HN", "MX", "NI", "PA", "PE",
  "PY", "SV", "UY", "VE",
]);

function marketForCountry(countryCode: string | null) {
  if (!countryCode) return "global";
  if (countryCode === "GH") return "ghana";
  if (countryCode === "NG") return "nigeria";
  if (countryCode === "KE" || countryCode === "RW") return "east-africa";
  if (countryCode === "GB") return "uk";
  if (countryCode === "US") return "us";
  if (countryCode === "AU") return "australia";
  if (euCountryCodes.has(countryCode)) return "eu";
  if (latinAmericaCountryCodes.has(countryCode)) return "latin-america";
  return "global";
}

export async function GET(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const clientIp = forwardedFor?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || null;
  if (!clientIp) {
    return NextResponse.json({ countryCode: null, market: "global" }, { status: 200 });
  }
  const configuredEndpoint = process.env.IP_LOOKUP_ENDPOINT || fallbackEndpoint;
  const endpoint = configuredEndpoint.replace("{ip}", encodeURIComponent(clientIp));

  try {
    const response = await fetch(endpoint, {
      headers: { accept: "application/json" },
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json({ countryCode: null, market: "global" }, { status: 200 });
    }

    const data = await response.json() as { country_code?: string; country?: string; countryCode?: string };
    const countryCode = (data.country_code || data.countryCode || "").toUpperCase() || null;

    return NextResponse.json({
      countryCode,
      countryName: data.country || null,
      market: marketForCountry(countryCode),
    });
  } catch {
    return NextResponse.json({ countryCode: null, market: "global" }, { status: 200 });
  }
}
