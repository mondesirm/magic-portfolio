import { Line, Row, Text } from "@once-ui-system/core";
import type { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";

const person: Person = {
  firstName: "Malik",
  lastName: "MONDESIR",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Web Engineer",
  avatar: "/images/avatar.jpg",
  email: "contact@mondesirm.me",
  location: "Europe/Paris", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["en", "fr"], // optional: Leave the array empty if you don't want to display languages
  locale: "fr", // BCP 47 language tag for the HTML lang attribute, e.g., 'en', 'ja', 'zh-TW'
};

const newsletter: Newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>My weekly newsletter about creativity and engineering</>,
  button: "Subscribe",
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
  image: "/images/og/home.png",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Streamlining Repetitive Tasks</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Mix Massage Art</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />

        <Text marginRight="4" onBackground="brand-medium">
          Featured work
        </Text>
      </Row>
    ),
    href: "/work/mixmassage.art",
  },
  subline: (
    <>
      I'm {person.firstName}, a {person.role} in the suburbs of Paris, <br />
      specializing in <b>Business Process Automation</b> <br />
      and the digitalization of businesses.
    </>
  ),
  latest: "Latest from the blog",
};

const about: About = {
  path: "/about",
  get image() {
    return `/api/og/generate?title=${encodeURIComponent(this.title)}`;
  },
  label: "About",
  title: `About ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location.split("/")[1]?.replace("_", " ")}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    title: "Schedule a call",
    link: "https://cal.eu/mondesirm",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        {person.firstName} is a {person.location.split("/")[1]?.replace("_", " ")}-based{" "}
        {person.role}, with a passion for integrating digital tools into business processes. His
        work covers Web and mobile application design, automation, and website creation for small
        businesses.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "MALIK MONDESIR (EI) · Drancy (93)",
        timeframe: "August 2023 → Present",
        role: "Self-employed / Webmaster",
        achievements: [
          <>Redesign of my portfolio website (v2) and ongoing development of a CRM</>,
          <>Welcoming an intern and rebranding a company in the wellness sector</>,
          <>
            2 websites in the wellness sector, one of which is for an association for the visually
            impaired
          </>,
          <>3 others in pest control and cleaning, one of which is an e-commerce site</>,
          <>
            Digitalization of a new company specializing in general electrical work and home
            automation
          </>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          {
            src: "/images/projects/mixmassage.art/cover.gif",
            alt: "Mix Massage Art",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "Business Evasion · Paris 12e",
        timeframe: "September 2021 → June 2023",
        role: "Technical Manager / Automation",
        achievements: [
          <>Promotion to team lead and onboarding of new hires</>,
          <>Handling client projects (direct contact and appointment scheduling)</>,
          <>
            Redesign and integration of <b>WooCommerce</b> for <b>ProfilPlus Fabricant</b>
          </>,
          <>
            Partnership request forms for <b>Service Limo Car</b> with <b>Zoho</b>
          </>,
          <>
            Automation of business processes for clients and internal use (<b>Zapier</b> and{" "}
            <b>Zoho</b>) :
          </>,
          <>Daily synchronization of a customer database across two CRMs</>,
          <>Sending emails with employee rankings based on call activity (API)</>,
        ],
        images: [],
      },
      {
        company: "Hackers Corporation · Paris 12e",
        timeframe: "April 2021 → September 2021",
        role: "Web and Mobile Application Designer",
        achievements: [
          <>
            One site migration from <b>CakePHP</b> to <b>Laravel</b>
          </>,
          <>
            One application developed with <b>React Native</b>, <b>Expo</b> and <b>Firebase</b>:{" "}
            <b>GMA Adequa</b>
          </>,
          <>
            Three websites developed with <b>Laravel</b>: <b>GMA Adequa</b>, <b>Rentor</b> et{" "}
            <b>Triber</b>
          </>,
          <>
            Two websites developed with <b>WordPress</b>: <b>Vizio</b> et <b>Hackers Corporation</b>
          </>,
        ],
        images: [],
      },
      {
        company: "Hub One · Roissy Charles de Gaulle",
        timeframe: "January 2020 → August 2020",
        role: "Office Support Technician Assistant",
        achievements: [
          <>
            Automation using <b>JavaScript</b> and <b>PowerShell</b> for IT asset warranty
          </>,
          <>
            Managing <b>Active Directory</b> accounts across the company's 8 sites
          </>,
          <>
            Configuring mailboxes, <b>MS Exchange</b> distribution lists and <b>MS SharePoint</b>{" "}
            sites
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "École Supérieure du Génie Informatique",
        description: <>Full Stack Development / Real-Time Applications / DevOps Engineering</>,
      },
      {
        name: "Lycée et UFA Robert Schuman",
        description: (
          <>
            Controlling a 3D-printed robotic hand via an <b>Android</b> app, <b>Bluetooth</b>, or
            muscle activity sensors: logic developed with <b>Arduino</b>
          </>
        ),
      },
    ],
  },
  skills: {
    display: true, // set to false to hide this section
    title: "Skills",
    categories: [
      {
        title: "Technical",
        description: (
          <>
            Digital solutions with <b>Next.js</b> + <b>React</b> / <b>WordPress</b> +{" "}
            <b>Anime.js</b>.
          </>
        ),
        tags: [
          {
            name: "TypeScript",
            icon: "typescript",
          },
          {
            name: "Next.js",
            icon: "nextjs",
          },
          {
            name: "Prisma",
            icon: "prisma",
          },
        ],
        // optional: leave the array empty if you don't want to display images
        images: [],
      },
      {
        title: "Visual",
        description: (
          <>
            <b>Canva</b> (logotypes / moodboards / prototypes) and <b>Figma</b> (wireframes / mobile
            application mockups)
          </>
        ),
        tags: [
          {
            name: "Canva",
            icon: "canva",
          },
          {
            name: "Figma",
            icon: "figma",
          },
        ],
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/mixmassage.art/cover.gif",
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
  label: "Work",
  title: `${person.name}'s Projects`,
  description: `Design and dev projects by ${person.name}`,
  related: "Related projects",
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const blog: Blog = {
  path: "/blog",
  get image() {
    return `/api/og/generate?title=${encodeURIComponent(this.title)}`;
  },
  label: "Blog",
  title: `${person.name}'s Blog`,
  description: `Read what ${person.name} has been up to recently`,
  recent: "Recent posts",
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const gallery: Gallery = {
  path: "/gallery",
  get image() {
    return `/api/og/generate?title=${encodeURIComponent(this.title)}`;
  },
  label: "Gallery",
  title: `${person.name}'s Gallery`,
  description: `A collection by ${person.name}`,
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

export { about, blog, gallery, home, newsletter, person, social, work };
