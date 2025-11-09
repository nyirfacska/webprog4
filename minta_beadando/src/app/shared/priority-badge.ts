/**
 * PriorityBadgeDirective – a host elem (pl. kártya) kinézetét a priority szerint
 * módosítja (rózsaszín árnyalatokkal).
 *
 * Használat:
 *   <div [appPriorityBadge]="task.priority">...</div>
 */
import { Directive, ElementRef, Input, OnChanges } from '@angular/core'; // direktíva API
import { Task } from '../models/task';                                    // priority típus

@Directive({
  selector: '[appPriorityBadge]', // attribútum-szelektor (szögletes zárójelezett binding a használatkor)
  standalone: true                 // standalone direktíva
})
export class PriorityBadgeDirective implements OnChanges {
  @Input('appPriorityBadge') priority: Task['priority'] | null = null; // bemenő érték

  constructor(private el: ElementRef<HTMLElement>) {} // host DOM elem elérése

  ngOnChanges(): void {
    const host = this.el.nativeElement; // natív DOM elem referenciája

    // Alapértelmezett stílus törlése / finom átmenet
    host.style.transition = 'background 0.3s ease, border-left 0.3s ease';
    host.style.borderLeft = '';
    host.style.background = '';

    // Priority alapján díszítés
    if (this.priority === 'high') {
      host.style.borderLeft = '6px solid #d81b60'; // erős pink csík
      host.style.background = '#f8bbd0';           // pinkes háttér
    } else if (this.priority === 'low') {
      host.style.borderLeft = '6px solid #ce93d8'; // lilás csík
      host.style.background = '#f3e5f5';           // lilás háttér
    } else {
      host.style.borderLeft = '6px solid #f48fb1'; // alap pink csík
      host.style.background = '#fff0f6';           // nagyon halvány rózsaszín
    }
  }
}
