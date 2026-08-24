import { useEffect } from "react";

interface SeoProps {
  title: string;
  description?: string;
  canonicalPath?: string;
  ogType?: "website" | "article";
  jsonLd?: object;
  /** Absolute URL or site-root-relative path to the social-share image. Falls back to the site default. */
  image?: string;
  /** When true, emit a robots noindex tag (e.g. the 404 page). */
  noindex?: boolean;
}

const SITE_URL = "https://www.abdullahsherdy.tech";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function toAbsolute(image: string): string {
  if (/^https?:\/\//.test(image)) return image;
  return `${SITE_URL}${image.startsWith("/") ? "" : "/"}${image}`;
}

const Seo = ({ title, description, canonicalPath, ogType = "website", jsonLd, image, noindex }: SeoProps) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    if (description) {
      setMeta("name", "description", description);
      setMeta("property", "og:description", description);
      setMeta("name", "twitter:description", description);
    }
    setMeta("property", "og:title", title);
    setMeta("name", "twitter:title", title);
    setMeta("property", "og:type", ogType);
    setMeta("name", "twitter:card", "summary_large_image");

    const imageUrl = image ? toAbsolute(image) : DEFAULT_OG_IMAGE;
    setMeta("property", "og:image", imageUrl);
    setMeta("name", "twitter:image", imageUrl);

    // Robots: only noindex pages (e.g. 404) create a tagged meta. Managing our own
    // tag means a client-side nav from a noindex page back to an indexable one
    // removes it, rather than stranding the whole SPA as noindex.
    let robots = document.head.querySelector<HTMLMetaElement>("meta[data-seo-robots]");
    if (noindex) {
      if (!robots) {
        robots = document.createElement("meta");
        robots.setAttribute("name", "robots");
        robots.setAttribute("data-seo-robots", "");
        document.head.appendChild(robots);
      }
      robots.setAttribute("content", "noindex, nofollow");
    } else if (robots) {
      robots.remove();
    }

    let canonical: HTMLLinkElement | null = null;
    if (canonicalPath) {
      const url = `${SITE_URL}${canonicalPath}`;
      setMeta("property", "og:url", url);
      canonical = document.head.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
      }
      canonical.href = url;
    }

    let script: HTMLScriptElement | null = null;
    if (jsonLd) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      document.title = prevTitle;
      script?.remove();
      if (noindex) document.head.querySelector("meta[data-seo-robots]")?.remove();
    };
  }, [title, description, canonicalPath, ogType, jsonLd, image, noindex]);

  return null;
};

export default Seo;
