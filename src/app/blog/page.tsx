import { Column, Heading, Meta, Schema } from "@once-ui-system/core";
import type { Metadata } from "next";
import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { author, baseURL, blog } from "@/resources";

export async function generateMetadata(): Promise<Metadata> {
  return Meta.generate({ ...blog, baseURL });
}

export default function Blog() {
  return (
    <Column maxWidth="m" paddingTop="24">
      <Schema {...blog} as="blogPosting" author={author} baseURL={baseURL} />

      <Heading marginBottom="l" variant="heading-strong-xl" marginLeft="24">
        {blog.title}
      </Heading>

      <Column fillWidth flex={1} gap="40">
        <Posts range={[1, 1]} thumbnail />
        <Posts range={[2, 3]} columns="2" thumbnail direction="column" />
        <Mailchimp marginBottom="l" />

        <Heading as="h2" variant="heading-strong-xl" marginLeft="l">
          Earlier posts
        </Heading>

        <Posts range={[4]} columns="2" />
      </Column>
    </Column>
  );
}
