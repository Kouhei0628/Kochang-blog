import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: "k-adventure",
  apiKey: process.env.API_KEY || "",
});
