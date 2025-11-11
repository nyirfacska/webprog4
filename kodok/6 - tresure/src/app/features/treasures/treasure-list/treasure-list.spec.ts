import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreasureList } from './treasure-list';

describe('TreasureList', () => {
  let component: TreasureList;
  let fixture: ComponentFixture<TreasureList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreasureList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreasureList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
