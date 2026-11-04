import { parseProjectFile, type ProjectFile } from '@workshop/contracts';

/** Replaceable persistence port. No UI or engineering logic. */
export interface ProjectRepository {
  list(): ProjectFile[];
  save(project: ProjectFile): void;
}
const PREFIX = 'open-workshop:project:v1:';
export function browserProjectRepository(storage: Storage): ProjectRepository {
  return {
    list() {
      const projects: ProjectFile[] = [];
      for (let index = 0; index < storage.length; index++) {
        const key = storage.key(index);
        if (key?.startsWith(PREFIX)) {
          const raw = storage.getItem(key);
          if (raw !== null) projects.push(parseProjectFile(raw));
        }
      }
      return projects.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    },
    save(project) {
      const validated = parseProjectFile(JSON.stringify(project));
      const key = PREFIX + validated.id;
      if (storage.getItem(key) === null && this.list().length >= 20)
        throw new Error(
          'This browser already contains 20 projects. Export a project as a backup; no existing projects were removed.',
        );
      storage.setItem(key, JSON.stringify(validated));
    },
  };
}
