import { Pipe, PipeTransform } from '@angular/core';
import {WatchItem} from '../movie';


// Pure pipe: csak valódi változásra számol újra → gyors
@Pipe({ name: 'totalDuration', standalone: true, pure: true })
export class TotalDurationPipe implements PipeTransform {
  transform(items: WatchItem[] | null | undefined): string {
    if (!items || items.length === 0) return '0 min';
    const total = items.reduce((acc, w) => acc + w.movie.minutes * w.qty, 0);
    const h = Math.floor(total / 60), m = total % 60;
    return h > 0 ? `${h} h ${m} min` : `${m} min`;
  }
}

