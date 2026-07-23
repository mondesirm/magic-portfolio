import {
  Avatar,
  Badge,
  Button,
  Column,
  Heading,
  Icon,
  IconButton,
  Media,
  Meta,
  Pulse,
  Row,
  Schema,
  Tag,
  Text,
  Timeline,
} from "@once-ui-system/core";
import type { Metadata } from "next";
import type { DateTimeFormatOptions } from "next-intl";
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
  const t = await getTranslations();
  const format = await getFormatter();
  const { about, booking, person, social } = renderContent(t);

  const structure = [
    { title: about.intro.title, display: about.intro.display },
    {
      title: about.work.title,
      display: about.work.display,
      items: about.work.experiences.map((experience) => experience.role),
    },
    {
      title: about.studies.title,
      display: about.studies.display,
      items: about.studies.courses.map((course) => course.degree),
    },
    {
      title: about.skills.title,
      display: about.skills.display,
      items: about.skills.categories.map((category) => category.title),
    },
  ];

  const experienceOptions: DateTimeFormatOptions = { year: "numeric", month: "short" };
  const courseOptions: DateTimeFormatOptions = { year: "numeric" };

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

      <Row fillWidth s={{ direction: "column" }}>
        {about.avatar.display && (
          <Column
            fitHeight
            gap="m"
            top="64"
            flex={3}
            minWidth="160"
            paddingX="l"
            paddingBottom="xl"
            horizontal="center"
            position="sticky"
            className={styles.avatar}
            s={{ position: "relative", style: { top: "auto" } }}
            xs={{ style: { top: "auto" } }}
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

        <Column flex={9}>
          <Column
            id={about.intro.title}
            fillWidth
            minHeight="160"
            marginBottom="32"
            s={{ horizontal: "center" }}
          >
            {about.calendar.display && (
              <Badge
                gap="8"
                marginBottom="m"
                background="brand-alpha-weak"
                // className={styles.blockAlign}
                href={`/${locale}${booking.path}`}
                // s={{ style: { alignSelf: "center" } }}
              >
                <Pulse size="s" />
                {/* <Icon name="calendar" size="s" onBackground="brand-weak" /> */}
                {about.calendar.title}
              </Badge>
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
                wrap
                fitWidth
                paddingTop="20"
                paddingBottom="8"
                gap="8"
                horizontal="center"
                data-border="rounded"
                className={styles.blockAlign}
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
            <Column fillWidth textVariant="body-default-l" gap="m" marginBottom="xl">
              {about.intro.description}
            </Column>
          )}

          {about.work.display && (
            <>
              <Heading as="h2" id={about.work.title} variant="display-strong-s" marginBottom="m">
                {about.work.title}
              </Heading>

              <Timeline
                items={about.work.experiences.map((experience, i) => ({
                  state: i === 0 ? "active" : "success",
                  marker: i !== 0 && <Icon name="check" size="xl" onBackground="accent-strong" />,
                  label: (
                    <Row wrap fillWidth horizontal="between" vertical="center">
                      <Text id={experience.role} variant="heading-strong-l">
                        {experience.role}
                      </Text>

                      <Text variant="heading-default-xs" onBackground="neutral-weak">
                        {format.dateTime(new Date(experience.timeframe[0]), experienceOptions)} →{" "}
                        {format.dateTime(new Date(experience.timeframe[1]), experienceOptions)}
                      </Text>
                    </Row>
                  ),
                  description: experience.company,
                  children: !!experience.achievements?.length && (
                    <>
                      <Column as="ul" gap="16">
                        {experience.achievements?.map((achievement, j) => (
                          <Text
                            as="li"
                            variant="body-default-m"
                            // biome-ignore lint/suspicious/noArrayIndexKey: static list
                            key={`${experience.company}-${j}`}
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
                              height={image.height}
                              minWidth={image.width}
                              radius="m"
                              border="neutral-medium"
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
                    </>
                  ),
                }))}
              />
            </>
          )}

          {about.studies.display && (
            <>
              <Heading as="h2" id={about.studies.title} variant="display-strong-s" marginBottom="m">
                {about.studies.title}
              </Heading>

              <Timeline
                items={about.studies.courses.map((course, i) => ({
                  state: i === 0 ? "active" : "success",
                  marker: i !== 0 && <Icon name="check" size="xl" onBackground="accent-strong" />,
                  label: (
                    <Row wrap fillWidth horizontal="between" vertical="center">
                      <Text id={course.degree} variant="heading-strong-l">
                        {course.degree}
                      </Text>

                      <Text variant="heading-default-xs" onBackground="neutral-weak">
                        {format.dateTime(new Date(course.timeframe[0]), courseOptions)} →{" "}
                        {format.dateTime(new Date(course.timeframe[1]), courseOptions)}
                      </Text>
                    </Row>
                  ),
                  description: course.school,
                  children: !!course.achievements?.length && (
                    <Column as="ul" gap="16">
                      {course.achievements?.map((achievement, j) => (
                        <Text
                          as="li"
                          variant="body-default-m"
                          // biome-ignore lint/suspicious/noArrayIndexKey: static list
                          key={`${course.school}-${j}`}
                        >
                          {achievement}
                        </Text>
                      ))}
                    </Column>
                  ),
                }))}
              />
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
