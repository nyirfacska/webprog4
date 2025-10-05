import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pet-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card" [class.sold]="sold">
      <!-- Interpoláció (@Input adatok kiírása) -->
      <div class="emoji">{{ emoji }}</div>
      <div class="name">{{ name }}</div>
      <div class="price">Price: {{ price }} coins</div>

      <!-- Tulajdonságkötés: disabled állapot -->
      <!-- eseménykötés: gyerek oldali handler -->
      <!-- attribútum kötés példa -->
      <button
        (click)="buyPet()"
        [disabled]="disabled"
        [attr.aria-label]="'Buy ' + name"
      >
        {{ sold ? 'SOLD' : 'BUY' }}
      </button>
    </div>
  `,
  styles: [`
    .card {
      border: 1px solid #ddd; border-radius: 12px; padding: .8rem;
      display: grid; gap: .4rem; place-items: center;
      transition: transform .15s ease-in-out, box-shadow .15s;
    }
    .card:hover { transform: translateY(-2px); box-shadow: 0 6px 18px rgba(0,0,0,.08); }
    .emoji { font-size: 3rem; }
    .name { font-weight: 700; }
    .price { opacity: .8; }
    .sold { opacity: .6; }
    button { padding: .4rem .8rem; cursor: pointer; border-radius: 8px; }
  `]
})
export class PetCardComponent {
  // --- Bejövő adatok a szülőtől ---
  @Input({ required: true }) name!: string;
  @Input({ required: true }) emoji!: string;
  @Input({ required: true }) price!: number;
  @Input() sold = false;

  // Szülő által küldött tiltás (ha nincs elég coin / már eladva)
  @Input() disabled = false;

  // --- Kimenő esemény a szülőnek (gyerek -> szülő) ---
  @Output() buy = new EventEmitter<{ name: string; price: number }>();

  buyPet() {
    if (!this.disabled && !this.sold) {
      this.buy.emit({ name: this.name, price: this.price });
    }
  }
}
