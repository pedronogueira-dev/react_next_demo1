"use server";

import * as fs from "fs";
import path from "path";

function createIfNotExists(filePath: string): void {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]");
  }
}

function filePath(entityName: string): string {
   return path.join(process.cwd(), 'data', `${entityName}.json`);
}

function saveData<T>(entities: T[], entityName: string) : Promise<boolean> {
  try {
    fs.writeFileSync(filePath(entityName), JSON.stringify(entities, null, 4));
  }
  catch (error) {
    console.warn(error);
    return Promise.resolve(false);
  }

  return Promise.resolve(true);
}

export async function getList<T>(entityName: string): Promise<T[]> {
  const fileName = filePath(entityName);
  createIfNotExists(fileName);

  const fileContent = fs.readFileSync(fileName);
  const jsonContent = JSON.parse(fileContent.toString());

  return Promise.resolve((jsonContent ?? []) as T[]);
}

export async function create<T>(entity: T, entityName: string): Promise<boolean> {
  const list: T[] = await getList(entityName);
  return await saveData([...list, entity], entityName);
}
