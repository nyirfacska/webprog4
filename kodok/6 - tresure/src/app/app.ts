/* ============================================================
FÁJL: src/app/app.ts
MIT CSINÁL:
- Gyökér komponens (standalone): navbar + router-outlet.
- Kulcs állapotot (KeyService) figyeli (hasKey$), gombbal váltja (toggle).
- UX fix: ha "Drop Key" védett útvonalon történik → azonnal visszanavigál /home-ra.
============================================================ */
import { Component, inject } from '@angular/core';                           // komponens + DI
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router'; // router API a sablonhoz és navigációhoz
import { AsyncPipe } from '@angular/common';                                  // async pipe a sablonhoz
import { KeyService } from './core/key';                                      // állapot szolgáltatás

@Component({
  selector: 'app-root',                                                       // index.html <app-root>
  standalone: true,                                                           // standalone komponens
  imports: [RouterOutlet, RouterLink, RouterLinkActive, AsyncPipe],           // sablonban használt direktívák/pipék
  templateUrl: './app.html',                                                  // külső sablon
  styleUrls: ['./app.css']                                                    // külső stílus
})
export class AppComponent {                                                   // osztály: logika
  private key = inject(KeyService);                                           // DI: KeyService
  private router = inject(Router);                                            // DI: Router (navigációhoz)
  hasKey$ = this.key.hasKey$;                                                 // UI: async pipe-pal figyeljük

  toggleKey(): void {                                                         // gomb esemény
    this.key.toggle();                                                        // állapot váltás (Pick Up / Drop)
    // ha épp védett útvonalon állunk és ledobtuk a kulcsot → azonnal haza
    if (!this.key.hasKey && this.router.url.startsWith('/treasures')) {       // guard csak navigációnál fut → mi navigálunk
      this.router.navigateByUrl('/home');                                     // UX: azonnali visszadobás a Home-ra
    }
  }
}
