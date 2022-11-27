import { MicroCMSImage } from "microcms-js-sdk";

export type MCDefault = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revicedAt: string;
};

export type BlogPostData = MCDefault & {
  blog: { title: string; category: string; mainvisual: MicroCMSImage };
  body: string;
};

export type PhotoPostData = MCDefault & {
  imagesDisplay:
    | {
        title: string;
        itemId: string;
        category: string[];
        image: MicroCMSImage;
        upload: string;
      }[];
  imagesUi: { title: string; image: MicroCMSImage; use: string[] }[];
  categories: { fieldId: string; name: string }[];
};
