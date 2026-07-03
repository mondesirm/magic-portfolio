import {
  Avatar,
  Column,
  Heading,
  HeadingNav,
  Line,
  Media,
  Meta,
  Row,
  Schema,
  SmartLink,
  Text,
} from "@once-ui-system/core";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CustomMDX, ScrollToHash } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { ShareSection } from "@/components/blog/ShareSection";
import { routing } from "@/i18n/routing";
import { author, baseURL, renderContent } from "@/resources";
import type { PageProps, Params } from "@/types";
import { formatDate } from "@/utils/formatDate";
import { getPosts } from "@/utils/utils";

export async function generateStaticParams(): Promise<Params[]> {
  const { locales } = routing;

  return locales.flatMap((locale) =>
    getPosts(["src", "app", "[locale]", "blog", "posts", locale]).map((post) => ({
      locale,
      slug: post.slug,
    })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const path = Array.isArray(slug) ? slug.join("/") : slug || "";

  const post = getPosts(["src", "app", "[locale]", "blog", "posts", locale]).find(
    (post) => post.slug === path,
  );

  if (!post) return {};

  const t = await getTranslations();
  const { blog } = renderContent(t);

  return Meta.generate({
    baseURL: `${baseURL}/${locale}`,
    path: `${blog.path}/${post.slug}`,
    image: post.metadata.image || `/api/og/generate?title=${post.metadata.title}`,
    title: post.metadata.title,
    description: post.metadata.summary,
  });
}

export default async function Post({ params }: PageProps) {
  const { locale, slug } = await params;
  const path = Array.isArray(slug) ? slug.join("/") : slug || "";
  setRequestLocale(locale);

  const post = getPosts(["src", "app", "[locale]", "blog", "posts", locale]).find(
    (post) => post.slug === path,
  );

  if (!post) notFound();

  const t = await getTranslations();
  const { blog, person } = renderContent(t);

  return (
    <Row fillWidth>
      <Row maxWidth={12} m={{ hide: true }} />

      <Row fillWidth horizontal="center">
        <Column as="section" maxWidth="m" horizontal="center" gap="l" paddingTop="24">
          <Schema
            as="blogPosting"
            author={author(locale)}
            baseURL={`${baseURL}/${locale}`}
            path={`${blog.path}/${post.slug}`}
            image={
              post.metadata.image ||
              `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`
            }
            title={post.metadata.title}
            description={post.metadata.summary}
            datePublished={post.metadata.publishedAt}
            dateModified={post.metadata.publishedAt}
          />

          <Column maxWidth="s" gap="16" horizontal="center" align="center">
            <SmartLink href={`/${locale}${blog.path}`}>
              <Text variant="label-strong-m">{blog.label}</Text>
            </SmartLink>

            <Text variant="body-default-xs" onBackground="neutral-weak" marginBottom="12">
              {post.metadata.publishedAt && formatDate(post.metadata.publishedAt)}
            </Text>

            <Heading variant="display-strong-m">{post.metadata.title}</Heading>

            {post.metadata.subtitle && (
              <Text
                variant="body-default-l"
                onBackground="neutral-weak"
                align="center"
                style={{ fontStyle: "italic" }}
              >
                {post.metadata.subtitle}
              </Text>
            )}
          </Column>

          <Row marginBottom="32" horizontal="center">
            <Row gap="16" vertical="center">
              <Avatar size="s" src={person.avatar} />

              <Text variant="label-default-m" onBackground="brand-weak">
                {person.name}
              </Text>
            </Row>
          </Row>

          {post.metadata.image && (
            <Media
              src={post.metadata.image}
              alt={post.metadata.title}
              aspectRatio="16/9"
              priority
              sizes="(min-width: 768px) 100vw, 768px"
              border="neutral-alpha-weak"
              radius="l"
              marginTop="12"
              marginBottom="8"
            />
          )}

          <Column as="article" maxWidth="s">
            <CustomMDX source={post.content} />
          </Column>

          <ShareSection
            title={post.metadata.title}
            url={`${baseURL}/${locale}/${blog.path}/${post.slug}`}
          />

          <Column fillWidth gap="40" horizontal="center" marginTop="40">
            <Line maxWidth="40" />

            <Text as="h2" id="recent-posts" variant="heading-strong-xl" marginBottom="24">
              {blog.recent}
            </Text>

            <Posts
              exclude={[post.slug]}
              range={[1, 2]}
              columns="2"
              thumbnail
              direction="column"
              locale={locale}
            />
          </Column>

          <ScrollToHash />
        </Column>
      </Row>

      <Column
        maxWidth={12}
        paddingLeft="40"
        fitHeight
        position="sticky"
        top="80"
        gap="16"
        m={{ hide: true }}
      >
        <HeadingNav fitHeight />
      </Column>
    </Row>
  );
}
