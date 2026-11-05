import { connectHost } from "@openchamber/sdk";
import type { Snapshot } from "./types.ts";

const host = connectHost();
let projectDir: string | null = null;

export function setProjectDir(directory: string | null): void {
  projectDir = directory;
}

export function getProjectDir(): string | null {
  return projectDir;
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
    const message = error instanceof Error ? error.message : String(error);
    if (/ENOENT|not found|no such file|does not exist/i.test(message)) return false;
    throw error;
  }
}

export async function readStateText(): Promise<string | null> {
  try {
    return await readText(".vstack/state.json");
  } catch {
    return null;
  }
}

export async function readHistoryText(): Promise<string | null> {
  try {
    return await readText(".vstack/history.jsonl");
  } catch {
    return null;
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
    const message = error instanceof Error ? error.message : String(error);
    if (/ENOENT|not found|no such file|does not exist/i.test(message)) return [];
    throw error;
  }
}

export async function readSnapshot(): Promise<Snapshot> {
  const present = await hasVstackDirectory();
  if (!present) return { present: false, stateText: null, historyText: null, archives: [] };
  const [stateText, historyText, archives] = await Promise.all([
    readStateText(),
    readHistoryText(),
    readDeliveryFiles(),
  ]);
  return { present: true, stateText, historyText, archives };
}
