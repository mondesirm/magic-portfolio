import {
  Avatar,
  Button,
  Column,
  Heading,
  Icon,
  IconButton,
  Media,
  Meta,
  Row,
  Schema,
  Tag,
  Text,
} from "@once-ui-system/core";
import type { Metadata } from "next";
import { getFormatter, getTranslations, setRequestLocale } from "next-intl/server";
import React from "react";
import styles from "@/components/about/about.module.scss";
import TableOfContents from "@/components/about/TableOfContents";
import { author, baseURL, renderContent } from "@/resources";
import type { PageProps } from "@/types";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations();
  const { about } = renderContent(t);

  return Meta.generate({ ...about, baseURL: `${baseURL}/${locale}` });
}

export default async function About({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const format = await getFormatter();
  const t = await getTranslations();
  const { about, person, social } = renderContent(t);

  const structure = [
    {
      title: about.intro.title,
      display: about.intro.display,
      items: [],
    },
    {
      title: about.work.title,
      display: about.work.display,
      items: about.work.experiences.map((experience) => experience.company),
    },
    {
      title: about.studies.title,
      display: about.studies.display,
      items: about.studies.institutions.map((institution) => institution.name),
    },
    {
      title: about.skills.title,
      display: about.skills.display,
      items: about.skills.categories.map((category) => category.title),
    },
  ];

  return (
    <Column maxWidth="m">
      <Schema
        {...about}
        as="webPage"
        author={author(locale)}
        baseURL={`${baseURL}/${locale}`}
        sameAs={social
          .filter((item) => item.link && !item.link.startsWith("mailto:")) // Filter out empty links and email links
          .map((item) => item.link)}
      />

      {about.tableOfContent.display && (
        <Column
          left="0"
          style={{ top: "50%", transform: "translateY(-50%)" }}
          position="fixed"
          paddingLeft="24"
          gap="32"
          s={{ hide: true }}
        >
          <TableOfContents {...{ structure, about }} />
        </Column>
      )}

      <Row fillWidth s={{ direction: "column" }} horizontal="center">
        {about.avatar.display && (
          <Column
            className={styles.avatar}
            top="64"
            fitHeight
            position="sticky"
            s={{ position: "relative", style: { top: "auto" } }}
            xs={{ style: { top: "auto" } }}
            minWidth="160"
            paddingX="l"
            paddingBottom="xl"
            gap="m"
            flex={3}
            horizontal="center"
          >
            <Avatar src={person.avatar} size="xl" />

            <Row gap="8" vertical="center">
              <Icon onBackground="accent-weak" name="globe" />
              {person.location}
            </Row>

            {person.languages && person.languages.length > 0 && (
              <Row wrap gap="8">
                {person.languages.map((language) => (
                  <Tag key={language} size="l">
                    {format.displayName(language, { type: "language" })}
                  </Tag>
                ))}
              </Row>
            )}
          </Column>
        )}

        <Column className={styles.blockAlign} flex={9} maxWidth={40}>
          <Column
            id={about.intro.title}
            fillWidth
            minHeight="160"
            vertical="center"
            marginBottom="32"
          >
            {about.calendar.display && (
              <Row
                fitWidth
                border="brand-alpha-medium"
                background="brand-alpha-weak"
                radius="full"
                padding="4"
                gap="8"
                marginBottom="m"
                vertical="center"
                className={styles.blockAlign}
                style={{
                  backdropFilter: "blur(var(--static-space-1))",
                }}
              >
                <Icon paddingLeft="12" name="calendar" onBackground="brand-weak" />
                <Row paddingX="8">{about.calendar.title}</Row>

                <IconButton
                  href={about.calendar.link}
                  data-border="rounded"
                  variant="secondary"
                  icon="chevronRight"
                />
              </Row>
            )}

            <Heading className={styles.textAlign} variant="display-strong-xl">
              {person.name}
            </Heading>

            <Text
              className={styles.textAlign}
              variant="display-default-xs"
              onBackground="neutral-weak"
            >
              {person.role}
            </Text>

            {social.length > 0 && (
              <Row
                className={styles.blockAlign}
                paddingTop="20"
                paddingBottom="8"
                gap="8"
                wrap
                horizontal="center"
                fitWidth
                data-border="rounded"
              >
                {social
                  .filter((item) => item.essential)
                  .map(
                    (item) =>
                      item.link && (
                        <React.Fragment key={item.name}>
                          <Row s={{ hide: true }}>
                            <Button
                              key={item.name}
                              href={item.link}
                              prefixIcon={item.icon}
                              label={item.name}
                              size="s"
                              weight="default"
                              variant="secondary"
                            />
                          </Row>

                          <Row hide s={{ hide: false }}>
                            <IconButton
                              size="l"
                              key={`${item.name}-icon`}
                              href={item.link}
                              icon={item.icon}
                              variant="secondary"
                            />
                          </Row>
                        </React.Fragment>
                      ),
                  )}
              </Row>
            )}
          </Column>

          {about.intro.display && (
            <Column textVariant="body-default-l" fillWidth gap="m" marginBottom="xl">
              {about.intro.description}
            </Column>
          )}

          {about.work.display && (
            <>
              <Heading as="h2" id={about.work.title} variant="display-strong-s" marginBottom="m">
                {about.work.title}
              </Heading>

              <Column fillWidth gap="l" marginBottom="40">
                {about.work.experiences.map((experience) => (
                  <Column key={`${experience.company}-${experience.role}`} fillWidth>
                    <Row fillWidth horizontal="between" vertical="end" marginBottom="4">
                      <Text id={experience.company} variant="heading-strong-l">
                        {experience.company}
                      </Text>

                      <Text variant="heading-default-xs" onBackground="neutral-weak">
                        {experience.timeframe}
                      </Text>
                    </Row>

                    <Text variant="body-default-s" onBackground="brand-weak" marginBottom="m">
                      {experience.role}
                    </Text>

                    <Column as="ul" gap="16">
                      {experience.achievements.map((achievement, index) => (
                        <Text
                          as="li"
                          variant="body-default-m"
                          // biome-ignore lint/suspicious/noArrayIndexKey: static list
                          key={`${experience.company}-${index}`}
                        >
                          {achievement}
                        </Text>
                      ))}
                    </Column>

                    {experience.images && experience.images.length > 0 && (
                      <Row fillWidth paddingTop="m" paddingLeft="40" gap="12" wrap>
                        {experience.images.map((image, index) => (
                          <Row
                            // biome-ignore lint/suspicious/noArrayIndexKey: static list
                            key={index}
                            border="neutral-medium"
                            radius="m"
                            minWidth={image.width}
                            height={image.height}
                          >
                            <Media
                              enlarge
                              radius="m"
                              sizes={image.width.toString()}
                              alt={image.alt}
                              src={image.src}
                            />
                          </Row>
                        ))}
                      </Row>
                    )}
                  </Column>
                ))}
              </Column>
            </>
          )}

          {about.studies.display && (
            <>
              <Heading as="h2" id={about.studies.title} variant="display-strong-s" marginBottom="m">
                {about.studies.title}
              </Heading>

              <Column fillWidth gap="l" marginBottom="40">
                {about.studies.institutions.map((institution) => (
                  <Column key={institution.name} fillWidth gap="4">
                    <Text id={institution.name} variant="heading-strong-l">
                      {institution.name}
                    </Text>

                    <Text variant="heading-default-xs" onBackground="neutral-weak">
                      {institution.description}
                    </Text>
                  </Column>
                ))}
              </Column>
            </>
          )}

          {about.skills.display && (
            <>
              <Heading as="h2" id={about.skills.title} variant="display-strong-s" marginBottom="40">
                {about.skills.title}
              </Heading>

              <Column fillWidth gap="l">
                {about.skills.categories.map((category) => (
                  <Column key={category.title} fillWidth gap="4">
                    <Text id={category.title} variant="heading-strong-l">
                      {category.title}
                    </Text>

                    <Text variant="body-default-m" onBackground="neutral-weak">
                      {category.description}
                    </Text>

                    {category.tags && category.tags.length > 0 && (
                      <Row wrap gap="8" paddingTop="8">
                        {category.tags.map((tag) => (
                          <Tag key={`${category.title}-${tag.name}`} size="l" prefixIcon={tag.icon}>
                            {tag.name}
                          </Tag>
                        ))}
                      </Row>
                    )}

                    {category.images && category.images.length > 0 && (
                      <Row fillWidth paddingTop="m" gap="12" wrap>
                        {category.images.map((image, index) => (
                          <Row
                            // biome-ignore lint/suspicious/noArrayIndexKey: static list
                            key={index}
                            border="neutral-medium"
                            radius="m"
                            minWidth={image.width}
                            height={image.height}
                          >
                            <Media
                              enlarge
                              radius="m"
                              sizes={image.width.toString()}
                              alt={image.alt}
                              src={image.src}
                            />
                          </Row>
                        ))}
                      </Row>
                    )}
                  </Column>
                ))}
              </Column>
            </>
          )}
        </Column>
      </Row>
    </Column>
  );
}
