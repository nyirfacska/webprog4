// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';   // ⬅ src/app/app.ts exportálja az AppComponent-et

bootstrapApplication(AppComponent)
  .catch(err => console.error(err));
