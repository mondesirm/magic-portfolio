import {
  Avatar,
  Badge,
  Button,
  Column,
  Heading,
  Line,
  Meta,
  Pulse,
  RevealFx,
  Row,
  Schema,
  Text,
} from "@once-ui-system/core";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { BookingHoverCards } from "@/components/booking/BookingHoverCards";
import { BookingSection } from "@/components/booking/BookingList";
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
  const { about, booking, home, newsletter, person } = renderContent(t);

  return (
    <Column gap="xl" maxWidth="m">
      <Schema as="webPage" author={author(locale)} baseURL={`${baseURL}/${locale}`} {...home} />

      <Column center>
        <Column maxWidth="s" align="center">
          {home.featured.display && (
            <RevealFx center fillWidth paddingY="32">
              <Badge
                paddingX="8"
                paddingY="4"
                background="brand-alpha-weak"
                onBackground="neutral-strong"
                textVariant="label-default-s"
                href={`/${locale}${home.featured.href}`}
              >
                <Pulse size="s" />

                <Row paddingY="2" marginLeft="4">
                  {home.featured.title}
                </Row>
              </Badge>
            </RevealFx>
          )}

          <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="16">
            <Heading wrap="balance" variant="display-strong-l">
              {home.headline}
            </Heading>
          </RevealFx>

          <RevealFx delay={0.2} translateY="8" fillWidth horizontal="center" paddingBottom="32">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
              {home.subline}
            </Text>
          </RevealFx>

          <RevealFx delay={0.4} paddingTop="12" horizontal="center" paddingLeft="12">
            <Row gap="12" wrap horizontal="center" vertical="center">
              <Button
                id={about.label}
                data-border="rounded"
                href={`/${locale}${about.path}`}
                variant="secondary"
                size="m"
                weight="default"
                arrowIcon
              >
                <Row gap="8" vertical="center" paddingRight="4">
                  {about.avatar.display && (
                    <Avatar
                      src={person.avatar}
                      size="m"
                      marginRight="8"
                      style={{ marginLeft: "-0.75rem" }}
                    />
                  )}

                  {about.title}
                </Row>
              </Button>

              <Button
                id={booking.label}
                arrowIcon
                size="m"
                variant="primary"
                weight="default"
                data-border="rounded"
                href={`/${locale}${booking.path}`}
              >
                {booking.cta}
              </Button>
            </Row>
          </RevealFx>
        </Column>
      </Column>

      <RevealFx delay={0.4} translateY={8}>
        <BookingSection cards={booking.cards} />
      </RevealFx>

      {/* <RevealFx delay={0.4} translateY={8} center>
        <BookingHoverCards cards={booking.cards} />
      </RevealFx> */}

      <RevealFx delay={0.6} translateY={8}>
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
      {/* <Mailchimp newsletter={newsletter} /> */}
    </Column>
  );
}
