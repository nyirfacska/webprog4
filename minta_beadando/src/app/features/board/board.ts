/**
 * BoardComponent – a 3 oszlopos kanban tábla:
 * - betöltés TasksService-ből
 * - changes$-re feliratkozva automatikus frissítés (add/update/remove után)
 * - keresőmező: query signal + computed filtered lista
 * - oszlopok: todos/doing/done computeden
 * - műveletek: moveLeft/moveRight, onPriorityChange
 * - vizuális: PriorityBadgeDirective
 * - pipe használat bemutatás: TitleFilterPipe a találatszámlálóhoz
 */

import { Component, OnInit, OnDestroy, signal, computed } from '@angular/core'; // komponens + reaktív signal API
import { CommonModule } from '@angular/common';                                  // *ngIf, *ngFor, stb.

import { PriorityBadgeDirective } from '../../shared/priority-badge'; // vizuális direktíva
import { TasksService } from '../../services/tasks';                     // adatréteg
import { Task } from '../../models/task';                                        // típus
import { Subscription } from 'rxjs';
import {TitleFilterPipe} from '../../shared/title-filter-pipe';// pipe a találatszámhoz

@Component({
  selector: 'app-board',                        // templátban <app-board>
  standalone: true,                             // standalone komponens
  imports: [CommonModule, TitleFilterPipe, PriorityBadgeDirective], // sablon használt erőforrásai
  templateUrl: './board.html',                  // külön HTML
  styleUrls: ['./board.css']                    // külön CSS
})
export class BoardComponent implements OnInit, OnDestroy {

  // TELJES lista (Task[]) – signal-ben tároljuk, hogy reaktívan számolhassunk belőle
  all = signal<Task[]>([]);

  // Keresőmező aktuális értéke – string signal
  query = signal<string>('');

  // Betöltés állapota – pl. "Betöltés..." megjelenítéséhez
  loading = signal<boolean>(false);

  // Feliratkozás ref: hogy OnDestroy-ban le tudjunk iratkozni (memóriaszivárgás elkerülése)
  private sub?: Subscription;

  // Szűrt lista: minden változásra (all vagy query módosul) újraszámol
  filtered = computed<Task[]>(() => {
    const q = this.query().trim().toLowerCase(); // kereső kifejezés
    const list = this.all();                     // teljes lista pillanatnyi tartalma
    return q ? list.filter((t: Task) => t.title.toLowerCase().includes(q)) : list;
  });

  // Oszlopok: a szűrt listából válogatjuk külön computed-ekbe
  todos = computed<Task[]>(() => this.filtered().filter((t: Task) => t.status === 'todo'));
  doing = computed<Task[]>(() => this.filtered().filter((t: Task) => t.status === 'in-progress'));
  done  = computed<Task[]>(() => this.filtered().filter((t: Task) => t.status === 'done'));

  // Konstruktorban csak DI – nincs mellékhatás
  constructor(private tasks: TasksService) {}

  // Komponens inicializálás: adatbetöltés + changes$ feliratkozás
  async ngOnInit(): Promise<void> {
    await this.reload();                                      // 1) első betöltés (cache vagy API)
    this.sub = this.tasks.changes$.subscribe(() => this.reload()); // 2) minden változásnál frissítünk
  }

  // Leiratkozás (jó gyakorlat, különösen ha több feliratkozás lenne)
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  // Adatok újratöltése: loading flag-et állítunk a UI feedbackhez
  private async reload(): Promise<void> {
    this.loading.set(true);                 // "Betöltés..." jelzés be
    this.all.set(await this.tasks.getAll()); // service: cache vagy API → cache → lista
    this.loading.set(false);                // jelzés ki
  }

  // Keresőmező input esemény kezelése: sablonból nyers $event-et kapunk, itt olvassuk ki az értéket
  onQueryChange(ev: Event): void {
    const value = (ev.target as HTMLInputElement | null)?.value ?? ''; // nullsafe olvasás
    this.query.set(value);                                             // signal beállítása
  }

  // Prioritás változtatása a selecten: kiolvassuk a value-t és update-eljük az adott Taskot
  async onPriorityChange(t: Task, ev: Event): Promise<void> {
    const value = (ev.target as HTMLSelectElement | null)?.value as Task['priority'] ?? 'medium';
    await this.tasks.update(t.id, { priority: value }); // service update (ment + events)
    // külön reload nem kell: changes$ miatt automatikusan hívódik
  }

  // Balra léptetés: done → in-progress → todo
  async moveLeft(t: Task): Promise<void> {
    const next =
      t.status === 'in-progress' ? 'todo' :
        t.status === 'done'        ? 'in-progress' :
          'todo';
    await this.tasks.update(t.id, { status: next }); // mentés + jelzés
  }

  // Jobbra léptetés: todo → in-progress → done
  async moveRight(t: Task): Promise<void> {
    const next =
      t.status === 'todo'        ? 'in-progress' :
        t.status === 'in-progress' ? 'done' :
          'done';
    await this.tasks.update(t.id, { status: next }); // mentés + jelzés
  }
}
