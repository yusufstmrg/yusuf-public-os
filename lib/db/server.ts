/* eslint-disable @typescript-eslint/no-explicit-any */
import { neon } from "@neondatabase/serverless";

let client: any = null;

/** Server-only Neon client used by the Personal OS data layer. */
export function getDb(): any {
  if (!client) {
    console.warn('[AI Studio] Database not connected — using mock');
    client = async () => [];
  }
  return client;
}
