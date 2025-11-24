import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  // BehaviorSubject: mindig tárolja az utolsó értéket (kezdetben 0)
  private counterSubject = new BehaviorSubject<number>(0);

  // Ezt adjuk ki a külvilágnak, erre iratkozik fel a komponens
  counter$ = this.counterSubject.asObservable();

  // Ebben tároljuk az interval subscription-jét
  private sub?: Subscription;

  start(): void {
    // Ha már fut, ne indítsuk újra
    if (this.sub) {
      return;
    }

    // interval(1000): minden másodpercben kibocsát egy számot (0,1,2,...)
    this.sub = interval(1000).subscribe((value) => {
      // Itt most egyszerűen value + 1-et rakunk be,
      // de akár az előző értéket is növelhetnénk:
      this.counterSubject.next(value + 1);
    });
  }

  stop(): void {
    this.sub?.unsubscribe();
    this.sub = undefined;
  }

  reset(): void {
    // Csak a BehaviorSubject értékét állítjuk vissza
    this.counterSubject.next(0);
  }
}
