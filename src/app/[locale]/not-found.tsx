import { Column, Heading, Text } from "@once-ui-system/core";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { i18nOptions } from "@/resources";
import type { PageProps } from "@/types";

export default async function NotFound({ params }: PageProps) {
  const { locale = i18nOptions.defaultLocale } = (await params) || {};
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <Column as="section" fill center paddingBottom="160">
      <Text marginBottom="s" variant="display-strong-xl">
        404
      </Text>

      <Heading marginBottom="l" variant="display-default-xs">
        {t("404.title")}
      </Heading>

      <Text onBackground="neutral-weak">{t("404.description")}</Text>
    </Column>
  );
}
