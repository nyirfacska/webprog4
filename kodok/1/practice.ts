/* 
  ==============================================
  BEVÁSÁRLÓLISTA – EGYSZERŰ TYPESCRIPT PÉLDA
  ==============================================

*/



function repeatStr(ch: string, count: number): string {
  // new Array(count + 1).join(ch) -> a join a 'lyukakat' is közé szúrja,
  // így 'ch' pontosan 'count' alkalommal ismétlődik.
  return new Array(count + 1).join(ch);
}


function padEndStr(s: string, width: number): string {
  var len = s.length;
  // Ha a szöveg már eléri a kívánt szélességet, változatlanul adjuk vissza.
  // Különben kiegészítjük (width - len) darab szóközzel a végén.
  return len >= width ? s : s + repeatStr(" ", width - len);
}

/* -----------------------------------------------------------------
   Enum: VAT (ÁFA kulcsok)
   Miért enum?
   - Olvashatóbb (VAT.Standard a "27" helyett).
   - Típusbiztonság: csak a felsorolt értékek megengedettek.
------------------------------------------------------------------- */
enum VAT {
  Zero = 0,       // 0% ÁFA – példa
  Reduced = 5,    // 5% ÁFA – példa (pl. alapélelmiszerek)
  Standard = 27,  // 27% ÁFA – HU általános kulcs
}

/* -----------------------------------------------------------------
   Interface: Item (bevásárló tétel szerződés)
   Miért interface?
   - Deklaráljuk, milyen mezői KELL legyenek egy tételnek,
     és melyik lehet opcionális (discountPercent).
------------------------------------------------------------------- */
interface Item {
  name: string;             // Terméknév (pl. "Kenyér")
  netUnitPrice: number;     // Nettó egységár (Ft)
  qty: number;              // Mennyiség (lehet tört is: 1.2 kg alma)
  vat: VAT;                 // ÁFA-kulcs (enum)
  discountPercent?: number; // Opcionális tétel-kedvezmény (%)
}

/* -----------------------------------------------------------------
   Union típus: Coupon
   Miért union?
   - A kupon háromféle lehet: nincs / %-os / fix összegű.
   - Diszkriminált union: a 'type' mező alapján váltunk ágat.
------------------------------------------------------------------- */
type Coupon =
  | { type: "none" }
  | { type: "percent"; value: number } // pl. 10 -> -10%
  | { type: "fixed"; value: number };  // pl. 500 -> -500 Ft

/* -----------------------------------------------------------------
   Tároló: cart (bevásárlólista)
   Miért const?
   - A változó referencia konstans (nem mutat máshova), de a TARTALMA
     (push, splice, stb.) módosítható – ez kényelmes és elég ide.
------------------------------------------------------------------- */
const cart: Item[] = [];

/* -----------------------------------------------------------------
   addItem: tétel hozzáadása guardokkal
   Miért guard?
   - Alapvető adatminőség: ne lehessen 0/negatív mennyiséget vagy negatív árat felvenni.
   - Ha hiba van, NEM dobunk kivételt, csak figyelmeztetünk és kihagyjuk.
------------------------------------------------------------------- */
function addItem(item: Item): void {
  if (item.qty <= 0) {
    console.warn("⚠️ " + item.name + " mennyisége nem lehet 0 vagy negatív.");
    return; // hibás adat → nem tesszük be
  }
  if (item.netUnitPrice < 0) {
    console.warn("⚠️ " + item.name + " nettó ára nem lehet negatív.");
    return; // hibás adat → nem tesszük be
  }
  cart.push(item); // valid → mehet a kosárba
}

/* -----------------------------------------------------------------
   grossUnitPrice: bruttó EGYSÉGÁR számítása
   Képlet: bruttó_egységár = nettó_egységár * (1 + ÁFA/100)
   Miért külön függvény?
   - Újrafelhasználható és külön tesztelhető.
------------------------------------------------------------------- */
function grossUnitPrice(item: Item): number {
  var vatFactor = 1 + item.vat / 100;           // pl. 27% → 1.27
  return round(item.netUnitPrice * vatFactor);  // 2 tizedesre kerekítve
}

/* -----------------------------------------------------------------
   itemGrossTotal: tétel TELJES bruttó ára
   Lépések:
   1) bruttó egységár * mennyiség = alap
   2) ha van tétel-kedvezmény (%), azt levonjuk
   3) kerekítés (pénz: 2 tizedes)
------------------------------------------------------------------- */
function itemGrossTotal(item: Item): number {
  var base = grossUnitPrice(item) * item.qty;                 // mennyiséggel felszorozva
  var discount = item.discountPercent ? base * (item.discountPercent / 100) : 0;
  return round(base - discount);
}

/* -----------------------------------------------------------------
   cartGrossTotal: KOSÁR bruttó végösszeg (tétel-kedvezmények után)
   Miért ciklussal?
   - Didaktikusan jól követhető (reduce helyett), de az elv ugyanaz.
------------------------------------------------------------------- */
function cartGrossTotal(): number {
  var sum = 0;
  for (var i = 0; i < cart.length; i++) {
    sum += itemGrossTotal(cart[i]);
  }
  return round(sum);
}

