import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D3fcChartComponent } from './d3fc-chart.component';

describe('D3fcChartComponent', () => {
  let component: D3fcChartComponent;
  let fixture: ComponentFixture<D3fcChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ D3fcChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(D3fcChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
