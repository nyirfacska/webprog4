/**
 * TaskFormComponent – új feladat felvitele:
 * - 3 mező: title (string), priority (enum string), status (enum string)
 * - [(ngModel)] kötés (FormsModule szükséges)
 * - submit() → TasksService.add() → mezők reset → alert
 */
import { Component } from '@angular/core';           // @Component
import { CommonModule } from '@angular/common';      // *ngIf, stb. (itt nem feltétlen kellene, de jó alap)
import { FormsModule } from '@angular/forms';        // ngModel-hez kell
import { TasksService } from '../../services/tasks'; // adatréteg
import { Task } from '../../models/task';            // típus

@Component({
  selector: 'app-task-form',                         // <app-task-form>
  standalone: true,                                  // standalone komponens
  imports: [CommonModule, FormsModule],              // ngModel használatához
  templateUrl: './task-form.html',                   // külön sablon
  styleUrls: ['./task-form.css']                     // külön stílus
})
export class TaskFormComponent {
  // Űrlap mezők (alapértékekkel):
  title = '';                                        // új feladat címe
  priority: Task['priority'] = 'medium';             // alap: medium
  status:   Task['status']   = 'todo';               // alap: todo

  // UI állapot: töltés jelzése a gomb tiltásához
  saving = false;

  constructor(private tasks: TasksService) {}        // DI: adatszerviz

  // Submit eseménykezelő
  async submit() {
    const t = this.title.trim();                     // whitespace levágása
    if (!t) {                                        // primitív validáció
      alert('Adj meg címet!');
      return;
    }
    this.saving = true;                              // gomb tiltása
    await this.tasks.add({                           // TasksService.add → mentés + changes$ jelzés
      title: t,
      priority: this.priority,
      status: this.status
    });
    this.saving = false;                             // gomb engedése

    // Űrlap mezők resetelése alapra
    this.title = '';
    this.priority = 'medium';
    this.status = 'todo';

    alert('Feladat hozzáadva!');                     // egyszerű visszajelzés
  }
}
