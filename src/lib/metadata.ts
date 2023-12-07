import type { Metadata } from "next";

const SUFFIX_COMPANY_NAME = " | TicketRI";

type MetadataProps = {
  readonly title: string;
  readonly description: string;
  readonly addCompanyNameInTitle?: boolean;
};

type SEOMetadataProps = MetadataProps & {
  readonly url: string;
  readonly keywords?: string[];
  readonly img?: string;
};

export function getNoIndexMetadata({
  title,
  description,
  addCompanyNameInTitle,
}: MetadataProps): Metadata {
  const newTitle = `${title} ${
    addCompanyNameInTitle ? SUFFIX_COMPANY_NAME : ""
  }`;

  return {
    title: newTitle,
    description,
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
  };
}

export default function getMetadata({
  title,
  description,
  img,
  addCompanyNameInTitle,
  keywords = ["gestión"],
  url = "/",
}: SEOMetadataProps): Metadata {
  const hostname = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const urlLocation = url;
  const imgLocation = img ? img : "/logo.png";
  const newTitle = `${title} ${
    addCompanyNameInTitle ? SUFFIX_COMPANY_NAME : ""
  }`;

  return {
    title: newTitle,
    description,
    metadataBase: new URL(hostname),
    authors: [{ name: "@intecnom" }],
    keywords,
    creator: "@intecnom",
    publisher: "Omar Meza",
    openGraph: {
      title: newTitle,
      description,
      images: [imgLocation],
      url: urlLocation,
      siteName: newTitle,
      type: "website",
      locale: "es_MX",
    },
    twitter: {
      card: "summary_large_image",
      title: newTitle,
      description,
      site: "@intecno_m",
      creator: "@intecno_m",
      images: [imgLocation],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}
