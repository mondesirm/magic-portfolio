import { Line, Row, Text } from "@once-ui-system/core";
import type { getTranslations } from "next-intl/server";
import type { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";

const createI18nContent = (t: Awaited<ReturnType<typeof getTranslations>>) => {
  const person: Person = {
    firstName: "Selene",
    lastName: "Yu",
    get name() {
      return `${this.firstName} ${this.lastName}`;
    },
    role: t("person.role"),
    avatar: "/images/avatar.jpg",
    email: "example@gmail.com",
    location: "Asia/Jakarta", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
    languages: ["en", "id"], // optional: Leave the array empty if you don't want to display languages
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
      link: "https://github.com/once-ui-system",
      essential: true,
    },
    {
      name: "LinkedIn",
      icon: "linkedin",
      link: "https://www.linkedin.com/company/once-ui/",
      essential: true,
    },
    {
      name: "Instagram",
      icon: "instagram",
      link: "https://www.instagram.com/once_ui/",
      essential: false,
    },
    {
      name: "Threads",
      icon: "threads",
      link: "https://www.threads.com/@once_ui",
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
    headline: <>{t("home.headline")}</>,
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
      href: "/work/building-once-ui-a-customizable-design-system",
    },
    subline: <>{t("home.subline")}</>,
    latest: t("home.latest"),
  };

  const about: About = {
    path: "/about",
    get image() {
      return `/api/og/generate?title=${encodeURIComponent(this.title)}`;
    },
    label: t("about.label"),
    title: t("about.title"),
    description: t("about.description", {
      name: person.name,
      role: person.role,
      location: person.location,
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
      link: "https://cal.com",
    },
    intro: {
      display: true,
      title: t("about.intro.title"),
      description: <>{t("about.intro.description")}</>,
    },
    work: {
      display: true, // set to false to hide this section
      title: t("about.work.title"),
      experiences: [
        {
          company: "FLY",
          timeframe: t("about.work.experiences.FLY.timeframe"),
          role: t("about.work.experiences.FLY.role"),
          achievements: t("about.work.experiences.FLY.achievements").split(";"),
          images: [
            // optional: leave the array empty if you don't want to display images
            {
              src: "/images/projects/project-01/cover-01.jpg",
              alt: "Once UI Project",
              width: 16,
              height: 9,
            },
          ],
        },
        {
          company: "Creativ3",
          timeframe: t("about.work.experiences.Creativ3.timeframe"),
          role: t("about.work.experiences.Creativ3.role"),
          achievements: t("about.work.experiences.Creativ3.achievements").split(";"),
          images: [],
        },
      ],
    },
    studies: {
      display: true, // set to false to hide this section
      title: t("about.studies.title"),
      institutions: [
        {
          name: "University of Jakarta",
          description: <>{t(`about.studies.institutions.University of Jakarta.description`)}</>,
        },
        {
          name: "Build the Future",
          description: <>{t("about.studies.institutions.Build the Future.description")}</>,
        },
      ],
    },
    skills: {
      display: true, // set to false to hide this section
      title: t("about.skills.title"),
      categories: [
        {
          title: "Figma",
          description: <>{t("about.skills.categories.Figma.description")}</>,
          tags: [
            {
              name: "Figma",
              icon: "figma",
            },
          ],
          // optional: leave the array empty if you don't want to display images
          images: [
            {
              src: "/images/projects/project-01/cover-02.jpg",
              alt: "Project image",
              width: 16,
              height: 9,
            },
            {
              src: "/images/projects/project-01/cover-03.jpg",
              alt: "Project image",
              width: 16,
              height: 9,
            },
          ],
        },
        {
          title: "Next.js",
          description: <>{t("about.skills.categories.Nextjs.description")}</>, // "." not accepted in next-intl namespace
          tags: [
            {
              name: "JavaScript",
              icon: "javascript",
            },
            {
              name: "Next.js",
              icon: "nextjs",
            },
            {
              name: "Supabase",
              icon: "supabase",
            },
          ],
          // optional: leave the array empty if you don't want to display images
          images: [
            {
              src: "/images/projects/project-01/cover-04.jpg",
              alt: "Project image",
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
    title: t("blog.title"),
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
      {
        src: "/images/gallery/horizontal-1.jpg",
        alt: "image",
        orientation: "horizontal",
      },
      {
        src: "/images/gallery/vertical-4.jpg",
        alt: "image",
        orientation: "vertical",
      },
      {
        src: "/images/gallery/horizontal-3.jpg",
        alt: "image",
        orientation: "horizontal",
      },
      {
        src: "/images/gallery/vertical-1.jpg",
        alt: "image",
        orientation: "vertical",
      },
      {
        src: "/images/gallery/vertical-2.jpg",
        alt: "image",
        orientation: "vertical",
      },
      {
        src: "/images/gallery/horizontal-2.jpg",
        alt: "image",
        orientation: "horizontal",
      },
      {
        src: "/images/gallery/horizontal-4.jpg",
        alt: "image",
        orientation: "horizontal",
      },
      {
        src: "/images/gallery/vertical-3.jpg",
        alt: "image",
        orientation: "vertical",
      },
    ],
  };

  return { person, social, newsletter, home, about, blog, work, gallery };
};

export { createI18nContent };
