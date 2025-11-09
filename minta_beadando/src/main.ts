/**
 * Az Angular alkalmazás belépési pontja (standalone bootstrap).
 */
import { bootstrapApplication } from '@angular/platform-browser'; // standalone bootstrap függvény
import { appConfig } from './app/app.config';                     // globális providerek (HttpClient)
import { App } from './app/app';                                  // a saját root komponens (nem app.component.ts)

bootstrapApplication(App, appConfig)  // Root komponens indítása megadott globális configgal
  .catch(err => console.error(err));  // Hibalog, ha a bootstrap során bármi gond van
