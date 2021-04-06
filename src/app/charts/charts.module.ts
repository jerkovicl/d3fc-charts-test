/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable max-len */
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlotlyModule } from 'angular-plotly.js';
import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import { ChartsRoutingModule } from './charts-routing.module';
import { ChartsComponent } from './charts.component';
import { ChartComponent } from './components/chart/chart.component';
import { StreamingChartComponent } from './components/streaming-chart/streaming-chart.component';
PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [ChartsComponent, ChartComponent, StreamingChartComponent],
  imports: [CommonModule, ChartsRoutingModule, FormsModule, ReactiveFormsModule, PlotlyModule],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ChartsModule {}
