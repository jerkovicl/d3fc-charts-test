/* eslint-disable max-len */
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsRoutingModule } from './charts-routing.module';
import { ChartsComponent } from './charts.component';
import { ChartComponent } from './components/chart/chart.component';
import { StreamingChartComponent } from './components/streaming-chart/streaming-chart.component';

@NgModule({
  declarations: [ChartsComponent, ChartComponent, StreamingChartComponent],
  imports: [CommonModule, ChartsRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ChartsModule {}
