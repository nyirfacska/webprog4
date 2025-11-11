/* ============================================================
FÁJL: src/app/core/guild-guard.ts
MIT CSINÁL:
- CanActivate guard: ellenőrzi a kulcsot (KeyService.hasKey).
- Ha nincs kulcs → átirányít a /home oldalra (Router.parseUrl).
============================================================ */
import { CanActivateFn, Router, UrlTree } from '@angular/router'; // guard típus + UrlTree
import { inject } from '@angular/core';                            // DI helper
import { KeyService } from './key';                                // állapot szolgáltatás

export const guildGuard: CanActivateFn = (): boolean | UrlTree => { // funkcionális guard
  const key = inject(KeyService);                                   // állapot injektálása
  const router = inject(Router);                                    // router injektálása
  return key.hasKey ? true : router.parseUrl('/home');              // van kulcs? → beenged : /home
};
