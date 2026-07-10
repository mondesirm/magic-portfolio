import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";
import { i18nOptions } from "@/resources";

export const routing = defineRouting({
  locales: i18nOptions.locales,
  defaultLocale: i18nOptions.defaultLocale,
  pathnames: {
    "/": "/",
    "/about": {
      fr: "/a-propos",
    },
    "/work/[[...slug]]": {
      fr: "/projets/[[...slug]]",
    },
    "/blog": "/blog",
    "/gallery": {
      fr: "/gallerie",
    },
  },
});

export type Locale = (typeof routing.locales)[number];

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
