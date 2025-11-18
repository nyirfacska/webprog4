// Ez a komponens fogja:
// - meghívni a UserService-t
// - eltárolni az API-tól érkező adatokat
// - továbbadni a HTML sablonnak, hogy megjelenítse

import { Component, OnInit } from '@angular/core';
// CommonModule: ngIf, ngFor direktívák miatt kell
import { CommonModule } from '@angular/common';
import {UserService} from '../../services/user';
// Saját service importja

@Component({
  // HTML-ben így tudjuk használni: <app-users></app-users>
  selector: 'app-users',

  // standalone: true -> ez egy önálló komponens, nem kell module-hoz regisztrálni
  standalone: true,

  // Itt adjuk meg, milyen Angular modulokra / komponensekre van szükség a template-ben
  // Most csak a CommonModule kell az *ngIf és *ngFor miatt
  imports: [CommonModule],

  // A komponens nézetének (HTML) elérési útvonala
  templateUrl: './users.html',

  // Opcionális: ha szeretnél saját stílusfájlt ehhez a komponenshez, itt megadhatod
  // styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  // Ebben a tömbben fogjuk tárolni az API-tól érkező felhasználókat
  users: any[] = [];

  // A service példányát az Angular automatikusan beadja (dependency injection)
  constructor(private userService: UserService) {}

  // A komponens életciklus függvénye
  // ngOnInit() akkor fut le, amikor a komponens betölt
  ngOnInit(): void {

    // Meghívjuk a service getUsers() függvényét
    // Ez egy Observable-t ad vissza, ezért subscribe-olnunk kell rá
    this.userService.getUsers().subscribe({

      // next: akkor fut le, amikor sikeresen megérkezik a válasz
      next: (data: any) => {
        // A dummyjson API a users kulcs alatt adja vissza a listát
        this.users = data.users;
        // Konzolra is kiírhatjuk, ellenőrzésképp
        console.log('Érkezett adatok:', this.users);
      },

      // error: hiba esetén fut le (pl. nincs internet, 404, 500 stb.)
      error: (err: any) => {
        console.error('API hiba:', err);
      }
      // complete: opcionális, ha szeretnél valamit futtatni a folyamat végén
      // complete: () => { console.log('Lekérés befejeződött'); }
    });
  }
}
