/* ============================================================
FÁJL: src/app/app.routes.ts
MIT CSINÁL:
- Az alkalmazás összes route-ja egy helyen.
- Nyílt: /home → HomeComponent
- Védett: /treasures → lista, /treasures/:id → részlet (CanActivate guard).
============================================================ */
import { Routes } from '@angular/router';                                 // route típus
import { HomeComponent } from './pages/home/home';                        // nyitó oldal
import { guildGuard } from './core/guild-guard';                          // belépési szabály
import { TreasureListComponent } from './features/treasures/treasure-list/treasure-list'; // védett lista
import { TreasureDetailComponent } from './features/treasures/treasure-detail/treasure-detail'; // védett részlet

export const appRoutes: Routes = [                                        // útvonalak
  { path: '', redirectTo: 'home', pathMatch: 'full' },                    // üres → /home
  { path: 'home', component: HomeComponent },                             // nyílt oldal
  {
    path: 'treasures',                                                    // védett gyökér
    canActivate: [guildGuard],                                            // guard ellenőrzés
    children: [
      { path: '', component: TreasureListComponent },                     // /treasures → lista
      { path: ':id', component: TreasureDetailComponent }                 // /treasures/:id → részlet
    ]
  }
];
