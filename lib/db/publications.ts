import { getDb } from "@/lib/db/server";

type PublicationRow = {
  public_slug: string;
  public_title: string;
  public_summary: string | null;
  public_payload?: Record<string, unknown> | null;
  published_at: string;
};

/** Public pages must fail closed to static content when the optional projection is unavailable. */
export async function getPublishedProjects(limit = 40): Promise<PublicationRow[]> {
  const db = getDb();
  if (!db) return [];

  try {
    return await db`SELECT public_slug, public_title, public_summary, public_payload, published_at FROM public.public_publications WHERE entity_type='project' ORDER BY published_at DESC LIMIT ${limit}`;
  } catch (error) {
    console.error("[v0] Published project projection unavailable:", error);
    return [];
  }
}

export async function getPublishedProject(slug: string): Promise<PublicationRow | null> {
  const db = getDb();
  if (!db) return null;

  try {
    const rows = await db`SELECT public_slug, public_title, public_summary, public_payload, published_at FROM public.public_publications WHERE entity_type='project' AND public_slug=${slug} LIMIT 1`;
    return rows[0] ?? null;
  } catch (error) {
    console.error("[v0] Published project detail unavailable:", error);
    return null;
  }
}

export async function getPublishedProjectDates(limit = 100): Promise<Array<Pick<PublicationRow, "public_slug" | "published_at">>> {
  const db = getDb();
  if (!db) return [];

  try {
    return await db`SELECT public_slug, published_at FROM public.public_publications WHERE entity_type='project' ORDER BY published_at DESC LIMIT ${limit}`;
  } catch (error) {
    console.error("[v0] Published project sitemap projection unavailable:", error);
    return [];
  }
}
