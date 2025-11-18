// Ez az alkalmazás "kerete", a root komponens.
// Az index.html-ben az <app-root> elem lesz a belépési pont,
// és ezen belül jelenik meg a router-outlet (az aktuális oldal).

import { Component } from '@angular/core';
// RouterOutlet: oda tölti be az Angular az aktuális route szerinti komponenst
import { RouterOutlet } from '@angular/router';

@Component({
  // Ez a HTML tag neve, ami az index.html-ben szerepel
  selector: 'app-root',

  // Standalone root komponens
  standalone: true,

  // Itt adjuk meg, milyen modulokat / komponenseket használ a template
  imports: [RouterOutlet],

  // A komponens HTML sablonja külön fájlban van
  templateUrl: './app.html',

  // Opcionális stílusfájl a root komponenshez
  styleUrls: ['./app.css']
})
export class AppComponent {
  // Egy egyszerű cím, amit a template-ben kiírunk
  title = 'REST demo – Angular HttpClient';
}
