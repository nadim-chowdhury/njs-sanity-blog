import { createClient } from "next-sanity";

const projectId = "qdc64e1f";
const dataset = "production";
const apiVersion = "2023-11-07";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});
