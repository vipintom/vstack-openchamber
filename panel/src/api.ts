import { connectHost } from "@openchamber/sdk";
import type { Snapshot } from "./types.ts";

const host = connectHost();

function isMissing(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return /ENOENT|NOT_FOUND|not found|no such file|does not exist/i.test(message);
}

async function readText(path: string): Promise<string> {
  const result = await host.readFile(path);
  return result.content;
}

/** The presence probe separates a missing project from a broken one. */
export async function hasVstackDirectory(): Promise<boolean> {
  try {
    await host.listDir(".vstack");
    return true;
  } catch (error) {
    if (isMissing(error)) return false;
    throw error;
  }
}

export async function readStateText(): Promise<string | null> {
  try {
    return await readText(".vstack/state.json");
  } catch (error) {
    if (isMissing(error)) return null;
    throw error;
  }
}

export async function readHistoryText(): Promise<string | null> {
  try {
    return await readText(".vstack/history.jsonl");
  } catch (error) {
    if (isMissing(error)) return null;
    throw error;
  }
}

export async function readDeliveryFiles(): Promise<Array<{ name: string; text: string }>> {
  try {
    const listing = await host.listDir(".vstack/deliveries");
    const files = listing.entries.filter((entry) => entry.kind === "file" && entry.name.endsWith(".json"));
    const texts = await Promise.all(
      files.map(async (entry) => ({
        name: entry.name,
        text: await readText(`.vstack/deliveries/${entry.name}`),
      }))
    );
    return texts;
  } catch (error) {
    if (isMissing(error)) return [];
    throw error;
  }
}

let cache: { key: string; archives: Array<{ name: string; text: string }> } | null = null;

export async function readSnapshot(): Promise<Snapshot> {
  const present = await hasVstackDirectory();
  if (!present) {
    cache = null;
    return { present: false, stateText: null, historyText: null, archives: [] };
  }
  const [stateText, historyText] = await Promise.all([
    readStateText(),
    readHistoryText(),
  ]);
  const key = `${stateText ?? ""}\u0000${historyText ?? ""}`;
  if (cache?.key !== key) {
    cache = { key, archives: await readDeliveryFiles() };
  }
  return { present: true, stateText, historyText, archives: cache.archives };
}
