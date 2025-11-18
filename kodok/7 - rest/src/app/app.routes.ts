// Itt definiáljuk az alkalmazás útvonalait (URL -> komponens)

import { Routes } from '@angular/router';
import {UsersComponent} from './pages/users/users';
// Importáljuk a UsersComponentet, hogy route-hoz tudjuk rendelni

// A routes tömb minden eleme egy route konfigurációs objektum
export const routes: Routes = [
  {
    // Alapértelmezett útvonal: ha csak a gyökérre megyünk ("/"),
    // akkor átirányítjuk a /users oldalra
    path: '',
    redirectTo: 'users',
    pathMatch: 'full' // pontos egyezést kérünk
  },
  {
    // Ha a böngészőben a /users URL-re megyünk:
    // pl. http://localhost:4200/users
    path: 'users',
    component: UsersComponent
  }
];
