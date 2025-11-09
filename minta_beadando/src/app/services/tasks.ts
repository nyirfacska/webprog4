/**
 * TasksService – minden adatkezelés itt történik.
 * - localStorage perzisztencia (kulcs: 'kanban-tasks')
 * - első indításkor minták az API-ról (JSONPlaceholder /todos?_limit=10)
 * - CRUD-szerű műveletek: getAll, add, update, remove
 * - változás esemény (changes$), hogy a Board automatikusan frissíthessen
 */

import { Injectable } from '@angular/core';                // DI annotáció
import { HttpClient } from '@angular/common/http';         // HTTP kliens API hívásokhoz
import { Task } from '../models/task';                     // adatmodell
import { Subject } from 'rxjs';                            // egyszerű event stream változások jelzésére

@Injectable({ providedIn: 'root' })                        // service singleton az egész appban
export class TasksService {
  private readonly LS_KEY = 'kanban-tasks';               // localStorage kulcsnév

  private _changes = new Subject<void>();                  // belső Subject: ide next()-elünk
  changes$ = this._changes.asObservable();                 // kifelé Observable: erre iratkoznak fel

  constructor(private http: HttpClient) {}                 // HttpClient injektálása

  /**
   * Összes feladat lekérése:
   * 1) Ha van localStorage állapot → azt adjuk vissza (az az "igazság").
   * 2) Ha nincs, lekérünk 10 elemet az API-ról, mappeljük a mezőket, elmentjük, visszaadjuk.
   */
  async getAll(): Promise<Task[]> {
    const cached = localStorage.getItem(this.LS_KEY);     // nyers JSON a localStorage-ből
    if (cached) return JSON.parse(cached) as Task[];      // ha van, parse-oljuk és visszaadjuk

    // Ha nincs cache: kérjünk 10 todo elemet a fake API-ról
    const todos = await this.http
      .get<{ userId: number; id: number; title: string; completed: boolean }[]>(
        'https://jsonplaceholder.typicode.com/todos?_limit=10'
      )
      .toPromise();                                       // Promise-t kérünk (egyszerűség)

    // A kapott struktúrát mappeljük a saját Task-unkra:
    const mapped: Task[] = (todos ?? []).map(t => ({
      id: t.id,                                           // API id → helyi id
      title: t.title,                                     // API title → title
      status: t.completed ? 'done' : 'todo',              // completed → status
      priority: 'medium',                                 // alapértelmezett prioritás
      userId: t.userId                                    // opcionális tárolás
    }));

    this.saveAll(mapped);                                  // elmentjük localStorage-be (perzisztencia)
    return mapped;                                         // és visszaadjuk
  }

  /** Teljes lista mentése localStorage-be. */
  private saveAll(list: Task[]): void {
    localStorage.setItem(this.LS_KEY, JSON.stringify(list)); // JSON stringként eltároljuk
  }

  /**
   * Új feladat hozzáadása.
   * - lekérjük a jelenlegi listát
   * - lokálisan generálunk nextId-t
   * - összerakjuk az új objektumot
   * - mentjük, majd jelezzük a változást
   */
  async add(task: Omit<Task, 'id'>): Promise<Task> {
    const list = await this.getAll();                       // aktuális lista (cache vagy API→cache)
    const nextId = list.length ? Math.max(...list.map(t => t.id)) + 1 : 1; // kényelmes nextId
    const item: Task = { id: nextId, ...task };             // új Task objektum
    this.saveAll([...list, item]);                          // összeállított új lista mentése
    this._changes.next();                                   // -> külső feliratkozóknak jelzés (Board)
    return item;                                            // visszaadjuk az újonnan létrehozott elemet
  }

  /**
   * Részleges frissítés (pl. status/priority változás).
   * - végigmapeljük a listát
   * - az érintett elemet egyesítjük (spread) a patch-csel
   * - mentjük, jelzünk, és visszaadjuk a frissített elemet
   */
  async update(id: number, patch: Partial<Task>): Promise<Task | undefined> {
    const list = await this.getAll();                       // lista előszedése
    const updated = list.map(t => (t.id === id ? { ...t, ...patch } : t)); // módosított lista
    this.saveAll(updated);                                  // mentés
    this._changes.next();                                   // változás jelzése
    return updated.find(t => t.id === id);                  // kérésre visszaadjuk a módosított elemet
  }

  /**
   * Törlés ID alapján:
   * - kiszűrjük az adott elemet
   * - mentjük, majd jelzünk a feliratkozóknak
   */
  async remove(id: number): Promise<void> {
    const list = await this.getAll();                       // aktuális lista
    this.saveAll(list.filter(t => t.id !== id));            // törlés + mentés
    this._changes.next();                                   // változás jelzése
  }
}
