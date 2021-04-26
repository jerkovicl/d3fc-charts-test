/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable max-len */
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { PlotlyModule } from 'angular-plotly.js';
import { ChartsRoutingModule } from './charts-routing.module';
import { ChartsComponent } from './charts.component';
import { ChartComponent } from './components/chart/chart.component';
import { D3fcChartComponent } from './components/d3fc-chart/d3fc-chart.component';
import { PureChartComponent } from './components/pure-chart/pure-chart.component';
import { StreamingChartComponent } from './components/streaming-chart/streaming-chart.component';

// PlotlyModule.plotlyjs = Plotly;

@NgModule({
  declarations: [ChartsComponent, ChartComponent, StreamingChartComponent, D3fcChartComponent, PureChartComponent],
  imports: [CommonModule, ChartsRoutingModule, FormsModule, ReactiveFormsModule, FlexLayoutModule], // PlotlyModule
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ChartsModule {}
