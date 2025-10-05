import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

// Látvány: egér fölé → finom árnyék + pici nagyítás (bárhol újrahasznosítható)
@Directive({ selector: '[appHoverCard]', standalone: true })
export class HoverCardDirective {
  constructor(private el: ElementRef, private r: Renderer2) {}
  @HostListener('mouseenter') onEnter() {
    this.r.setStyle(this.el.nativeElement, 'boxShadow', '0 8px 18px rgba(0,0,0,0.15)');
    this.r.setStyle(this.el.nativeElement, 'transform', 'scale(1.01)');
    this.r.setStyle(this.el.nativeElement, 'transition', 'all .15s ease');
  }
  @HostListener('mouseleave') onLeave() {
    this.r.removeStyle(this.el.nativeElement, 'boxShadow');
    this.r.setStyle(this.el.nativeElement, 'transform', 'scale(1)');
  }
}
