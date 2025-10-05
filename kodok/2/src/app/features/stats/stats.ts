import {Component, computed} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CounterService} from '../../shared/counter';


@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats.html',
  styleUrls: ['./stats.css'],
})
export class StatsComponent {
  constructor(private counter: CounterService) {}

  total = computed(() => this.counter.count());

}
