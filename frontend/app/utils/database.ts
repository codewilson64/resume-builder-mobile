import * as SQLite from "expo-sqlite";
import { ResumeData } from "../types/resume";

const db = SQLite.openDatabaseSync("resumes.db");

export const initDatabase = () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS resumes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL DEFAULT 'My Resume',
      template TEXT NOT NULL DEFAULT 'orion',
      data TEXT NOT NULL,          -- JSON string of ResumeData
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);
};

export const saveResume = (
  data: ResumeData,
  template: string = "orion",
  name: string = "My Resume",
  id?: number
) => {
  const json = JSON.stringify(data);

  if (id) {
    // Update existing
    db.runSync(
      `UPDATE resumes 
       SET name = ?, template = ?, data = ?, updated_at = datetime('now') 
       WHERE id = ?`,
      [name, template, json, id]
    );
    return id;
  } else {
    // Insert new
    const result = db.runSync(
      `INSERT INTO resumes (name, template, data) VALUES (?, ?, ?)`,
      [name, template, json]
    );
    return result.lastInsertRowId;
  }
};

export const getResume = (id: number): { id: number; name: string; template: string; data: ResumeData } | null => {
  const row = db.getFirstSync<{
    id: number;
    name: string;
    template: string;
    data: string;
  }>("SELECT * FROM resumes WHERE id = ?", [id]);

  if (!row) return null;

  return {
    id: row.id,
    name: row.name,
    template: row.template,
    data: JSON.parse(row.data),
  };
};

export const getAllResumes = () => {
  return db.getAllSync<{
    id: number;
    name: string;
    template: string;
    updated_at: string;
  }>("SELECT id, name, template, updated_at FROM resumes ORDER BY updated_at DESC");
};

export const deleteResume = (id: number) => {
  db.runSync("DELETE FROM resumes WHERE id = ?", [id]);
};

export const renameResume = (id: number, newName: string) => {
  db.runSync(
    `UPDATE resumes SET name = ?, updated_at = datetime('now') WHERE id = ?`,
    [newName.trim(), id]
  );
};

export const debugResumes = () => {
  const rows = db.getAllSync("SELECT * FROM resumes");
  console.log("=== All Resumes ===");
  console.log(JSON.stringify(rows, null, 2));
  return rows;
};