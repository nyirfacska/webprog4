import {signal, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  private _count = signal<number>(0);

  get count(){
    return this._count;
  }
  increment() {
    this._count.update(v => v + 1);
  }

  reset() {
    this._count.set(0)
  }

}
