const SITE_URL = "https://dmrsoaps.com";
const SITE_NAME = "DMR Soaps";
const DEFAULT_IMAGE = `${SITE_URL}/assets/various-page-assets/dmr_logo.png`;

function getAbsoluteUrl(path) {
    return new URL(path, SITE_URL).href;
}

function setMeta(selector, attribute, value) {
    let element = document.head.querySelector(selector);

    if (!element) {
        element = document.createElement("meta");
        const match = selector.match(/\[(name|property)="([^"]+)"\]/);

        if (match) {
            element.setAttribute(match[1], match[2]);
        }

        document.head.appendChild(element);
    }

    element.setAttribute(attribute, value);
}

function setCanonical(url) {
    let canonical = document.head.querySelector('link[rel="canonical"]');

    if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
    }

    canonical.href = url;
}

function setJsonLd(id, data) {
    let script = document.getElementById(id);

    if (!script) {
        script = document.createElement("script");
        script.id = id;
        script.type = "application/ld+json";
        document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(data);
}

export function setPageSeo({ title, description, canonicalPath, image = DEFAULT_IMAGE, type = "website" }) {
    const canonicalUrl = getAbsoluteUrl(canonicalPath);
    const imageUrl = image.startsWith("http") ? image : getAbsoluteUrl(image);

    document.title = title;
    setCanonical(canonicalUrl);
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:site_name"]', "content", SITE_NAME);
    setMeta('meta[property="og:type"]', "content", type);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:url"]', "content", canonicalUrl);
    setMeta('meta[property="og:image"]', "content", imageUrl);
    setMeta('meta[name="twitter:card"]', "content", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);
    setMeta('meta[name="twitter:image"]', "content", imageUrl);
}

export function setOrganizationSeo() {
    setJsonLd("organization-schema", {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
        logo: DEFAULT_IMAGE,
        sameAs: [
            "https://www.instagram.com/dmr.soaps/",
            "https://www.facebook.com/raikesdaniela/"
        ],
        contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer service",
            url: "https://wa.me/5491141849597"
        }
    });
}

export function setProductSeo(product, formats) {
    const canonicalPath = `/productos.html?producto=${product.id}`;
    const title = `${product.name} | DMR Soaps`;
    const description = product.description;
    const image = getAbsoluteUrl(product.img);
    const offers = formats.map(format => ({
        "@type": "Offer",
        priceCurrency: "ARS",
        price: format.precio,
        availability: product.availability ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        url: getAbsoluteUrl(canonicalPath),
        itemCondition: "https://schema.org/NewCondition",
        name: format.formato
    }));

    setPageSeo({
        title,
        description,
        canonicalPath,
        image,
        type: "product"
    });
    setJsonLd("product-schema", {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description,
        image,
        brand: {
            "@type": "Brand",
            name: SITE_NAME
        },
        category: product.product_type,
        offers
    });
}

export function setCatalogSeo() {
    setPageSeo({
        title: "Productos | DMR Soaps",
        description: "Catálogo de jabones naturales DMR Soaps. Elegí productos, formatos y cantidades para consultar disponibilidad por WhatsApp.",
        canonicalPath: "/productos.html",
        image: "/assets/various-page-assets/dmr_logo.png"
    });
    setJsonLd("catalog-schema", {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Catálogo de DMR Soaps",
        description: "Catálogo de jabones naturales artesanales para consultar disponibilidad por WhatsApp.",
        url: getAbsoluteUrl("/productos.html")
    });
}
