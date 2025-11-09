/**
 * TitleFilterPipe – nagyon egyszerű kereső a 'title' mezőre.
 * Használat a templátban:
 *   tasks | titleFilter: query
 * ahol 'query' egy string (pl. inputból).
 */
import { Pipe, PipeTransform } from '@angular/core'; // pipe API
import { Task } from '../models/task';               // típus a listához

@Pipe({
  name: 'titleFilter', // sablonban így hivatkozunk rá
  standalone: true     // nem kell NgModule-ba tenni
})
export class TitleFilterPipe implements PipeTransform {
  transform(list: Task[] | null | undefined, q: string): Task[] {
    if (!list) return [];               // ha nincs lista, adjunk üreset (ne dobjon hibát)
    if (!q?.trim()) return list;        // üres/whitespace keresés esetén ne szűrjünk
    const term = q.trim().toLowerCase();// kisbetűs összehasonlítás a title-hez
    return list.filter(t => t.title.toLowerCase().includes(term)); // részsztring keresés
  }
}
