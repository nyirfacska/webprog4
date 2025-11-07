// ---------------------------------------------------------------
// ROOT – "AppComponent"
// ---------------------------------------------------------------
// Cél:
//  - Összefűzni a két feature komponenst (Stats + Counter).
//  - standalone komponensként importokkal "ismertté" tenni a selectorokat.
// ---------------------------------------------------------------

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsComponent } from './features/stats/stats';
import { CounterComponent } from './features/counter/counter';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, StatsComponent, CounterComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {}
