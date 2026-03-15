interface OrganizationJsonLdProps {
  name: string;
  url: string;
  description: string;
  telephone?: string;
  email?: string;
  address?: {
    locality: string;
    region: string;
    country: string;
  };
}

// 组织结构化数据
export function OrganizationJsonLd({
  name,
  url,
  description,
  telephone,
  email,
  address,
}: OrganizationJsonLdProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    description,
    telephone,
    email,
    address: address
      ? {
          '@type': 'PostalAddress',
          addressLocality: address.locality,
          addressRegion: address.region,
          addressCountry: address.country,
        }
      : undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

interface WebSiteJsonLdProps {
  name: string;
  url: string;
  description: string;
  potentialAction?: {
    target: string;
    queryInput: string;
  };
}

// 网站结构化数据
export function WebSiteJsonLd({
  name,
  url,
  description,
  potentialAction,
}: WebSiteJsonLdProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url,
    description,
    potentialAction: potentialAction
      ? {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: potentialAction.target,
          },
          'query-input': {
            '@type': 'PropertyValueSpecification',
            valueName: potentialAction.queryInput,
            valueRequired: true,
          },
        }
      : undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

interface BreadcrumbJsonLdProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

// 面包屑结构化数据
export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

interface FAQJsonLdProps {
  questions: Array<{
    question: string;
    answer: string;
  }>;
}

// FAQ结构化数据
export function FAQJsonLd({ questions }: FAQJsonLdProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
