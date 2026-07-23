"use client";

import { IconButton, Row, SmartLink, Text } from "@once-ui-system/core";
import { useTranslations } from "next-intl";
import { renderContent } from "@/resources";
import styles from "./Footer.module.scss";

export const Footer = () => {
  const t = useTranslations();
  const { person, social } = renderContent(t);

  return (
    <Row
      as="footer"
      fillWidth
      gap="16"
      zIndex={1}
      maxWidth="m"
      paddingX="24"
      paddingY="16"
      horizontal="between"
      vertical="center"
      className={styles.mobile}
      s={{ direction: "column-reverse", style: { paddingBottom: "96px" } }}
    >
      <Text variant="body-default-s" onBackground="neutral-strong">
        <Text onBackground="neutral-weak">© {new Date().getFullYear()} /</Text>
        <Text paddingX="4">{person.name}</Text>

        <Text onBackground="neutral-weak">
          {/* Usage of this template requires attribution. Please don't remove the link to Once UI unless you have a Pro license. */}
          / <SmartLink href="https://github.com/mondesirm/magic-portfolio">Portfolio</SmartLink>{" "}
          {t("footer.builtWith")}{" "}
          <SmartLink href="https://once-ui.com/products/magic-portfolio">Once UI</SmartLink>
        </Text>
      </Text>

      <Row gap="16">
        {social.map(
          ({ name, link, icon }) =>
            link && (
              <IconButton key={name} href={link} icon={icon} tooltip={name} variant="ghost" />
            ),
        )}
      </Row>
    </Row>
  );
};
