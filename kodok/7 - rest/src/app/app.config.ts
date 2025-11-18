// Az Angular 17 standalone világában az ApplicationConfig segítségével
// adjuk meg az alkalmazás globális szolgáltatásait:
// - routing
// - HttpClient
// - stb.

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
// HttpClient szolgáltató: ezzel érjük el a HttpClient-et modul nélkül
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  // providers: ide soroljuk a "globális" szolgáltatókat
  providers: [
    // Routing bekapcsolása a fenti routes tömb alapján
    provideRouter(routes),

    // HttpClient bekapcsolása (ez váltja ki a régi HttpClientModule importot)
    provideHttpClient()
  ]
};
