import { Line, Row, Text } from "@once-ui-system/core";
import type { getTranslations } from "next-intl/server";
import { RichText } from "@/components/RichText";
import type { About, Blog, Book, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";

const createI18nContent = (t: Awaited<ReturnType<typeof getTranslations>>) => {
  const person: Person = {
    firstName: "Malik",
    lastName: "MONDESIR",
    get name() {
      return `${this.firstName} ${this.lastName}`;
    },
    role: t("person.role"),
    avatar: "/images/avatar.jpg",
    email: "contact@mondesirm.me",
    location: "Europe/Paris", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
    languages: ["fr", "en"], // optional: Leave the array empty if you don't want to display languages
    locale: "en", // BCP 47 language tag for the HTML lang attribute, e.g., 'en', 'ja', 'zh-TW'
  };

  const newsletter: Newsletter = {
    display: true,
    title: <>{t("newsletter.title", { firstName: person.firstName })}</>,
    description: <>{t("newsletter.description")}</>,
    button: t("newsletter.button"),
  };

  const social: Social = [
    // Links are automatically displayed.
    // Import new icons in /once-ui/icons.ts
    // Set essentials: true for links you want to show on the about page
    {
      name: "GitHub",
      icon: "github",
      link: "https://github.com/mondesirm",
      essential: true,
    },
    {
      name: "LinkedIn",
      icon: "linkedin",
      link: "https://linkedin.com/in/mondesirm",
      essential: true,
    },
    {
      name: "Email",
      icon: "email",
      link: `mailto:${person.email}`,
      essential: true,
    },
  ];

  const home: Home = {
    path: "/",
    image: "/images/og/home.jpg",
    label: t("home.label"),
    title: t("home.title", { name: person.name }),
    description: t("home.description", { role: person.role }),
    headline: <RichText>{(tags) => t.rich("home.headline", tags)}</RichText>,
    featured: {
      display: true,
      title: (
        <Row gap="12" vertical="center">
          <strong className="ml-4">{t("home.featured.title")}</strong>{" "}
          <Line background="brand-alpha-strong" vert height="20" />
          <Text marginRight="4" onBackground="brand-medium">
            {t("home.featured.subtitle")}
          </Text>
        </Row>
      ),
      href: "/work/mixmassage.art",
    },
    subline: (
      <RichText>
        {(tags) =>
          t.rich("home.subline", { ...tags, firstName: person.firstName, role: person.role })
        }
      </RichText>
    ),
    latest: t("home.latest"),
  };

  const booking: Book = {
    path: "/book",
    image: "/images/og/home.jpg",
    label: t("book.label"),
    title: t("book.title", { name: person.name }),
    description: t("book.description", { name: person.name }),
    cta: t("book.cta"),
    section: {
      title: t("book.section.title"),
      description: <RichText>{(tags) => t.rich("book.section.description", tags)}</RichText>,
    },
    cards: [
      {
        title: t("book.cards.0.title"),
        description: <RichText>{(tags) => t.rich("book.cards.0.description", tags)}</RichText>,
        duration: t("book.cards.0.duration"),
        bestFor: t("book.cards.0.bestFor"),
        href: "https://cal.eu/mondesirm/discovery-call",
      },
      {
        title: t("book.cards.1.title"),
        description: <RichText>{(tags) => t.rich("book.cards.1.description", tags)}</RichText>,
        duration: t("book.cards.1.duration"),
        bestFor: t("book.cards.1.bestFor"),
        href: "https://cal.eu/mondesirm/project-scoping-call",
      },
      {
        title: t("book.cards.2.title"),
        description: <RichText>{(tags) => t.rich("book.cards.2.description", tags)}</RichText>,
        duration: t("book.cards.2.duration"),
        bestFor: t("book.cards.2.bestFor"),
        href: "https://cal.eu/mondesirm/automation-crm-audit",
      },
    ],
  };

  const about: About = {
    path: "/about",
    get image() {
      return `/api/og/generate?title=${encodeURIComponent(this.title)}`;
    },
    label: t("about.label"),
    title: t("about.title", { name: person.name }),
    description: t("about.description", {
      name: person.name,
      role: person.role,
      location: person.location.split("/")[1]?.replace("_", " "),
    }),
    tableOfContent: {
      display: true,
      subItems: true,
    },
    avatar: {
      display: true,
    },
    calendar: {
      display: true,
      title: t("about.calendar.title"),
    },
    intro: {
      display: true,
      title: t("about.intro.title"),
      description: (
        <RichText>
          {(tags) =>
            t.rich("about.intro.description", {
              ...tags,
              firstName: person.firstName,
              location: person.location.split("/")[1]?.replace("_", " "),
              role: person.role,
            })
          }
        </RichText>
      ),
    },
    work: {
      display: true, // set to false to hide this section
      title: t("about.work.title"),
      experiences: [
        {
          timeframe: ["2023/08", new Date()],
          company: "MALIK MONDESIR (EI) · Drancy (93)",
          role: t("about.work.experiences.0.role"),
          achievements: Array.from({ length: 5 }, (_, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static list
            <RichText key={index}>
              {(tags) => t.rich(`about.work.experiences.0.achievements.${index}`, tags)}
            </RichText>
          )),
          images: [
            // optional: leave the array empty if you don't want to display images
            {
              src: "/images/projects/mixmassage.art/logo.png",
              alt: "Mix Massage Art",
              width: 3,
              height: 3,
            },
          ],
        },
        {
          company: "Hackers Corporation · Paris 12e",
          timeframe: ["2021/09", "2023/06"],
          role: t("about.work.experiences.1.role"),
          achievements: Array.from({ length: 7 }, (_, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static list
            <RichText key={index}>
              {(tags) => t.rich(`about.work.experiences.1.achievements.${index}`, tags)}
            </RichText>
          )),
          images: [],
        },
        {
          company: "Hackers Corporation · Paris 12e",
          timeframe: ["2021/04", "2021/09"],
          role: t("about.work.experiences.2.role"),
          achievements: Array.from({ length: 4 }, (_, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static list
            <RichText key={index}>
              {(tags) => t.rich(`about.work.experiences.2.achievements.${index}`, tags)}
            </RichText>
          )),
          images: [],
        },
        {
          company: "Hub One · Roissy Charles de Gaulle",
          timeframe: ["2020/01", "2020/08"],
          role: t("about.work.experiences.3.role"),
          achievements: Array.from({ length: 3 }, (_, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static list
            <RichText key={index}>
              {(tags) => t.rich(`about.work.experiences.3.achievements.${index}`, tags)}
            </RichText>
          )),
          images: [],
        },
      ],
    },
    studies: {
      display: true, // set to false to hide this section
      title: t("about.studies.title"),
      courses: [
        {
          timeframe: ["2026", "2027"],
          school: "École Decode · Paris 11e",
          degree: t("about.studies.courses.0.degree"),
          achievements: Array.from({ length: 0 }, (_, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static list
            <RichText key={index}>
              {(tags) => t.rich(`about.studies.courses.0.achievements.${index}`, tags)}
            </RichText>
          )),
        },
        {
          timeframe: ["2020", "2023"],
          school: "École Supérieure du Génie Informatique · Paris 12e",
          degree: t("about.studies.courses.1.degree"),
          achievements: Array.from({ length: 3 }, (_, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static list
            <RichText key={index}>
              {(tags) => t.rich(`about.studies.courses.1.achievements.${index}`, tags)}
            </RichText>
          )),
        },
        {
          timeframe: ["2016", "2020"],
          school: "Lycée et UFA Robert Schuman · Dugny (93)",
          degree: t("about.studies.courses.2.degree"),
          achievements: Array.from({ length: 1 }, (_, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static list
            <RichText key={index}>
              {(tags) => t.rich(`about.studies.courses.2.achievements.${index}`, tags)}
            </RichText>
          )),
        },
      ],
    },
    skills: {
      display: true, // set to false to hide this section
      title: t("about.skills.title"),
      categories: [
        {
          title: t("about.skills.technical.title"),
          description: (
            <RichText>{(tags) => t.rich("about.skills.technical.description", tags)}</RichText>
          ),
          tags: [
            { name: "TypeScript", icon: "typescript" },
            { name: "Next.js", icon: "nextjs" },
            { name: "Prisma", icon: "prisma" },
          ],
          // optional: leave the array empty if you don't want to display images
          images: [],
        },
        {
          title: t("about.skills.visual.title"),
          description: (
            <RichText>{(tags) => t.rich("about.skills.visual.description", tags)}</RichText>
          ), // "." not accepted in next-intl namespace
          tags: [
            { name: "Canva", icon: "canva" },
            { name: "Figma", icon: "figma" },
          ],
          // optional: leave the array empty if you don't want to display images
          images: [
            {
              src: "/images/projects/mixmassage.art/cover.gif",
              alt: "Mix Massage Art",
              width: 16,
              height: 9,
            },
          ],
        },
      ],
    },
  };

  const work: Work = {
    path: "/work",
    get image() {
      return `/api/og/generate?title=${encodeURIComponent(this.title)}`;
    },
    label: t("work.label"),
    title: t("work.title", { name: person.name }),
    description: t("work.description", { name: person.name }),
    related: t("work.related"),
    // Create new project pages by adding a new .mdx file to app/[locale]/blog/posts
    // All projects will be listed on the /home and /work routes
  };

  const blog: Blog = {
    path: "/blog",
    get image() {
      return `/api/og/generate?title=${encodeURIComponent(this.title)}`;
    },
    label: t("blog.label"),
    title: t("blog.title", { name: person.name }),
    description: t("blog.description", { name: person.name }),
    recent: t("blog.recent"),
    // Create new blog posts by adding a new .mdx file to app/[locale]/blog/posts
    // All posts will be listed on the /blog route
  };

  const gallery: Gallery = {
    path: "/gallery",
    get image() {
      return `/api/og/generate?title=${encodeURIComponent(this.title)}`;
    },
    label: t("gallery.label"),
    title: t("gallery.title", { name: person.name }),
    description: t("gallery.description", { name: person.name }),
    // Images by https://lorant.one
    // These are placeholder images, replace with your own
    images: [
      { src: "/images/gallery/horizontal-1.jpg", alt: "image", orientation: "horizontal" },
      { src: "/images/gallery/vertical-4.jpg", alt: "image", orientation: "vertical" },
      { src: "/images/gallery/horizontal-3.jpg", alt: "image", orientation: "horizontal" },
      { src: "/images/gallery/vertical-1.jpg", alt: "image", orientation: "vertical" },
      { src: "/images/gallery/vertical-2.jpg", alt: "image", orientation: "vertical" },
      { src: "/images/gallery/horizontal-2.jpg", alt: "image", orientation: "horizontal" },
      { src: "/images/gallery/horizontal-4.jpg", alt: "image", orientation: "horizontal" },
      { src: "/images/gallery/vertical-3.jpg", alt: "image", orientation: "vertical" },
    ],
  };

  return { person, social, newsletter, home, booking, about, blog, work, gallery };
};

export { createI18nContent };
