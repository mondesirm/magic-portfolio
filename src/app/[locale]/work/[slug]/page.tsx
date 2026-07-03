import {
  AvatarGroup,
  Column,
  Heading,
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
import { Projects } from "@/components/work/Projects";
import { routing } from "@/i18n/routing";
import { author, baseURL, renderContent } from "@/resources";
import type { PageProps, Params } from "@/types";
import { formatDate } from "@/utils/formatDate";
import { getPosts } from "@/utils/utils";

export async function generateStaticParams(): Promise<Params[]> {
  const { locales } = routing;

  return locales.flatMap((locale) =>
    getPosts(["src", "app", "[locale]", "work", "projects", locale]).map((post) => ({
      locale,
      slug: post.slug,
    })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const path = Array.isArray(slug) ? slug.join("/") : slug || "";

  const post = getPosts(["src", "app", "[locale]", "work", "projects", locale]).find(
    (post) => post.slug === path,
  );

  if (!post) return {};

  const t = await getTranslations();
  const { work } = renderContent(t);

  return Meta.generate({
    baseURL: `${baseURL}/${locale}`,
    path: `${work.path}/${post.slug}`,
    image: post.metadata.image || `/api/og/generate?title=${post.metadata.title}`,
    title: post.metadata.title,
    description: post.metadata.summary,
  });
}

export default async function Project({ params }: PageProps) {
  const { locale, slug } = await params;
  const path = Array.isArray(slug) ? slug.join("/") : slug || "";
  setRequestLocale(locale);

  const post = getPosts(["src", "app", "[locale]", "work", "projects", locale]).find(
    (post) => post.slug === path,
  );

  if (!post) notFound();

  const t = await getTranslations();
  const { work } = renderContent(t);
  const avatars = post.metadata.team?.map((person) => ({ src: person.avatar })) || [];

  return (
    <Column as="section" maxWidth="m" horizontal="center" gap="l">
      <Schema
        as="blogPosting"
        author={author(locale)}
        baseURL={`${baseURL}/${locale}`}
        path={`${work.path}/${post.slug}`}
        image={
          post.metadata.image || `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`
        }
        title={post.metadata.title}
        description={post.metadata.summary}
        datePublished={post.metadata.publishedAt}
        dateModified={post.metadata.publishedAt}
      />

      <Column maxWidth="s" gap="16" horizontal="center" align="center">
        <SmartLink href={`${locale}/${work.path}`}>
          <Text variant="label-strong-m">{work.title}</Text>
        </SmartLink>

        <Text variant="body-default-xs" onBackground="neutral-weak" marginBottom="12">
          {post.metadata.publishedAt && formatDate(post.metadata.publishedAt)}
        </Text>

        <Heading variant="display-strong-m">{post.metadata.title}</Heading>
      </Column>

      <Row marginBottom="32" horizontal="center">
        <Row gap="16" vertical="center">
          {post.metadata.team && <AvatarGroup reverse avatars={avatars} size="s" />}

          <Text variant="label-default-m" onBackground="brand-weak">
            {post.metadata.team?.map((member, idx) => (
              <span key={member.name}>
                {idx > 0 && (
                  <Text as="span" onBackground="neutral-weak">
                    ,{" "}
                  </Text>
                )}

                <SmartLink href={member.linkedIn}>{member.name}</SmartLink>
              </span>
            ))}
          </Text>
        </Row>
      </Row>

      {post.metadata.images.length > 0 && (
        <Media priority aspectRatio="16 / 9" radius="m" alt="image" src={post.metadata.images[0]} />
      )}

      <Column style={{ margin: "auto" }} as="article" maxWidth="xs">
        <CustomMDX source={post.content} />
      </Column>

      <Column fillWidth gap="40" horizontal="center" marginTop="40">
        <Line maxWidth="40" />

        <Heading as="h2" variant="heading-strong-xl" marginBottom="24">
          {work.related}
        </Heading>

        <Projects exclude={[post.slug]} range={[2]} locale={locale} />
      </Column>

      <ScrollToHash />
    </Column>
  );
}
