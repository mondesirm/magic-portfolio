import type { getTranslations } from "next-intl/server";
import { about, blog, gallery, home, newsletter, person, social, work } from "./content";
import { createI18nContent } from "./content-i18n";
import { i18n } from "./once-ui.config";

const renderContent = (t: Awaited<ReturnType<typeof getTranslations>>) => {
  if (i18n) {
    return createI18nContent(t);
  } else {
    return {
      person,
      social,
      newsletter,
      home,
      about,
      blog,
      work,
      gallery,
    };
  }
};

export { renderContent };
