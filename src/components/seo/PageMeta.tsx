import { useEffect } from "react";

interface PageMetaProps {
  title: string;
  description: string;
  canonical: string;
  ogType?: string;
}

function setMeta(name: string, content: string, isProperty = false) {
  const attr = isProperty ? "property" : "name";
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function PageMeta({ title, description, canonical, ogType = "website" }: PageMetaProps) {
  useEffect(() => {
    document.title = title;
    setMeta("description", description);
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:url", canonical, true);
    setMeta("og:type", ogType, true);
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setCanonical(canonical);
  }, [title, description, canonical, ogType]);

  return null;
}
