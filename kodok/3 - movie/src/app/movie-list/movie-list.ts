import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';   // *ngIf, *ngFor
import { FormsModule } from '@angular/forms';     // [(ngModel)]
import { MovieService, Movie } from '../movie';
import { HoverCardDirective } from '../directives/hover-card';
import {TotalDurationPipe} from '../pipes/total-duration-pipe';

// UI: szerkezeti direktívák, pipe-ok, események, direktíva
@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TotalDurationPipe, HoverCardDirective],
  templateUrl: './movie-list.html'
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];     // megjelenítendő lista
  minRating = 0;            // szűrő

  constructor(private movieSvc: MovieService) {}       // DI: service beadása

  ngOnInit(): void { this.movies = this.movieSvc.getMovies(); } // induláskor adatbetöltés

  add(m: Movie)  { this.movieSvc.addToWatchlist(m); }  // gomb: watchlisthez ad
  clear()        { this.movieSvc.clearWatchlist(); }   // gomb: watchlist törlés
  get watchlist(){ return this.movieSvc.getWatchlist(); } // sablon hozzáfér a watchlisthez
}
