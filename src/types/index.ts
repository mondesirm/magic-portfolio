export * from "./config.types";
export * from "./content.types";

export type Params = { slug: string | string[] };

export type PageProps = {
  params: Promise<Params>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
