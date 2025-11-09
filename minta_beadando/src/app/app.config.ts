/**
 * Globális alkalmazáskonfiguráció DI-hoz (Dependency Injection).
 * Itt kapcsoljuk be a HttpClient-et, hogy a service-ben használhassuk.
 */
import { ApplicationConfig } from '@angular/core';      // típus a konfigurációhoz
import { provideHttpClient } from '@angular/common/http'; // HttpClient provider factory

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient() // -> ettől lesz injektálható a HttpClient (TasksService-ben)
  ]
};
