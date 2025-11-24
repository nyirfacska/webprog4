import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import {TimerService} from './timer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
})
// A komponens osztály, amely megvalósítja az OnDestroy életciklus interfészt.
// Az OnDestroy arra kell, hogy a komponens megsemmisítésekor le tudjuk állítani a timert.
export class AppComponent implements OnDestroy {

  // A counter$ egy Observable<number>, ami a TimerService által kiadott adatfolyam.
  // A ! azt jelzi a TypeScriptnek, hogy garantáljuk: később inicializálva lesz.
  counter$!: Observable<number>;

  // A konstruktorban kapjuk meg a TimerService példányt dependency injection útján.
  // Itt már biztosan létezik a service, így biztonságosan inicializálhatjuk a counter$-t.
  constructor(private timerService: TimerService) {
    // A TimerService-ben lévő counter$ Observable-t hozzárendeljük ehhez a komponens változójához.
    // Így a HTML-ben az async pipe-pal ki tudjuk olvasni.
    this.counter$ = this.timerService.counter$;
  }

  // A Start gomb ezt hívja. A TimerService.start() elindítja az interval időzítőt.
  start(): void {
    this.timerService.start();
  }

  // A Stop gomb ezt hívja. A TimerService.stop() leállítja az időzítést.
  stop(): void {
    this.timerService.stop();
  }

  // A Reset gomb ezt hívja. A TimerService.reset() a számlálót visszaállítja 0-ra.
  reset(): void {
    this.timerService.reset();
  }

  // Angular életciklus metódus, automatikusan meghívódik,
  // amikor a komponens elhagyja a DOM-ot (pl. más oldalra navigálunk).
  // Itt biztosítjuk, hogy a timer minden esetben leálljon.
  ngOnDestroy(): void {
    this.stop();
  }
}
