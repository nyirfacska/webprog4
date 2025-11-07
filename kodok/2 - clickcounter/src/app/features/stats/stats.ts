// ---------------------------------------------------------------
// KOMPONENS – "StatsComponent"
// ---------------------------------------------------------------
// Cél:
//  - Egy kis kártya, ami a kattintások aktuális számát mutatja.
//  - Ugyanazt a CounterService-t használja, mint a Counter komponens.
// ---------------------------------------------------------------

import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterService } from '../../shared/counter';

@Component({
  selector: 'app-stats',          // <app-stats></app-stats>
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats.html',
  styleUrls: ['./stats.css']
})
export class StatsComponent {
  // DI: közös állapot injektálása
  constructor(private counter: CounterService) {}

  // computed: származtatott érték signal-ból (nem kötelező, de jól mutatja a mintát)
  total = computed(() => this.counter.count());
}
