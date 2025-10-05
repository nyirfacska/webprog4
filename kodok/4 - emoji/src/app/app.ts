import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';            // kétirányú kötéshez (ngModel)

import {PetCardComponent} from './pet-card/pet-card';
import {HighlightDirective} from './highlight';        // saját direktíva

type Pet = {
  name: string;
  emoji: string;
  price: number;
  sold: boolean;
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, PetCardComponent, HighlightDirective],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {

  // --- Szöveg interpoláció példák ---
  title = '🐾 Emoji Pet Shop';        // {{ title }}

  // --- Kétirányú kötés: keresőmező ---
  searchText = '';                    // [(ngModel)]="searchText"

  // --- Tulajdonságkötés és állapot ---
  coins = 10;                         // pénz a "vásárláshoz"; [disabled], [attr.aria-label]

  // --- Lista a gyerek komponensekhez (@Input-okkal) https://emojipedia.org/nature  ---
  pets: Pet[] = [
    { name: 'Bunny',   emoji: '🐰', price: 4, sold: false },
    { name: 'Kitty',   emoji: '🐱', price: 5, sold: false },
    { name: 'Panda',   emoji: '🐼', price: 6, sold: false },
    { name: 'Hamster', emoji: '🐹', price: 3, sold: false },
    { name: 'Fish',    emoji: '🐟', price: 2, sold: false },
    { name: 'Zebra',   emoji:'🦓',  price: 100, sold: false },
  ];

  // Szűrt nézet (egyszerű egyirányú adatfolyam: komponens -> template)
  get filteredPets(): Pet[] {
    const t = this.searchText.toLowerCase().trim();
    return this.pets.filter(p => p.name.toLowerCase().includes(t));
  }

  // --- Eseménykötés: a gyerek komponens "vásárlás" jelzésére reagálunk (@Output) ---
  onBuyPet(petName: string, price: number) {
    // Ha elég a pénz:
    if (this.coins >= price) {
      this.coins -= price;
      // megjelöljük eladva-ként
      const p = this.pets.find(x => x.name === petName);
      if (p) p.sold = true;
      alert(`You bought ${petName}! 🎉`);
    } else {
      alert(`Not enough coins for ${petName} 😿`);
    }
  }

  // --- Eseménykötés: "add coins" gomb ---
  addCoins(amount: number) {
    this.coins += amount;
  }
}
