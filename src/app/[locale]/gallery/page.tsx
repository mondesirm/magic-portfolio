import { Flex, Meta, Schema } from "@once-ui-system/core";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import GalleryView from "@/components/gallery/GalleryView";
import { author, baseURL, renderContent } from "@/resources";
import type { PageProps } from "@/types";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations();
  const { gallery } = renderContent(t);

  return Meta.generate({ ...gallery, baseURL: `${baseURL}/${locale}` });
}

export default async function Gallery({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const { gallery } = renderContent(t);

  return (
    <Flex maxWidth="l">
      <Schema {...gallery} as="webPage" author={author(locale)} baseURL={`${baseURL}/${locale}`} />
      <GalleryView />
    </Flex>
  );
}
