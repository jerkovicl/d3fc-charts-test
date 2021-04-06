import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamingChartComponent } from './streaming-chart.component';

describe('StreamingChartComponent', () => {
  let component: StreamingChartComponent;
  let fixture: ComponentFixture<StreamingChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamingChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamingChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