/* -----------------------------------------------------------------
   applyCoupon: kupon alkalmazása a VÉGÖSSZEGEN
   Ágak:
   - percent: total - total * (value/100)
   - fixed:   total - value
   - none:    változatlan
   clampMoney:
   - soha ne menjen 0 Ft alá (negatív fizetendő ne legyen).
------------------------------------------------------------------- */
function applyCoupon(total: number, coupon: Coupon): number {
  if (coupon.type === "percent") return clampMoney(total - total * (coupon.value / 100));
  if (coupon.type === "fixed")   return clampMoney(total - coupon.value);
  return total; // none
}

/* -----------------------------------------------------------------
   Pénzügyi segédek: round & clampMoney
   round(n):
     - 2 tizedesre kerekít (Ft-nál ennyi bőven elég a példához)
   clampMoney(n):
     - alsó korlát 0 (védelem: extrém kupon / hibás adat ellen)
------------------------------------------------------------------- */
function round(n: number): number {
  return Math.round(n * 100) / 100;
}

function clampMoney(n: number): number {
  return round(Math.max(0, n));
}

/* -----------------------------------------------------------------
   printCart: táblázatszerű kiírás a konzolra
   Miért saját padEnd/repeat?
   - Itt különösen fontos az olvashatóság: oszlopok, fejlécek.
   - A saját segédfüggvényekkel (padEndStr, repeatStr) régi ES-célokra is jó.
------------------------------------------------------------------- */
function printCart(coupon: Coupon): void {
  console.log("\n=== BEVÁSÁRLÓLISTA ===");
  // Fejléc oszlopok fix szélességgel (18/18/6)
  console.log(
    padEndStr("Név", 18),
    padEndStr("Egységár(bruttó)", 18),
    "Menny.",
    "Tétel összesen (Ft)"
  );
  console.log(repeatStr("-", 70)); // elválasztó vonal

  // Tételsorok
  for (var i = 0; i < cart.length; i++) {
    var it = cart[i];
    var line = [
      padEndStr(it.name, 18),                                     // 1. oszlop: terméknév
      padEndStr(grossUnitPrice(it).toFixed(2) + " Ft", 18),       // 2. oszlop: bruttó egységár
      padEndStr(String(it.qty), 6),                               // 3. oszlop: mennyiség (sztringgé alakítva)
      itemGrossTotal(it).toFixed(2) + " Ft"                       // 4. oszlop: tétel bruttó összesen
        + (it.discountPercent ? "  (-" + it.discountPercent + "% kedv.)" : "")
    ];
    console.log(line.join("  ")); // minimális távolság az oszlopok között
  }

  console.log(repeatStr("-", 70));

  // Részösszeg (tétel-kedvezmények után)
  var subtotal = cartGrossTotal();
  console.log("Részösszeg:", subtotal.toFixed(2), "Ft");

  // Kupon alkalmazása
  var final = applyCoupon(subtotal, coupon);
  if (coupon.type !== "none") {
    var note = coupon.type === "percent"
      ? ("Kupon: -" + coupon.value + "%")
      : ("Kupon: -" + coupon.value + " Ft");
    console.log(note);
  }

  // Fizetendő
  console.log("Fizetendő:", final.toFixed(2), "Ft\n");
}

/* -----------------------------------------------------------------
   Demo főprogram
   Lépések:
   1) Példatételek felvétele (különböző ÁFA és kedvezmény variációkkal)
   2) Kupon kiválasztása (percent/fixed/none – komment ki/be)
   3) Kosár kiírása
   4) Mini "analitika": legdrágább bruttó egységárú tétel
   5) Szűrés: 27%-os ÁFA-s tételek listája
------------------------------------------------------------------- */
function main() {
  // 1) Tételek – valószerű adatok
  addItem({ name: "Kenyér",    netUnitPrice: 400, qty: 2,   vat: VAT.Reduced });
  addItem({ name: "Tej 1,5%",  netUnitPrice: 380, qty: 3,   vat: VAT.Reduced });
  addItem({ name: "Csoki",     netUnitPrice: 520, qty: 1,   vat: VAT.Standard, discountPercent: 10 });
  addItem({ name: "Alma",      netUnitPrice: 500, qty: 1.2, vat: VAT.Zero });

  // 2) Kupon – válassz egyet (egy sort hagyj aktívan)
  var coupon: Coupon = { type: "percent", value: 10 }; // %-os kupon
  // var coupon: Coupon = { type: "fixed", value: 500 }; // fix összegű
  // var coupon: Coupon = { type: "none" };              // nincs kupon

  // 3) Kiírás
  printCart(coupon);

  // 4) Mini analitika: legdrágább bruttó egységárú tétel
  var mostExpensive = cart[0];
  for (var i = 1; i < cart.length; i++) {
    if (grossUnitPrice(cart[i]) > grossUnitPrice(mostExpensive)) {
      mostExpensive = cart[i];
    }
  }
  console.log(
    "Legdrágább termék bruttó egységáron:",
    mostExpensive.name, "-",
    grossUnitPrice(mostExpensive).toFixed(2), "Ft"
  );

  // 5) Szűrés: 27%-os ÁFA-s tételek nevei
  var highVATNames: string[] = [];
  for (var j = 0; j < cart.length; j++) {
    if (cart[j].vat === VAT.Standard) highVATNames.push(cart[j].name);
  }
  console.log("27%-os ÁFA-s tételek:", highVATNames.length ? highVATNames.join(", ") : "nincs");
}

main();