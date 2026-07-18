import { Column, Heading, Meta, RevealFx, Schema, Text } from "@once-ui-system/core";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BookingSection } from "@/components/booking/BookingList";
import { author, baseURL, renderContent } from "@/resources";
import type { PageProps } from "@/types";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations();
  const { booking } = renderContent(t);

  return Meta.generate({ ...booking, baseURL: `${baseURL}/${locale}` });
}

export default async function BookPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const { booking } = renderContent(t);

  return (
    <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
      <Schema {...booking} as="webPage" author={author(locale)} baseURL={`${baseURL}/${locale}`} />

      <Column fillWidth maxWidth="s" gap="16" horizontal="center" align="center">
        <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="16">
          <Heading wrap="balance" variant="display-strong-l">
            {booking.title}
          </Heading>
        </RevealFx>

        <RevealFx delay={0.2} translateY="8" fillWidth horizontal="center" paddingBottom="32">
          <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
            {booking.description}
          </Text>
        </RevealFx>
      </Column>

      <RevealFx delay={0.4} translateY={8}>
        <BookingSection cards={booking.cards} />
      </RevealFx>
    </Column>
  );
}
