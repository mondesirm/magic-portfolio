import { Column, Heading, Meta, Schema } from "@once-ui-system/core";
import type { Metadata } from "next";
import { Projects } from "@/components/work/Projects";
import { author, baseURL, work } from "@/resources";

export async function generateMetadata(): Promise<Metadata> {
  return Meta.generate({ ...work, baseURL });
}

export default function Work() {
  return (
    <Column maxWidth="m" paddingTop="24">
      <Schema {...work} as="webPage" author={author} baseURL={baseURL} />

      <Heading marginBottom="l" variant="heading-strong-xl" align="center">
        {work.title}
      </Heading>

      <Projects />
    </Column>
  );
}
