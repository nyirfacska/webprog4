# 0.1) Angular CLI (ha még nincs)
# - CLI eszközök telepítése globálisan
npm i -g @angular/cli

# 0.2) Új Angular projekt: standalone + CSS
# - standalone: nincsenek NgModule-ok
# - style=css: egyszerű, sima CSS
ng new treasure-router --standalone=true --style=css
cd treasure-router

# 0.3) Állapot szolgáltatás (KeyService)
# - a "kulcs" (hasKey) állapotát fogja kezelni
ng g s app/core/key --skip-tests

# 0.4) CanActivate guard (funkcionális)
# - belépési szabály: csak kulccsal mehetünk a védett részre
ng g guard app/core/guild-guard --functional --implements=CanActivate --skip-tests

# 0.5) Oldalak / feature komponensek
# - Home: nyitó oldal (nyílt)
ng g c app/pages/home --standalone --skip-tests
# - Treasures: védett listanézet
ng g c app/features/treasures/treasure-list --standalone --skip-tests
# - Treasure detail: védett részlet nézet (paraméteres)
ng g c app/features/treasures/treasure-detail --standalone --skip-tests

# 0.6) Shared: direktíva + pipe (játékos kiegészítések)
ng g directive app/shared/shine --standalone --skip-tests
ng g pipe app/shared/treasure-label-pipe --standalone --skip-tests

# 0.7) Fejlesztői szerver indítása (külön terminálban is futhat)
ng serve -o
