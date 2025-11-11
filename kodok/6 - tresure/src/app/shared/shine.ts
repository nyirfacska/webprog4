/* ============================================================
FÁJL: src/app/shared/shine.ts
MIT CSINÁL:
- Hover esetén kicsit "kivilágosítja" a cél elemet (vizuális visszajelzés).
- Standalone direktíva: bármelyik komponens importálhatja.
============================================================ */
import { Directive, HostBinding, HostListener } from '@angular/core'; // direktíva API-k

@Directive({
  selector: '[appShine]',                                         // használat: <a appShine>...</a>
  standalone: true                                                // standalone direktíva
})
export class ShineDirective {                                     // osztály: viselkedés
  @HostBinding('style.filter') filter = 'none';                   // alap: nincs effekt
  @HostListener('mouseenter') on(){ this.filter = 'brightness(1.15)'; } // egér belép: fényesebb
  @HostListener('mouseleave') off(){ this.filter = 'none'; }             // egér kilép: vissza
}
