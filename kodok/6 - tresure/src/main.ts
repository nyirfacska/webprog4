/* ============================================================
FÁJL: src/main.ts
MIT CSINÁL:
- Bootstrappel: elindítja az AppComponent-et.
- Globálisan beköti a Routert (appRoutes) és a KeyService-t.
============================================================ */
import { bootstrapApplication } from '@angular/platform-browser';  // standalone bootstrap API
import { provideRouter } from '@angular/router';                   // router provider
import { appRoutes } from './app/app.routes';                      // útvonalak
import { AppComponent } from './app/app';                          // gyökér komponens
import { KeyService } from './app/core/key';                       // állapot szolgáltatás

bootstrapApplication(AppComponent, {                               // alkalmazás indítása
  providers: [
    provideRouter(appRoutes),                                       // router konfigurálása
    KeyService                                                      // KeyService root szinten
  ]
}).catch(err => console.error(err));                                // biztonsági hibalog
