import { Column, Heading, Meta, Schema } from "@once-ui-system/core";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { author, baseURL, renderContent } from "@/resources";
import type { PageProps } from "@/types";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations();
  const { blog } = renderContent(t);

  return Meta.generate({ ...blog, baseURL: `${baseURL}/${locale}` });
}

export default async function Blog({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const { blog, newsletter } = renderContent(t);

  return (
    <Column maxWidth="m" paddingTop="24">
      <Schema {...blog} as="blogPosting" author={author(locale)} baseURL={`${baseURL}/${locale}`} />

      <Heading marginBottom="l" variant="heading-strong-xl" marginLeft="24">
        {blog.title}
      </Heading>

      <Column fillWidth flex={1} gap="40">
        <Posts range={[1, 1]} thumbnail locale={locale} />
        <Posts range={[2, 3]} columns="2" thumbnail direction="column" locale={locale} />
        {/* <Mailchimp marginBottom="l" newsletter={newsletter} /> */}

        <Heading as="h2" variant="heading-strong-xl" marginLeft="l">
          Earlier posts
        </Heading>

        <Posts range={[4]} columns="2" locale={locale} />
      </Column>
    </Column>
  );
}
