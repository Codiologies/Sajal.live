import { NextRequest, NextResponse } from "next/server";

type Verdict = "protected" | "vulnerable" | "inconclusive";

type ClickjackingScanResult = {
  url: string;
  status: number;
  xFrameOptions: string | null;
  contentSecurityPolicy: string | null;
  frameAncestors: string[] | null;
  verdict: Verdict;
  error?: string;
};

const BLOCKED_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);

const isPrivateIpv4 = (hostname: string) => {
  const match = hostname.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (!match) return false;

  const octets = match.slice(1).map((value) => Number(value));
  if (octets.some((octet) => Number.isNaN(octet) || octet > 255)) return false;

  const [a, b] = octets;
  if (a === 10) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 192 && b === 168) return true;
  if (a === 169 && b === 254) return true;
  return false;
};

const isPrivateIpv6 = (hostname: string) => {
  const normalized = hostname.toLowerCase();
  return (
    normalized === "::1" ||
    normalized.startsWith("fe80:") ||
    normalized.startsWith("fc") ||
    normalized.startsWith("fd")
  );
};

const isBlockedHostname = (hostname: string) => {
  const normalized = hostname.toLowerCase();
  if (BLOCKED_HOSTS.has(normalized)) return true;
  if (normalized.endsWith(".local") || normalized.endsWith(".internal")) return true;
  if (isPrivateIpv4(normalized) || isPrivateIpv6(normalized)) return true;
  return false;
};

const parseFrameAncestors = (csp: string) => {
  const match = csp.match(/frame-ancestors\s+([^;]+)/i);
  if (!match) return null;
  return match[1]
    .trim()
    .split(/\s+/)
    .filter(Boolean);
};

const isCspProtected = (frameAncestors: string[] | null) => {
  if (!frameAncestors || frameAncestors.length === 0) return false;
  if (frameAncestors.includes("'none'")) return true;
  if (frameAncestors.includes("*")) return false;
  return true;
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get("url");

  if (!targetUrl) {
    return NextResponse.json({ error: "Missing url parameter." }, { status: 400 });
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(targetUrl);
  } catch {
    return NextResponse.json({ error: "Invalid URL." }, { status: 400 });
  }

  if (!["http:", "https:"].includes(parsedUrl.protocol)) {
    return NextResponse.json({ error: "Only http and https URLs are allowed." }, { status: 400 });
  }

  if (isBlockedHostname(parsedUrl.hostname)) {
    return NextResponse.json({ error: "Target hostname is not allowed." }, { status: 400 });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(parsedUrl.toString(), {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "User-Agent": "ClickjackingTester/2026 (+https://sajal.live)"
      }
    });

    const xFrameOptions = response.headers.get("x-frame-options");
    const contentSecurityPolicy = response.headers.get("content-security-policy");
    const contentSecurityPolicyReportOnly = response.headers.get(
      "content-security-policy-report-only"
    );
    const cspForParsing = contentSecurityPolicy || contentSecurityPolicyReportOnly || null;
    const frameAncestors = cspForParsing ? parseFrameAncestors(cspForParsing) : null;

    const xfoProtected = xFrameOptions
      ? /deny|sameorigin/i.test(xFrameOptions)
      : false;
    const cspProtected = isCspProtected(frameAncestors);

    const verdict: Verdict = xfoProtected || cspProtected ? "protected" : "vulnerable";

    const payload: ClickjackingScanResult = {
      url: response.url,
      status: response.status,
      xFrameOptions,
      contentSecurityPolicy,
      frameAncestors,
      verdict
    };

    return NextResponse.json(payload, { status: 200 });
  } catch (error) {
    const payload: ClickjackingScanResult = {
      url: parsedUrl.toString(),
      status: 0,
      xFrameOptions: null,
      contentSecurityPolicy: null,
      frameAncestors: null,
      verdict: "inconclusive",
      error: error instanceof Error ? error.message : "Unable to reach target."
    };

    return NextResponse.json(payload, { status: 200 });
  } finally {
    clearTimeout(timeout);
  }
}
