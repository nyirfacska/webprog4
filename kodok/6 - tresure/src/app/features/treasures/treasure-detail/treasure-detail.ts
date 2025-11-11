/* ============================================================
FÁJL: src/app/features/treasures/treasure-detail/treasure-detail.ts
MIT CSINÁL:
- URL paraméterből (:id) kiolvassa a kiválasztott kincs azonosítóját.
- Egyszerű "kártyán" megjeleníti; visszalépő link a listára.
============================================================ */
import { Component, inject } from '@angular/core';           // komponens + DI helper
import { ActivatedRoute, RouterLink } from '@angular/router'; // paraméter olvasás + visszalink

@Component({
  selector: 'app-treasure-detail',                           // részlet komponens
  standalone: true,                                          // standalone
  imports: [RouterLink],                                     // sablon: routerLink
  templateUrl: './treasure-detail.html',                      // külső sablon
  styleUrls: ['./treasure-detail.css']                        // külső stílus
})
export class TreasureDetailComponent {                        // logika osztály
  id = Number(inject(ActivatedRoute).snapshot.paramMap.get('id')); // ':id' → number
}
