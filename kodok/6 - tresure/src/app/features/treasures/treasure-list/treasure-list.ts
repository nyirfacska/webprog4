/* ============================================================
FÁJL: src/app/features/treasures/treasure-list/treasure-list.ts
MIT CSINÁL:
- Védett lista: 3 dummy "kincs".
- Minden elem paraméteres link a részlet oldalra (/treasures/:id).
- Játékos UX: saját direktíva (Shine) + saját pipe (TreasureLabel).
============================================================ */
import { Component } from '@angular/core';                       // komponens API
import { RouterLink } from '@angular/router';                    // paraméteres link
import { CommonModule } from '@angular/common';                  // *ngFor stb.
import { ShineDirective } from '../../../shared/shine';          // hover direktíva
import { TreasureLabelPipe } from '../../../shared/treasure-label-pipe'; // emoji pipe

@Component({
  selector: 'app-treasure-list',                                 // router child route komponense
  standalone: true,                                              // standalone
  imports: [CommonModule, RouterLink, ShineDirective, TreasureLabelPipe], // sablon függőségei
  templateUrl: './treasure-list.html',                            // külső sablon
  styleUrls: ['./treasure-list.css']                              // külső stílus
})
export class TreasureListComponent {                              // logika osztály
  treasures = [                                                   // dummy adatok (API helyett)
    { id:1, name:'Golden Compass' },
    { id:2, name:'Ancient Map Fragment' },
    { id:3, name:'Jeweled Skull' }
  ];
}
