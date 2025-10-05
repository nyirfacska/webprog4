import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CounterService} from '../../shared/counter';
import {HoverDirective} from '../../shared/hover';

@Component({
  selector:'app-counter',
  standalone: true,
  imports:[CommonModule,HoverDirective],
  templateUrl:'./counter.html',
  styleUrls:['./counter.css']
})

export class CounterComponent {
  constructor(public counter: CounterService) {
  }
}
