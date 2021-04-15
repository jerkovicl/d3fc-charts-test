import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartsComponent } from './charts.component';
import { PureChartComponent } from './components/pure-chart/pure-chart.component';

const routes: Routes = [
  {
    path: '',
    component: ChartsComponent,
    children: [
      {
        path: 'chart',
        component: PureChartComponent,
      },
      {
        path: '',
        redirectTo: 'chart',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChartsRoutingModule {}
