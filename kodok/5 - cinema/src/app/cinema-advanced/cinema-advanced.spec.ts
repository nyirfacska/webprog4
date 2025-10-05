import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CinemaAdvanced } from './cinema-advanced';

describe('CinemaAdvanced', () => {
  let component: CinemaAdvanced;
  let fixture: ComponentFixture<CinemaAdvanced>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CinemaAdvanced]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CinemaAdvanced);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
