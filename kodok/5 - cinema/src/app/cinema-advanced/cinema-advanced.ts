import {Component, OnDestroy} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { of, Subscription, timer } from 'rxjs';
import { map } from 'rxjs/operators';

/*
  =======================================================
  🎬 CINEMA BOOKING – REAKTÍV ŰRLAP (OKTATÓI PÉLDA)
  -------------------------------------------------------
  Oktatási fókusz:
   - FormGroup + FormArray (checkbox rács székekhez)
   - Egyedi validator (ülések száma = jegyszám)
   - Űrlapszintű validator (Student jegy -> studentId kell)
   - Aszinkron kupon ellenőrzés (updateOn: 'blur')
   - Dinamikus árkalkuláció (jegytípus * üléskategória)
*/

type TicketType = 'adult' | 'student' | 'child';
type SeatClass = 'standard' | 'premium' | 'vip';

interface PriceTable {
  ticketBase: Record<TicketType, number>;
  seatMultiplier: Record<SeatClass, number>;
}
@Component({
  selector: 'app-cinema-advanced',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cinema-advanced.html',
  styleUrl: './cinema-advanced.css'
})
export class CinemaAdvancedComponent implements OnDestroy {
  // 1) Ártábla (egyszerű példa)
  prices: PriceTable = {
    ticketBase: {
      adult: 2800,
      student: 2200,
      child: 1800,
    },
    seatMultiplier: {
      standard: 1.0,
      premium: 1.25,
      vip: 1.6,
    },
  };

  // 2) “Adatbázis” a filmekhez/időpontokhoz/ülésekhez
  movies = ['Interstellar', 'Inception', 'Oppenheimer', 'Dune: Part Two'];
  times = ['16:00', '18:30', '20:45'];

  // Ülőhelyek rácsa (3 sor * 8 oszlop, külön seatClass mezővel)
  seatMap: { label: string; class: SeatClass }[][] = [
    // Sor A – Standard
    Array.from({ length: 8 }, (_, i) => ({ label: `A${i + 1}`, class: 'standard' })),
    // Sor B – Premium
    Array.from({ length: 8 }, (_, i) => ({ label: `B${i + 1}`, class: 'premium' })),
    // Sor C – VIP
    Array.from({ length: 8 }, (_, i) => ({ label: `C${i + 1}`, class: 'vip' })),
  ];

  // 3) Űrlap modell
  form = new FormGroup(
    {
      customer: new FormGroup({
        name: new FormControl<string>('', {
          nonNullable: true,
          validators: [Validators.required, Validators.minLength(2)],
        }),
        email: new FormControl<string>('', {
          nonNullable: true,
          validators: [Validators.required, Validators.email],
        }),
        studentId: new FormControl<string>('', { nonNullable: true }),
      }),

      booking: new FormGroup({
        movie: new FormControl<string>(this.movies[0], { nonNullable: true }),
        time: new FormControl<string>(this.times[0], { nonNullable: true }),
        ticketType: new FormControl<TicketType>('adult', { nonNullable: true }),
        count: new FormControl<number>(2, {
          nonNullable: true,
          validators: [Validators.required, Validators.min(1), Validators.max(6)],
        }),

        // Ülőhelyek: 3*8 = 24 darab checkbox → FormArray<boolean>
        seats: new FormArray(
          Array.from({ length: 24 }, () => new FormControl<boolean>(false, { nonNullable: true })),
          [] // egyedi validátort a legvégén kötünk rá (count függ)
        ),
      }),

      payment: new FormGroup({
        coupon: new FormControl<string>('', {
          nonNullable: true,
          asyncValidators: [(c) => this.validateCouponAsync(c)],
          updateOn: 'blur',
        }),
      }),
    },
    {
      validators: [
        // űrlapszintű validátor: ha student jegy van -> studentId kötelező
        (group: AbstractControl): ValidationErrors | null => {
          const ticketType = group.get('booking.ticketType')?.value as TicketType;
          const studentId = (group.get('customer.studentId')?.value as string)?.trim();
          if (ticketType !== 'student') return null;
          return studentId ? null : { studentIdRequired: true };
        },
      ],
    }
  );

  // 4) Állapotok összegzéshez
  totalHuf = 0;
  summary = '';
  private sub?: Subscription;

  // Kuponok (ál-szerver)
  coupons: Record<string, { type: 'percent' | 'flat'; value: number }> = {
    SAVE15: { type: 'percent', value: 15 }, // -15%
    FLAT1000: { type: 'flat', value: 1000 }, // -1000 Ft
  };

