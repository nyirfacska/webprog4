/**
 * Root komponens – a teljes app “kerete”.
 * NEM a klasszikus app.component.ts, hanem egyedi: app.ts
 * A sablon és stílus külön fájlok: app.html / app.css
 * Két child komponenst jelenítünk meg: TaskForm (űrlap) + Board (kanban tábla).
 */
import { Component } from '@angular/core';          // @Component dekorátor
import { CommonModule } from '@angular/common';     // ngIf, ngFor stb. direktívák
import { TaskFormComponent } from './features/task-form/task-form'; // saját űrlap komponens (standalone)
import { BoardComponent } from './features/board/board';            // saját tábla komponens (standalone)

@Component({
  selector: 'app-root',       // Ezzel a névvel kerül be az index.html-be
  standalone: true,           // Nincs NgModule; a komponens maga deklarálja az importokat
  imports: [                  // Itt listázzuk, mit használ a template (CommonModule, gyerek komponensek)
    CommonModule,
    TaskFormComponent,
    BoardComponent
  ],
  templateUrl: './app.html',  // Külön sablon (HTML fájl)
  styleUrls: ['./app.css']    // Külön stílus (CSS fájl)
})
export class App {}           // A root komponens osztálya (most nem tartalmaz logikát)
