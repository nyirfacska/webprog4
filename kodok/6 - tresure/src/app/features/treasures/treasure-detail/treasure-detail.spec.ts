import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreasureDetail } from './treasure-detail';

describe('TreasureDetail', () => {
  let component: TreasureDetail;
  let fixture: ComponentFixture<TreasureDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreasureDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreasureDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
