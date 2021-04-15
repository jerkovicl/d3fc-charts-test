/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PlotlyComponent, PlotlyService } from 'angular-plotly.js';
import { catchError, map, tap } from 'rxjs/operators';
import { WebsocketService } from '../../services/websocket.service';
import { IChart } from './chart.model';
import { IMeasurement } from './measurement.model';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent implements OnInit, AfterViewInit {
  @ViewChild('chartDiv')
  chartComponent!: PlotlyComponent;

  public deviceId = new FormControl('fes01:Sat-01');
  public x: any[] = [];
  public y: any[] = [];
  public chartData: any[] = [];
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
  public revision = 0;

  public chart: IChart = {
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

  constructor(
    private websocketService: WebsocketService,
    private plotlyService: PlotlyService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('init');
  }

  ngAfterViewInit(): void {
    console.log('afterViewInit');

    const plotly = this.plotlyService.getPlotly();
    const chart = this.chartComponent.plotEl.nativeElement;
    console.log('plotly chart element', chart, this.chartComponent, plotly);
    // this.websocketService.connect();
  }

  sendMessage(): void {
    console.log('sendMessage');
    this.websocketService.sendMessage('Test Message');
  }

  connect(): void {
    console.log('connect');
    this.websocketService.connect({ reconnect: false }, this.deviceId.value);
    const plotly = this.plotlyService.getPlotly();
    const chart = this.chartComponent.plotEl.nativeElement;

    this.simulateRealtime();

    this.data$.pipe(untilDestroyed(this)).subscribe(
      (response: IMeasurement) => {
        // console.log('RESPONSE --> ', response);

        if (response) {
          this.chart.data = [
            {
              y: response?.PSD_MEAS,
              // y: this.chartData[0].data.PSD_MEAS,
              type: 'scattergl',
              name: 'PSD',
              mode: 'lines',
              line: {
                // color: 'rgb(55, 128, 191)',
                width: 1,
              },
              hoverinfo: 'none',
            },
            {
              y: response?.MAX_MEAS,
              type: 'scattergl',
              name: 'Max',
              mode: 'lines',
              line: {
                color: 'green',
                width: 1,
              },
              hoverinfo: 'none',
            },
            {
              y: response?.MIN_MEAS,
              type: 'scattergl',
              name: 'Min',
              mode: 'lines',
              line: {
                color: 'red',
                width: 1,
              },
              hoverinfo: 'none',
            },
          ];
          this.changeDetectorRef.detectChanges();
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

  close(): void {
    console.log('close');
    this.websocketService.close();
  }

  public addMaxChart(): void {
    const plotly = this.plotlyService.getPlotly();
    const chart = this.chartComponent.plotEl.nativeElement;
    plotly.addTraces(chart, {
      // y: this.chartData[0].data.MAX_MEAS,
      y: this.chartData[35]?.MAX_MEAS,
      type: 'scattergl',
      name: 'Max',
      mode: 'lines',
      line: {
        color: 'green',
        width: 1,
      },
      hoverinfo: 'none',
    });
  }

  public addMinChart(): void {
    const plotly = this.plotlyService.getPlotly();
    const chart = this.chartComponent.plotEl.nativeElement;
    plotly.addTraces(chart, {
      y: this.chartData[35]?.MIN_MEAS,
      name: 'Min',
      type: 'scattergl',
      mode: 'lines',
      line: {
        color: 'red',
        width: 1,
      },
      hoverinfo: 'none',
    });
  }

  public removeChart(): void {
    const plotly = this.plotlyService.getPlotly();
    const chart = this.chartComponent.plotEl.nativeElement;
    plotly.deleteTraces(chart, [-1]);
  }

  private seedData(): any {
    const lineArr = [];
    const MAX_LENGTH = 1000;
    for (let i = 0; i < MAX_LENGTH; ++i) {
      lineArr.push({
        x: this.randomNumberBounds(0, 2),
        y: this.randomNumberBounds(0, 2.5),
      });
    }
    return lineArr;
  }

  private randomNumberBounds(min: number, max: number) {
    return Math.floor(Math.random() * max) + min;
  }

  private negativeRandomNumber(m: number, n: number) {
    return Math.floor(Math.random() * (n - m + 1)) + m;
  }

  private generateNegativeRandomNumbersArray() {
    const arrayLength = 600;
    const newArray = [];

    for (let i = 0; i < arrayLength; i++) {
      const y = this.negativeRandomNumber(-90, -70);
      newArray[i] = y;
    }
    return newArray;
  }

  public simulateRealtime(): void {
    const plotly = this.plotlyService.getPlotly();
    const chart = this.chartComponent.plotEl.nativeElement;
    setInterval(() => {
      const array = this.generateNegativeRandomNumbersArray();
      // console.log('array', array);
      /*   plotly.extendTraces(
        chart,
        {
          y: [array],
        },
        [0],
        600
      ); */
      this.chart.data = [
        {
          // y: this.chart.data[0].y,
          // y: this.chartData[0].data.PSD_MEAS,
          y: array,
          type: 'scattergl',
          mode: 'lines',
          line: {
            // color: 'rgb(55, 128, 191)',
            width: 1,
          },
          hoverinfo: 'none',
        },
      ];
      this.changeDetectorRef.detectChanges();
    }, 200);
  }
}
