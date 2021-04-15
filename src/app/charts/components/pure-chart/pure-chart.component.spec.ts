import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PureChartComponent } from './pure-chart.component';

describe('PureChartComponent', () => {
  let component: PureChartComponent;
  let fixture: ComponentFixture<PureChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PureChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PureChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