  constructor() {
    // a) dinamikus egyedi validátor (ülések darabszáma = count)
    this.applySeatsCountValidator();

    // b) élő kalkuláció
    this.sub = this.form.valueChanges.subscribe(() => {
      this.totalHuf = this.computeTotal();
      this.summary = this.buildSummary();
    });

    // induló értékek
    this.totalHuf = this.computeTotal();
    this.summary = this.buildSummary();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  // ---------- GET-ek a kényelemért ----------
  get seats(): FormArray {
    return this.form.get('booking.seats') as FormArray;
  }
  get countCtrl(): FormControl<number> {
    return this.form.get('booking.count') as FormControl<number>;
  }
  get ticketCtrl(): FormControl<TicketType> {
    return this.form.get('booking.ticketType') as FormControl<TicketType>;
  }
  get couponCtrl(): FormControl<string> {
    return this.form.get('payment.coupon') as FormControl<string>;
  }

  // ---------- Egyedi validátor: seats == count ----------
  private seatsEqualsCountValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const seats = control.get('booking.seats') as FormArray;
      const count = (control.get('booking.count') as FormControl<number>).value;
      const selected = seats.controls.filter((c) => c.value === true).length;
      return selected === count ? null : { seatCountMismatch: true };
    };
  }

  private applySeatsCountValidator() {
    // űrlapszintre tesszük, mert több mezőt érint
    const existing = (this.form.validator ? [this.form.validator] : []).concat(this.seatsEqualsCountValidator());
    this.form.setValidators(existing);
    // amikor count változik, jelezzük a seats-nek is, hogy újraértékeljen
    this.countCtrl.valueChanges.subscribe(() => {
      this.form.updateValueAndValidity({ emitEvent: true });
    });
    // és a seats valueChanges is triggerelje (pl. checkbox kattintások)
    this.seats.valueChanges.subscribe(() => {
      this.form.updateValueAndValidity({ emitEvent: false });
    });
  }

  // ---------- Aszinkron kupon ellenőrzés ----------
  validateCouponAsync(control: AbstractControl) {
    const code = (control.value as string)?.trim().toUpperCase();
    if (!code) return of(null);
    return timer(1000).pipe(map(() => (this.coupons[code] ? null : { invalidCoupon: true })));
  }

  // ---------- Ár kalkuláció ----------
  computeTotal(): number {
    const type = this.ticketCtrl.value;
    const base = this.prices.ticketBase[type];

    // kiválasztott székek + azok osztályai (Standard/Premium/VIP)
    const chosenSeatClasses: SeatClass[] = this.getChosenSeatClasses();

    // jegyszám
    const n = this.countCtrl.value;

    // védelem: ha nem egyezik, a kiválasztott ülés számát tekintjük
    const ticketCount = Math.min(n, chosenSeatClasses.length);

    // darabonkénti ár szorzóval
    let total = 0;
    for (let i = 0; i < ticketCount; i++) {
      const seatClass = chosenSeatClasses[i];
      const mult = this.prices.seatMultiplier[seatClass];
      total += Math.round(base * mult);
    }

    // kupon
    const code = this.couponCtrl.value?.trim().toUpperCase();
    const def = code ? this.coupons[code] : undefined;
    if (def) {
      if (def.type === 'percent') total = Math.round(total * (1 - def.value / 100));
      else total = Math.max(0, total - def.value);
    }

    return total;
  }

  private getChosenSeatClasses(): SeatClass[] {
    // seats: 0..23 index → seatMap [r][c] 3*8
    const chosen: SeatClass[] = [];
    this.seats.controls.forEach((ctrl, idx) => {
      if (ctrl.value === true) {
        const r = Math.floor(idx / 8);
        const c = idx % 8;
        chosen.push(this.seatMap[r][c].class);
      }
    });
    return chosen;
  }

  // ---------- Összegző szöveg ----------
  buildSummary(): string {
    const movie = this.form.get('booking.movie')?.value;
    const time = this.form.get('booking.time')?.value;
    const type = this.ticketCtrl.value;
    const count = this.countCtrl.value;
    const seats = this.getChosenSeatLabels().join(', ') || '—';
    const coupon = this.couponCtrl.value?.trim() ? ` (coupon: ${this.couponCtrl.value.toUpperCase()})` : '';
    return `🎟️ ${count} × ${type.toUpperCase()} for "${movie}" at ${time}, seats: [${seats}]${coupon}`;
  }

  private getChosenSeatLabels(): string[] {
    const labels: string[] = [];
    this.seats.controls.forEach((ctrl, idx) => {
      if (ctrl.value === true) {
        const r = Math.floor(idx / 8);
        const c = idx % 8;
        labels.push(this.seatMap[r][c].label);
      }
    });
    return labels;
  }

  // ---------- Submit ----------
  submitted = false;
  serverMsg = '';

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      this.serverMsg = '⚠️ Kérlek javítsd a hibákat a beküldés előtt.';
      return;
    }
    this.serverMsg = '⏳ Rendelés küldése...';

    // “Szerver” szimuláció
    of(this.form.value)
      .pipe(map((v) => v))
      .subscribe(() => {
        this.serverMsg = `✅ Rendelés rögzítve! Végösszeg: ${this.totalHuf} Ft. Jó szórakozást! 🍿`;
        // űrlap alaphelyzet
        this.form.reset({
          customer: { name: '', email: '', studentId: '' },
          booking: {
            movie: this.movies[0],
            time: this.times[0],
            ticketType: 'adult',
            count: 2,
            seats: Array.from({ length: 24 }, () => false),
          },
          payment: { coupon: '' },
        });
        this.submitted = false;
        this.totalHuf = this.computeTotal();
        this.summary = this.buildSummary();
      });
  }

  protected readonly Math = Math;
}
