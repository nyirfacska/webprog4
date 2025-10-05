import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {CinemaAdvancedComponent} from './cinema-advanced/cinema-advanced';

@Component({
  selector: 'app-root',
  standalone: true,            // ⬅️ standalone projekt
  imports: [CommonModule, ReactiveFormsModule, CinemaAdvancedComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = 'cinema-booking-demo';
}


