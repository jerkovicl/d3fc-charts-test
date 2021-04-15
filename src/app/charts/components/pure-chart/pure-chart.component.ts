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
    const layout = {
      title: "Responsive to window's size!",
      font: { size: 18 },
      xaxis: { zeroline: true, showline: true, range: [0, 610] },
      yaxis: { range: [-100, -50] },
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
    const config = {
      staticPlot: false,
      responsive: true,
    };

    Plotly.newPlot(this.chartEl.nativeElement, data, layout, config);
  }

  private negativeRandomNumber(m: number, n: number) {
    return Math.floor(Math.random() * (n - m + 1)) + m;
  }

  private generateNegativeRandomNumbersArray() {
    const arrayLength = 600;
    const newArray = [];

    for (let i = 0; i < arrayLength; i++) {
      const y = this.negativeRandomNumber(-80, -70);
      newArray[i] = y;
    }
    return newArray;
  }

  public simulateRealtime(): void {
    console.log('chart', this.chartEl.nativeElement);
    const chartEl = this.chartEl.nativeElement;
    setInterval(() => {
      const array = this.generateNegativeRandomNumbersArray();
      const data = {
        y: array, //keeping the length same
        name: 'PSD',
        type: 'scattergl', //this very important to activate WebGL
        mode: 'line', //other properties can be found in the docs.
      } as any;
      const data_update: Data = {
        y: [array],
        type: 'scattergl',
        mode: 'lines',
      };

      const layout = {
        title: 'Update',
      };

      const config = {
        staticPlot: false,
        responsive: true,
      };
      // Plotly.update(chartEl, data_update, layout);
      Plotly.react(chartEl, [data], layout, config);
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
