/* ============================================================
FÁJL: src/app/pages/home/home.ts
MIT CSINÁL:
- Nyitó oldal (nyílt). Rövid útmutatás a "kulcs" felvételéhez.
============================================================ */
import { Component } from '@angular/core';                 // komponens API

@Component({
  selector: 'app-home',                                    // router hivatkozik rá
  standalone: true,                                        // standalone komponens
  templateUrl: './home.html',                               // külső sablon
  styleUrls: ['./home.css']                                 // külső stílus
})
export class HomeComponent {}                               // nincs extra logika
