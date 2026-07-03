import { Column, Heading, Meta, Schema } from "@once-ui-system/core";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Projects } from "@/components/work/Projects";
import { author, baseURL, renderContent } from "@/resources";
import type { PageProps } from "@/types";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations();
  const { work } = renderContent(t);

  return Meta.generate({ ...work, baseURL: `${baseURL}/${locale}` });
}

export default async function Work({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const { work } = renderContent(t);

  return (
    <Column maxWidth="m" paddingTop="24">
      <Schema {...work} as="webPage" author={author(locale)} baseURL={`${baseURL}/${locale}`} />

      <Heading marginBottom="l" variant="heading-strong-xl" align="center">
        {work.title}
      </Heading>

      <Projects locale={locale} />
    </Column>
  );
}
