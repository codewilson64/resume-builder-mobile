import * as SQLite from "expo-sqlite";
import { CoverLetterData } from "../types/cover-letter"; 

const db = SQLite.openDatabaseSync("coverLetters.db");

export const initCoverLetterDatabase = () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS cover_letters (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL DEFAULT 'My Cover Letter',
      template TEXT NOT NULL DEFAULT 'classic',
      data TEXT NOT NULL,          -- JSON string of CoverLetterData
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);
};

export const saveCoverLetter = (
  data: CoverLetterData,
  template: string = "classic",
  name: string = "My Cover Letter",
  id?: number
) => {
  const json = JSON.stringify(data);

  if (id) {
    db.runSync(
      `UPDATE cover_letters 
       SET name = ?, template = ?, data = ?, updated_at = datetime('now') 
       WHERE id = ?`,
      [name, template, json, id]
    );
    return id;
  } else {
    const result = db.runSync(
      `INSERT INTO cover_letters (name, template, data) VALUES (?, ?, ?)`,
      [name, template, json]
    );
    return result.lastInsertRowId;
  }
};

export const getCoverLetter = (
  id: number
): { id: number; name: string; template: string; data: CoverLetterData } | null => {
  const row = db.getFirstSync<{
    id: number;
    name: string;
    template: string;
    data: string;
  }>("SELECT * FROM cover_letters WHERE id = ?", [id]);

  if (!row) return null;

  return {
    id: row.id,
    name: row.name,
    template: row.template,
    data: JSON.parse(row.data),
  };
};

export const getAllCoverLetters = () => {
  return db.getAllSync<{
    id: number;
    name: string;
    template: string;
    updated_at: string;
  }>("SELECT id, name, template, updated_at FROM cover_letters ORDER BY updated_at DESC");
};

export const deleteCoverLetter = (id: number) => {
  db.runSync("DELETE FROM cover_letters WHERE id = ?", [id]);
};

export const renameCoverLetter = (id: number, newName: string) => {
  db.runSync(
    `UPDATE cover_letters SET name = ?, updated_at = datetime('now') WHERE id = ?`,
    [newName.trim(), id]
  );
};

export const debugCoverLetters = () => {
  const rows = db.getAllSync("SELECT * FROM cover_letters");
  console.log("=== All Cover Letters ===");
  console.log(JSON.stringify(rows, null, 2));
  return rows;
};