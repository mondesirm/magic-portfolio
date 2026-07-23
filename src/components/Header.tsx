"use client";

import {
  Fade,
  Flex,
  IconButton,
  Row,
  ScrollToTop,
  SegmentedControl,
  ToggleButton,
} from "@once-ui-system/core";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState, useTransition } from "react";
import { routing, usePathname, useRouter } from "@/i18n/routing";
import { display, i18n, renderContent, routes } from "@/resources";
import styles from "./Header.module.scss";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [time, setTime] = useState("");
  const { locale } = useParams<{ locale: string }>();
  const [isPending, startTransition] = useTransition();

  const t = useTranslations();
  const { person, about, blog, booking, work, gallery } = renderContent(t);

  const onToggle = (locale: string) => startTransition(() => router.replace(pathname, { locale }));

  useEffect(() => {
    const tick = () => {
      const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: person.location,
        hour12: locale.startsWith("en"),
      };

      setTime(new Intl.DateTimeFormat(locale, options).format(new Date()));
    };

    tick();

    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [locale, person.location]);

  return (
    <>
      <Fade position="fixed" height="80" zIndex={1} top="0" />
      <Fade position="fixed" height="80" zIndex={1} bottom="0" to="top" />

      <Row
        as="header"
        fillWidth
        fitHeight
        padding="8"
        position="sticky"
        zIndex={1}
        data-border="rounded"
        className={styles.position}
        s={{ position: "fixed" }}
      >
        <Row fillWidth paddingLeft="12" vertical="center" textVariant="body-default-s">
          {display.location && <Row s={{ hide: true }}>{person.location}</Row>}
        </Row>

        <ScrollToTop background="page" bottom="32" radius="full" s={{ hide: true }}>
          <IconButton size="l" variant="secondary" icon="chevronUp" />
        </ScrollToTop>

        <Row
          gap="4"
          background="page"
          border="neutral-alpha-weak"
          textVariant="body-default-s"
          vertical="center"
          padding="4"
          radius="m-4"
          shadow="l"
          zIndex={1}
        >
          {routes["/"] && (
            <ToggleButton prefixIcon="home" href={`/${locale}`} selected={pathname === "/"} />
          )}

          {routes["/about"] && (
            <>
              <Row s={{ hide: true }}>
                <ToggleButton
                  prefixIcon="person"
                  label={about.label}
                  href={`/${locale}/about`}
                  selected={pathname === "/about"}
                />
              </Row>

              <Row hide s={{ hide: false }}>
                <ToggleButton
                  prefixIcon="person"
                  href={`/${locale}/about`}
                  selected={pathname === "/about"}
                />
              </Row>
            </>
          )}

          {routes["/book"] && (
            <>
              <Row s={{ hide: true }}>
                <ToggleButton
                  prefixIcon="calendar"
                  label={booking.label}
                  href={`/${locale}/book`}
                  selected={pathname.startsWith("/book")}
                />
              </Row>

              <Row hide s={{ hide: false }}>
                <ToggleButton
                  prefixIcon="calendar"
                  href={`/${locale}/book`}
                  selected={pathname.startsWith("/book")}
                />
              </Row>
            </>
          )}

          {routes["/work"] && (
            <>
              <Row s={{ hide: true }}>
                <ToggleButton
                  prefixIcon="grid"
                  label={work.label}
                  href={`/${locale}/work`}
                  selected={pathname.startsWith("/work")}
                />
              </Row>

              <Row hide s={{ hide: false }}>
                <ToggleButton
                  prefixIcon="grid"
                  href={`/${locale}/work`}
                  selected={pathname.startsWith("/work")}
                />
              </Row>
            </>
          )}

          {routes["/blog"] && (
            <>
              <Row s={{ hide: true }}>
                <ToggleButton
                  prefixIcon="book"
                  label={blog.label}
                  href={`/${locale}/blog`}
                  selected={pathname.startsWith("/blog")}
                />
              </Row>

              <Row hide s={{ hide: false }}>
                <ToggleButton
                  prefixIcon="book"
                  href={`/${locale}/blog`}
                  selected={pathname.startsWith("/blog")}
                />
              </Row>
            </>
          )}

          {routes["/gallery"] && (
            <>
              <Row s={{ hide: true }}>
                <ToggleButton
                  prefixIcon="gallery"
                  label={gallery.label}
                  href={`/${locale}/gallery`}
                  selected={pathname.startsWith("/gallery")}
                />
              </Row>

              <Row hide s={{ hide: false }}>
                <ToggleButton
                  prefixIcon="gallery"
                  href={`/${locale}/gallery`}
                  selected={pathname.startsWith("/gallery")}
                />
              </Row>
            </>
          )}

          {display.themeSwitcher && <ThemeToggle />}
        </Row>

        <Flex
          fillWidth
          gap="20"
          paddingRight="12"
          horizontal="end"
          vertical="center"
          textVariant="body-default-s"
        >
          {i18n && routing.locales.length > 1 && (
            <Row
              gap="2"
              shadow="l"
              padding="4"
              radius="m-4"
              background="page"
              horizontal="center"
              border="neutral-alpha-weak"
            >
              <SegmentedControl
                compact
                selected={locale}
                buttons={routing.locales.map((value) => ({
                  value,
                  label: value.toUpperCase(),
                }))}
                onToggle={onToggle}
                className={(isPending && "pointer-events-none opacity-60") || ""}
              />
            </Row>
          )}

          {display.time && <Flex m={{ hide: true }}>{time}</Flex>}
        </Flex>
      </Row>
    </>
  );
}
