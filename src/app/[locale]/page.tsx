import {
  Avatar,
  Badge,
  Button,
  Column,
  Heading,
  Line,
  Meta,
  RevealFx,
  Row,
  Schema,
  Text,
} from "@once-ui-system/core";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { Projects } from "@/components/work/Projects";
import { author, baseURL, renderContent, routes } from "@/resources";
import type { PageProps } from "@/types";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations();
  const { home } = renderContent(t);

  return Meta.generate({ ...home, baseURL: `${baseURL}/${locale}` });
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const { about, home, newsletter, person } = renderContent(t);

  return (
    <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
      <Schema {...home} as="webPage" author={author(locale)} baseURL={`${baseURL}/${locale}`} />

      <Column fillWidth horizontal="center" gap="m">
        <Column maxWidth="s" horizontal="center" align="center">
          {home.featured.display && (
            <RevealFx
              fillWidth
              horizontal="center"
              paddingTop="16"
              paddingBottom="32"
              paddingLeft="12"
            >
              <Badge
                background="brand-alpha-weak"
                paddingX="12"
                paddingY="4"
                onBackground="neutral-strong"
                textVariant="label-default-s"
                arrow={false}
                href={`/${locale}/${home.featured.href}`}
              >
                <Row paddingY="2">{home.featured.title}</Row>
              </Badge>
            </RevealFx>
          )}

          <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="16">
            <Heading wrap="balance" variant="display-strong-l">
              {home.headline}
            </Heading>
          </RevealFx>

          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center" paddingBottom="32">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
              {home.subline}
            </Text>
          </RevealFx>

          <RevealFx paddingTop="12" delay={0.4} horizontal="center" paddingLeft="12">
            <Button
              id="about"
              data-border="rounded"
              href={`/${locale}/${about.path}`}
              variant="secondary"
              size="m"
              weight="default"
              arrowIcon
            >
              <Row gap="8" vertical="center" paddingRight="4">
                {about.avatar.display && (
                  <Avatar
                    marginRight="8"
                    style={{ marginLeft: "-0.75rem" }}
                    src={person.avatar}
                    size="m"
                  />
                )}

                {about.title}
              </Row>
            </Button>
          </RevealFx>
        </Column>
      </Column>

      <RevealFx translateY="16" delay={0.6}>
        <Projects range={[1, 1]} locale={locale} />
      </RevealFx>

      {routes["/blog"] && (
        <Column fillWidth gap="24" marginBottom="l">
          <Row fillWidth paddingRight="64">
            <Line maxWidth={48} />
          </Row>

          <Row fillWidth gap="24" marginTop="40" s={{ direction: "column" }}>
            <Row flex={1} paddingLeft="l" paddingTop="24">
              <Heading as="h2" variant="display-strong-xs" wrap="balance">
                {home.latest}
              </Heading>
            </Row>

            <Row flex={3} paddingX="20">
              <Posts range={[1, 2]} columns="2" locale={locale} />
            </Row>
          </Row>

          <Row fillWidth paddingLeft="64" horizontal="end">
            <Line maxWidth={48} />
          </Row>
        </Column>
      )}

      <Projects range={[2]} locale={locale} />
      <Mailchimp newsletter={newsletter} />
    </Column>
  );
}
