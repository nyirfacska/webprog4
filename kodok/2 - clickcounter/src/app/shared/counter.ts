// ---------------------------------------------------------------
// SERVICE – "CounterService"
// ---------------------------------------------------------------
// Cél:
//  - Egy központi hely, ahol a kattintások számát tároljuk.
//  - A komponensek (Counter, Stats) DI-vel ugyanazt az állapotot látják.
// Miért jó service?
//  - Elkülöníti az "üzleti logikát" (növelés/lenullázás) a megjelenítéstől.
//  - Könnyebb tesztelni és később cserélni (pl. perzisztálni localStorage-ba).
// ---------------------------------------------------------------

import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CounterService {
  // Signals: Angular beépített reaktív primitívje (egyszerűbb, mint egy teljes állapotkezelő)
  // - value(): aktuális érték leolvasása a template-ben
  // - set()/update(): módosítás
  private _count = signal<number>(0);

  // Getter csak olvasáshoz (jó gyakorlat: ne adjuk ki a belső referenciát írhatóan)
  get count() {
    return this._count;
  }

  // Műveletek: növelés és nullázás
  increment(): void {
    this._count.update(v => v + 1);
  }

  reset(): void {
    this._count.set(0);
  }
}
