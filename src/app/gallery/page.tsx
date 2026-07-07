import { Flex, Meta, Schema } from "@once-ui-system/core";
import type { Metadata } from "next";
import GalleryView from "@/components/gallery/GalleryView";
import { author, baseURL, gallery } from "@/resources";

export async function generateMetadata(): Promise<Metadata> {
  return Meta.generate({ ...gallery, baseURL });
}

export default function Gallery() {
  return (
    <Flex maxWidth="l">
      <Schema {...gallery} as="webPage" author={author} baseURL={baseURL} />
      <GalleryView />
    </Flex>
  );
}
