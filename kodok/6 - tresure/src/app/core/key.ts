/* ============================================================
FÁJL: src/app/core/key.ts
MIT CSINÁL:
- "Auth"-szerű állapot: van-e "kulcs" (🔑) a felhasználónál.
- UI-nak: Observable (hasKey$), guardnak: szinkron getter (hasKey).
- toggle(): váltja az állapotot (Pick Up / Drop).
============================================================ */
import { Injectable } from '@angular/core';                 // szolgáltatás DI jelölése
import { BehaviorSubject } from 'rxjs';                     // reaktív állapot

@Injectable({ providedIn:'root' })                          // root-szintű provider
export class KeyService {                                   // osztály: állapot szolgáltatás
  private _hasKey = new BehaviorSubject<boolean>(false);    // kezdet: nincs kulcs
  hasKey$ = this._hasKey.asObservable();                    // UI: async pipe-hoz
  get hasKey(){ return this._hasKey.value; }                // guard: szinkron olvasás
  toggle(){ this._hasKey.next(!this._hasKey.value); }       // gomb: állapot váltás
}
