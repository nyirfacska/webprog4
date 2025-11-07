// ---------------------------------------------------------------
// ATTRIBÚTUM DIREKTÍVA – "appHover"
// ---------------------------------------------------------------
// Cél:
//  - Kis vizuális visszajelzés: ha az egér egy elem fölé ér,
//    enyhe árnyékot és skálázást adunk (interaktívabbnak hat).
// Miért direktíva?
//  - Ugyanaz a viselkedés több helyen, komponens létrehozása nélkül.
// ---------------------------------------------------------------

import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHover]',
  standalone: true
})
export class HoverDirective {
  constructor(private el: ElementRef, private r: Renderer2) {}

  @HostListener('mouseenter')
  onEnter() {
    this.r.setStyle(this.el.nativeElement, 'boxShadow', '0 4px 12px rgba(0,0,0,0.12)');
    this.r.setStyle(this.el.nativeElement, 'transform', 'scale(1.02)');
    this.r.setStyle(this.el.nativeElement, 'transition', 'all .15s ease-in-out');
  }

  @HostListener('mouseleave')
  onLeave() {
    this.r.removeStyle(this.el.nativeElement, 'boxShadow');
    this.r.removeStyle(this.el.nativeElement, 'transform');
  }
}
