import { useEffect } from "react";

interface SeoProps {
  title: string;
  description?: string;
  canonicalPath?: string;
  ogType?: "website" | "article";
  jsonLd?: object;
}

const SITE_URL = "https://abdullahsherdy.tech";

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

const Seo = ({ title, description, canonicalPath, ogType = "website", jsonLd }: SeoProps) => {
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
    };
  }, [title, description, canonicalPath, ogType, jsonLd]);

  return null;
};

export default Seo;
