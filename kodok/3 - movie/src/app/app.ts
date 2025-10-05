import { Component } from '@angular/core';
import {MovieListComponent} from './movie-list/movie-list';

// Root: csak komponál, üzleti logika nélkül
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MovieListComponent],
  templateUrl: './app.html'
})
export class AppComponent { title = 'Movie Night'; }
