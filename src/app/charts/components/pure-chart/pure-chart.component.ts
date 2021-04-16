/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import Plotly, { Data } from 'plotly.js-dist';
import { IChart } from '../chart/chart.model';

@Component({
  selector: 'app-pure-chart',
  templateUrl: './pure-chart.component.html',
  styleUrls: ['./pure-chart.component.scss'],
})
export class PureChartComponent implements OnInit, AfterViewInit {
  @ViewChild('chartEl')
  chartEl!: any;

  public chartConfig: IChart = {
    data: [
      {
        x: [0],
        y: [0],
        type: 'scattergl',
        mode: 'lines',
        line: {
          // color: 'rgb(55, 128, 191)',
          width: 1,
        },
        hoverinfo: 'none',
      },
    ],
    layout: {
      autosize: true,
      showlegend: true,
      title: 'SkymonNG',
      interactiveConfig: { displayModeBar: false, displaylogo: false },
      xaxis: { zeroline: true, showline: true, rangemode: 'tozero', range: [0, 610] },
      yaxis: { range: [-100, -50] },
    },
  };

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initPlot();
  }

  connect() {
    this.simulateRealtime();
  }
  private initPlot() {
    // this.getTheme();

    // the layout.
    const layout: Partial<Plotly.Layout> = {
      autosize: false,
      showlegend: false,
      title: 'SkymonNG',
      xaxis: { zeroline: true, showline: true, showgrid: false, range: [0, 610] },
      yaxis: { showgrid: false, range: [-100, -50] },
      width: 700,
      height: 300,
      hovermode: false,
      dragmode: 'pan',
    };

    const trace1 = {
      x: [0],
      y: [0],
      type: 'scattergl',
      mode: 'lines',
      line: {
        // color: 'rgb(55, 128, 191)',
        width: 1,
      },
      hoverinfo: 'none',
    };

    // the data
    const data = [trace1] as any;

    // the config
    const config: Partial<Plotly.Config> = {
      staticPlot: false,
      responsive: false,
      displayModeBar: false,
      displaylogo: false,
    };

    Plotly.newPlot(this.chartEl.nativeElement, data, layout, config);
  }

  private negativeRandomNumber(m: number, n: number) {
    return Math.floor(Math.random() * (n - m + 1)) + m;
  }

  private generateNegativeRandomNumbersArray(from: number, to: number) {
    const arrayLength = 10000;
    const newArray = [];

    for (let i = 0; i < arrayLength; i++) {
      const y = this.negativeRandomNumber(from, to);
      newArray[i] = y;
    }
    // const points = Simplify.simplify(newArray, 1, false);
    // console.log('points', points);
    return newArray;
  }

  public simulateRealtime(): void {
    console.log('chart', this.chartEl.nativeElement);
    const chartEl = this.chartEl.nativeElement;
    setInterval(() => {
      const array = this.generateNegativeRandomNumbersArray(-80, -70);
      const max_array = this.generateNegativeRandomNumbersArray(-60, -50);
      const min_array = this.generateNegativeRandomNumbersArray(-100, -90);
      const data: Plotly.Data[] = [
        {
          y: array,
          name: 'PSD',
          type: 'scattergl',
          mode: 'lines',
          line: {
            // color: 'rgb(55, 128, 191)',
            width: 1,
            simplify: true,
          },
          hoverinfo: 'none',
        },
        {
          y: max_array,
          // xaxis: 'x',
          name: 'Max',
          type: 'scattergl',
          mode: 'lines',
          line: {
            // color: 'rgb(55, 128, 191)',
            width: 1,
            simplify: true,
          },
          hoverinfo: 'none',
        },
        {
          y: min_array,
          // xaxis: 'x',
          name: 'Min',
          type: 'scattergl',
          mode: 'lines',
          line: {
            // color: 'rgb(55, 128, 191)',
            width: 1,
            simplify: true,
          },
          hoverinfo: 'none',
        },
      ];
      const data_update: Data = {
        y: [array],
        type: 'scattergl',
        mode: 'lines',
      };

      const layout: Partial<Plotly.Layout> = {
        autosize: false,
        showlegend: false,
        title: 'SkymonNG',
        xaxis: { zeroline: true, showline: true, showgrid: false, range: [0, 610] },
        yaxis: { showgrid: false, range: [-100, -50] },
        width: 700,
        height: 300,
        hovermode: false,
        dragmode: 'pan',
        // grid: { rows: 3, columns: 1 },
      };

      const config: Partial<Plotly.Config> = {
        staticPlot: false,
        responsive: false,
        displayModeBar: false,
        displaylogo: false,
      };
      // Plotly.update(chartEl, data_update, layout);
      Plotly.react(chartEl, data, layout, config);
      // Plotly.restyle(chartEl, data_update);
      /* this.chartEl = Plotly.newPlot(
        chartEl,
        [data],
        {
          // autoexpand: true,
          autosize: true,
          width: window.innerWidth - 200,

          // margin: 0,
          // offset: 0,
          // type: 'scattergl',
          title: 'name', //Title of the graph
          hovermode: 'closest',
          xaxis: {
            linecolor: 'black',
            linewidth: 2,
            mirror: true,
            title: 'Time (s)',
            automargin: true,
          },
          yaxis: {
            linecolor: 'black',
            linewidth: 2,
            mirror: true,
            automargin: true,
            title: 'Any other Unit',
          },
        },
        {
          responsive: true,
          scrollZoom: true,
        }
      ); */
    }, 200);
  }
}
