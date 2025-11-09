/**
 * Task: a kanban kártya adatszerkezete.
 * - id: egyedi azonosító (helyben generáljuk, nem az API adja)
 * - title: rövid leírás/cím
 * - status: melyik oszlopban jelenjen meg
 * - priority: “vizuális súly”
 * - userId: opcionális (API mintaadatból jöhet)
 */
export interface Task {
  id: number;                                    // egyedi ID (local)
  title: string;                                  // cím
  status: 'todo' | 'in-progress' | 'done';        // kanban oszlop
  priority: 'low' | 'medium' | 'high';            // jelölés a direktívánknak
  userId?: number;                                // minta API-hoz illeszkedő extra
}
