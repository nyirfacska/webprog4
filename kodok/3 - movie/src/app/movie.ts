import { Injectable } from '@angular/core';

// Adatmodellek: egy film és a watchlist sora
export interface Movie { id: number; title: string; rating: number; minutes: number; }
export interface WatchItem { movie: Movie; qty: number; }

// Service: itt élnek az adatok és a műveletek (komponensek csak használják)
@Injectable({ providedIn: 'root' })
export class MovieService {
  private movies: Movie[] = [
    { id: 1, title: 'Interstellar', rating: 9, minutes: 169 },
    { id: 2, title: 'The Lego Movie', rating: 8, minutes: 100 },
    { id: 3, title: 'Spider-Verse', rating: 9, minutes: 117 },
    { id: 4, title: 'Incredibles',  rating: 8, minutes: 115 },
  ];
  private watchlist: WatchItem[] = [];

  getMovies(): Movie[] { return this.movies; }           // olvasás
  getWatchlist(): WatchItem[] { return this.watchlist; } // watchlist olvasás

  addToWatchlist(movie: Movie) {                         // hozzáadás
    const row = this.watchlist.find(w => w.movie.id === movie.id);
    row ? row.qty++ : this.watchlist.push({ movie, qty: 1 });
  }
  clearWatchlist() { this.watchlist = []; }              // törlés
}
