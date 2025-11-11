/* ============================================================
FÁJL: src/app/shared/treasure-label-pipe.ts
MIT CSINÁL:
- A kapott név elé 💠 emojit tesz (egyszerű adatformázás).
- Standalone pipe: közvetlenül importálható a komponensekbe.
============================================================ */
import { Pipe, PipeTransform } from '@angular/core';              // pipe API

@Pipe({
  name:'treasureLabel',                                           // használat: {{ name | treasureLabel }}
  standalone:true                                                 // standalone pipe
})
export class TreasureLabelPipe implements PipeTransform {         // osztály: transzformáció
  transform(name:string){ return `💠 ${name}`; }                  // prefix hozzáfűzése
}
