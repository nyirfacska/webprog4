# 0) (Ha még nincs Angular CLI) – az ng parancshoz szükséges
npm i -g @angular/cli

# 1) Új projekt létrehozása – routing nélkül, klasszikus CSS-sel
#    --routing=false  → nem kérünk Routert
#    --style=css      → a komponens stílusok .css fájlok lesznek
ng new kanban-todo --routing=false --style=css

# 2) Lépj be a projekt mappájába
cd kanban-todo

# 3) A CLI alapértelmezett root komponensét TÖRÖLJÜK,
#    mert mi "app.ts / app.html / app.css" néven szeretnénk a rootot.
rm src/app/app.component.ts src/app/app.component.html src/app/app.component.css

# 4) HOZD LÉTRE a root fájlokat (üresen is jó, mindjárt megkapod a tartalmat)
#    (Windows-on létrehozhatod a kedvenc editoroddal)
touch src/app/app.ts
touch src/app/app.html
touch src/app/app.css

# 5) Globális konfiguráció a HttpClient-hez (provider) – kézzel készítjük
touch src/app/app.config.ts

# 6) Modell interfész a feladatokhoz – CLI-vel generáljuk (pontos útvonal)
ng g interface models/task
# Eredmény: src/app/models/task.ts

# 7) Task szolgáltatás (TasksService) – API + localStorage + változás jelzés
#    --flat → ne hozzon létre külön mappát, közvetlenül a services-be tegye
ng g s services/tasks --flat
# Eredmény: src/app/services/tasks.service.ts

# 8) Pipe – cím szerinti keresés (standalone) – shared mappába
ng g p shared/title-filter --standalone
# Eredmény: src/app/shared/title-filter.pipe.ts

# 9) Direktíva – prioritás szerinti jelölés (standalone) – shared mappába
ng g d shared/priority-badge --standalone
# Eredmény: src/app/shared/priority-badge.directive.ts

# 10) FEATURE KOMPONENSEK – a CLI "board.component.*" és "task-form.component.*" néven hozza létre,
#     mi át fogjuk nevezni őket a kért névre: "board.ts/html/css" és "task-form.ts/html/css".
ng g c features/board --standalone
ng g c features/task-form --standalone
# Eredmények:
#   src/app/features/board/board.component.ts/html/css
#   src/app/features/task-form/task-form.component.ts/html/css

# 11) ÁTNEVEZÉS a kért fájlnevekre (Linux/Mac):
mv src/app/features/board/board.component.ts src/app/features/board/board.ts
mv src/app/features/board/board.component.html src/app/features/board/board.html
mv src/app/features/board/board.component.css src/app/features/board/board.css

mv src/app/features/task-form/task-form.component.ts src/app/features/task-form/task-form.ts
mv src/app/features/task-form/task-form.component.html src/app/features/task-form/task-form.html
mv src/app/features/task-form/task-form.component.css src/app/features/task-form/task-form.css

# (Windows-on egyszerűbb a fájlkezelőben átnevezni ugyanígy.)

# 12) (Esztétikához) – Google font (Poppins) hozzáadása a globális index.html-hez
#     Ezt NEM generáljuk paranccsal, csak beillesztjük kézzel a <head>-be:
#       src/index.html  → lásd lent a kódot.

# 13) Futtatás – ellenőrzéshez
ng serve
# Böngésző: http://localhost:4200