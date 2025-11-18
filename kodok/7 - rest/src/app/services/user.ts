// A szolgáltatás (service) feladata:
// - elkülöníteni az API hívásokat a komponensektől
// - így a komponens "csak" adatot kér, nem tud az URL-ről, HTTP-ről stb.

import { Injectable } from '@angular/core';
// HttpClient: ezzel tudunk HTTP kéréseket küldeni (GET, POST, stb.)
import { HttpClient } from '@angular/common/http';
// Observable: aszinkron adatfolyam Angularban
import { Observable } from 'rxjs';

@Injectable({
  // providedIn: 'root' -> a service az egész alkalmazásban elérhető
  providedIn: 'root'
})
export class UserService {

  // Az API végpont URL-je (innen kérjük le az adatokat)
  private readonly API_URL = 'https://dummyjson.com/users';

  // Konstruktor: ide "szúrja be" (injectálja) az Angular a HttpClient példányt
  constructor(private http: HttpClient) { }

  // Ez a függvény GET kérést küld az API_URL-re
  // és visszaad egy Observable-t, amire a komponens fel tud iratkozni (subscribe)
  getUsers(): Observable<any> {
    // this.http.get(...) visszaad egy Observable-t a szerver válaszával
    return this.http.get(this.API_URL);
  }
}
