import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: process.env.SERVICE_DOMAIN || "",
  apiKey: process.env.API_KEY || "",
});
if (!process.env.SERVICE_DOMAIN) throw new Error("service domain is not found");
if (!process.env.API_KEY) throw new Error("api key is not found");
