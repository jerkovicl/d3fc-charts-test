/* eslint-disable max-len */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsRoutingModule } from './charts-routing.module';
import { ChartsComponent } from './charts.component';
import { ChartComponent } from './components/chart/chart.component';

@NgModule({
  declarations: [ChartsComponent, ChartComponent],
  imports: [CommonModule, ChartsRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [],
})
export class ChartsModule {}
