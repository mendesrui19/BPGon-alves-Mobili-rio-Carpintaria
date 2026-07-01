import { useEffect } from "react";
import { business, faqs, services, SITE_URL } from "../../lib/seo-data";

function injectJsonLd(id: string, data: object) {
  const existing = document.getElementById(id);
  if (existing) existing.remove();
  const script = document.createElement("script");
  script.id = id;
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

export function StructuredData() {
  useEffect(() => {
    const businessId = `${SITE_URL}/#business`;
    const websiteId = `${SITE_URL}/#website`;

    const localBusiness = {
      "@type": "HomeAndConstructionBusiness",
      "@id": businessId,
      name: business.name,
      image: business.image,
      url: SITE_URL,
      telephone: business.phone,
      email: business.email,
      priceRange: business.priceRange,
      description: business.description,
      hasMap: business.googleMapsUrl,
      address: {
        "@type": "PostalAddress",
        streetAddress: business.address.street,
        addressLocality: business.address.locality,
        postalCode: business.address.postalCode,
        addressRegion: business.address.region,
        addressCountry: business.address.country,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: business.geo.latitude,
        longitude: business.geo.longitude,
      },
      sameAs: business.sameAs,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Carpintaria e Mobiliário por Medida",
        itemListElement: services.map((svc, i) => ({
          "@type": "Offer",
          position: i + 1,
          itemOffered: {
            "@type": "Service",
            name: svc.name,
            description: svc.description,
            provider: { "@id": businessId },
          },
        })),
      },
      mainEntityOfPage: { "@id": websiteId },
    };

    const website = {
      "@type": "WebSite",
      "@id": websiteId,
      url: SITE_URL,
      name: business.name,
      description: business.tagline,
      publisher: { "@id": businessId },
      inLanguage: "pt-PT",
    };

    const faqPage = {
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    };

    injectJsonLd("jsonld-graph", {
      "@context": "https://schema.org",
      "@graph": [website, localBusiness, faqPage],
    });

    return () => document.getElementById("jsonld-graph")?.remove();
  }, []);

  return null;
}
