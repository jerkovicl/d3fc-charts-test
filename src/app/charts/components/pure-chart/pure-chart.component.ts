/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { AfterViewInit, ChangeDetectionStrategy, Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import Plotly from 'plotly.js-dist';
import { catchError, map, tap } from 'rxjs/operators';
import { ISimplifyObjectPoint, Simplify } from 'simplify-ts';
import { WebsocketService } from '../../services/websocket.service';
import { IMeasurement } from '../chart/measurement.model';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-pure-chart',
  templateUrl: './pure-chart.component.html',
  styleUrls: ['./pure-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PureChartComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('chartEl')
  chartEl!: any;
  public deviceId = new FormControl('fes01:Sat-01');

  public layout: Partial<Plotly.Layout> = {
    autosize: false,
    showlegend: false,
    title: 'SkymonNG',
    xaxis: {
      zeroline: true,
      showline: true,
      showgrid: false,
      range: [0, 610],
      tickmode: 'linear',
      tick0: 0,
      dtick: 50,
    },
    yaxis: {
      showgrid: false,
      range: [-100, -50],
      tickmode: 'linear',
      tick0: -100,
      dtick: 10,
    },
    width: 700,
    height: 300,
    hovermode: false,
    dragmode: false,
  };

  public data: Plotly.Data[] = [
    {
      x: [0],
      y: [0],
      type: 'scattergl',
      mode: 'lines',
      line: {
        color: 'blue',
        width: 1,
      },
      hoverinfo: 'none',
    },
  ];

  public config: Partial<Plotly.Config> = {
    staticPlot: false,
    responsive: false,
    displayModeBar: false,
    displaylogo: false,
  };
  public interval: any;

  public data$: any = this.websocketService.messages$.pipe(
    map((data: any) => data),
    catchError((error) => {
      throw error;
    }),
    tap({
      error: (error: any) => console.log('Error:', error),
      complete: () => console.log('Connection Closed'),
    })
  );

  constructor(private websocketService: WebsocketService, private ngZone: NgZone) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initPlot();
  }

  connect(): void {
    // this.simulateRealtime();
    this.renderChart();
  }

  close(): void {
    console.log('close');
    this.websocketService.close();
  }
  private initPlot(): void {
    Plotly.newPlot(this.chartEl.nativeElement, this.data, this.layout, this.config);
  }

  private negativeRandomNumber(m: number, n: number): number {
    return Math.floor(Math.random() * (n - m + 1)) + m;
  }

  private generateNegativeRandomNumbersArray(from: number, to: number): number[] {
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
    const xarray = this.generateNegativeRandomNumbersArray(-80, -70).map((x, i) => i);
    const objArray = this.generateNegativeRandomNumbersArray(-80, -70).map((value, index) => {
      return { x: index, y: value };
    });
    const points: ISimplifyObjectPoint[] = objArray;
    const tolerance = 0.5;
    const highQuality = true;

    const simplified_result = Simplify(points, tolerance, highQuality);
    const simplifyx = simplified_result.map((v) => v.x);
    const simplifyy = simplified_result.map((v) => v.y);
    this.ngZone.runOutsideAngular(() => {
      this.interval = window.setInterval(() => {
        const array = this.generateNegativeRandomNumbersArray(-80, -70);
        const max_array = this.generateNegativeRandomNumbersArray(-60, -50);
        const min_array = this.generateNegativeRandomNumbersArray(-100, -90);

        // console.log('simplify', array, simplified_result);

        const data: Plotly.Data[] = [
          {
            x: simplifyx,
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
            x: simplifyx,
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
            x: simplifyx,
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
        // const data_update: Data = {
        //   y: [array],
        //   type: 'scattergl',
        //   mode: 'lines',
        // };

        // Plotly.update(chartEl, data_update, layout);
        Plotly.react(chartEl, data, this.layout, this.config);
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
    });
  }

  public renderChart(): void {
    this.websocketService.connect({ reconnect: false }, this.deviceId.value);
    const chartEl = this.chartEl.nativeElement;

    this.data$.pipe(untilDestroyed(this)).subscribe(
      (response: IMeasurement) => {
        // console.log('RESPONSE --> ', response);

        if (response) {
          const data: Plotly.Data[] = [
            {
              y: response.PSD_MEAS,
              name: 'PSD',
              type: 'scattergl',
              mode: 'lines',
              line: {
                color: 'blue',
                width: 1,
                simplify: true,
              },
              hoverinfo: 'none',
            },
            {
              y: response.MAX_MEAS,
              // xaxis: 'x',
              name: 'Max',
              type: 'scattergl',
              mode: 'lines',
              line: {
                color: 'green',
                width: 1,
                simplify: true,
              },
              hoverinfo: 'none',
            },
            {
              y: response.MIN_MEAS,
              // xaxis: 'x',
              name: 'Min',
              type: 'scattergl',
              mode: 'lines',
              line: {
                color: 'red',
                width: 1,
                simplify: true,
              },
              hoverinfo: 'none',
            },
          ];
          Plotly.react(chartEl, data, this.layout, this.config);
        }
      },
      (error: any) => {
        console.log('error', error);
      },
      () => {
        console.log('observable is now completed.');
      }
    );
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
