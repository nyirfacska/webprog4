// ---------------------------------------------------------------
// KOMPONENS – "CounterComponent"
// ---------------------------------------------------------------
// Cél:
//  - Egy gomb, ami növeli a számlálót (CounterService.increment()).
//  - Egy reset gomb a nullázáshoz.
//  - Az aktuális érték megjelenítése nagy számmal.
// Extra:
//  - appHover direktíva a gombok "életre keltéséhez" (hover-animáció).
// ---------------------------------------------------------------

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HoverDirective} from '../../shared/hover';
import {CounterService} from '../../shared/counter';


@Component({
  selector: 'app-counter',          // <app-counter></app-counter>
  standalone: true,
  imports: [CommonModule, HoverDirective],
  templateUrl: './counter.html',
  styleUrls: ['./counter.css']
})
export class CounterComponent {
  // A komponens borzasztó egyszerű: minden logika a service-ben.
  constructor(public counter: CounterService) {}
  // Tipp: a template-ből közvetlenül hívjuk: counter.increment(), counter.reset()
}
