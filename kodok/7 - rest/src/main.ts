// Ez a belépési pont az Angular alkalmazás számára.
// Itt indítjuk el (bootstrap) az AppComponentet az appConfig beállításokkal.

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
