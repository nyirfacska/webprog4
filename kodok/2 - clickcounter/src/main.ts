// ---------------------------------------------------------------
// BOOTSTRAP – belépési pont
// ---------------------------------------------------------------
// Standalone világban a bootstrapApplication-nek adjuk át a root komponenst.
// Figyelj az export nevére: AppComponent-nek kell lennie az app.ts-ben.
// ---------------------------------------------------------------

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
