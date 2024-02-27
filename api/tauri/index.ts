import { exists, BaseDirectory, createDir, readDir } from "@tauri-apps/api/fs";

export async function directoryExists(directory: string) {
  return await exists(directory, { dir: BaseDirectory.AppData });
}

export async function directoryCreate(directory: string) {
  return await createDir(directory, {
    dir: BaseDirectory.AppData,
    recursive: true,
  });
}

export async function directoryRead(directory: string) {
  return await readDir(directory, {
    dir: BaseDirectory.AppData,
    recursive: true,
  });
}
