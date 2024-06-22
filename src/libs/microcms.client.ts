import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: "nextfield",
  apiKey: process.env.NEXT_PUBLIC_MICROAPI_KEY,
});
