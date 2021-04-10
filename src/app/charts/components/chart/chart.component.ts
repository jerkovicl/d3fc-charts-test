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
      showlegend: false,
      title: 'SkymonNG',
      interactiveConfig: { displayModeBar: false, displaylogo: false },
    },
  };

  public testData = [
    -77.55,
    -77.66,
    -78.29,
    -78.89,
    -78.87,
    -78.59,
    -78.59,
    -78.81,
    -79.03,
    -79.38,
    -79.83,
    -79.95,
    -79.83,
    -80.03,
    -80.59,
    -81.01,
    -80.81,
    -80.07,
    -79.3,
    -79.01,
    -79.42,
    -80.34,
    -81.02,
    -80.94,
    -80.61,
    -80.69,
    -81.29,
    -82.15,
    -82.81,
    -82.65,
    -81.81,
    -81.27,
    -81.58,
    -82.54,
    -83.24,
    -83.14,
    -82.86,
    -82.96,
    -83.44,
    -83.98,
    -84.2,
    -84.02,
    -83.9,
    -84.32,
    -85.44,
    -87.02,
    -88.39,
    -88.88,
    -88.65,
    -88.16,
    -87.84,
    -87.98,
    -88.66,
    -89.56,
    -90.07,
    -89.93,
    -89.56,
    -89.42,
    -89.51,
    -89.5,
    -89.37,
    -89.5,
    -90.01,
    -90.47,
    -90.52,
    -90.48,
    -90.39,
    -89.92,
    -89.16,
    -88.62,
    -88.57,
    -88.86,
    -88.86,
    -88.09,
    -87.12,
    -86.52,
    -86.37,
    -86.47,
    -86.63,
    -86.7,
    -86.8,
    -87.09,
    -87.25,
    -86.99,
    -86.6,
    -86.1,
    -85.13,
    -84.03,
    -83.46,
    -83.56,
    -83.95,
    -84.06,
    -83.93,
    -84,
    -84.26,
    -84.19,
    -83.47,
    -82.61,
    -82.12,
    -81.84,
    -81.37,
    -80.8,
    -80.62,
    -81.05,
    -81.8,
    -82.23,
    -82.02,
    -81.48,
    -80.88,
    -80.29,
    -79.8,
    -79.46,
    -79.25,
    -79.04,
    -78.79,
    -78.73,
    -79,
    -79.25,
    -79.15,
    -78.96,
    -79.03,
    -79.2,
    -79.26,
    -79.29,
    -79.41,
    -79.52,
    -79.44,
    -79.08,
    -78.57,
    -78.21,
    -78.26,
    -78.68,
    -79.09,
    -79.08,
    -78.6,
    -77.89,
    -77.26,
    -76.98,
    -77.12,
    -77.54,
    -78.01,
    -78.42,
    -78.76,
    -78.85,
    -78.6,
    -78.34,
    -78.19,
    -77.75,
    -76.95,
    -76.37,
    -76.44,
    -76.9,
    -76.91,
    -76.31,
    -75.99,
    -76.36,
    -77,
    -77.21,
    -77.14,
    -77.31,
    -77.58,
    -77.58,
    -77.32,
    -76.9,
    -76.3,
    -75.81,
    -75.81,
    -76.41,
    -77.14,
    -77.24,
    -76.74,
    -76.36,
    -76.37,
    -76.6,
    -76.84,
    -77.01,
    -76.97,
    -76.69,
    -76.39,
    -76.3,
    -76.35,
    -76.29,
    -76.11,
    -76.04,
    -76.21,
    -76.49,
    -76.65,
    -76.68,
    -76.66,
    -76.35,
    -75.6,
    -74.79,
    -74.42,
    -74.65,
    -75.18,
    -75.44,
    -75.31,
    -75.21,
    -75.4,
    -75.6,
    -75.33,
    -74.73,
    -74.33,
    -74.37,
    -74.65,
    -74.82,
    -74.75,
    -74.75,
    -75.11,
    -75.61,
    -75.75,
    -75.57,
    -75.56,
    -75.8,
    -75.98,
    -75.74,
    -75.28,
    -75.09,
    -75.41,
    -76.05,
    -76.55,
    -76.58,
    -76.13,
    -75.45,
    -74.94,
    -74.86,
    -75.08,
    -75.24,
    -75.24,
    -75.12,
    -74.86,
    -74.61,
    -74.61,
    -74.87,
    -75.23,
    -75.61,
    -75.78,
    -75.71,
    -75.69,
    -75.66,
    -75.09,
    -74.14,
    -73.62,
    -73.96,
    -74.94,
    -75.71,
    -75.6,
    -74.9,
    -74.18,
    -73.85,
    -74.17,
    -74.98,
    -75.71,
    -75.9,
    -75.75,
    -75.52,
    -75.17,
    -74.84,
    -74.78,
    -75.07,
    -75.57,
    -76.16,
    -76.84,
    -77.43,
    -77.41,
    -76.73,
    -76.02,
    -75.58,
    -75.43,
    -75.65,
    -76.36,
    -77.21,
    -77.23,
    -76.22,
    -75.11,
    -74.56,
    -74.65,
    -75.22,
    -75.86,
    -75.97,
    -75.32,
    -74.49,
    -74.08,
    -74.27,
    -74.91,
    -75.72,
    -76.4,
    -76.78,
    -76.69,
    -76.29,
    -76.04,
    -76.1,
    -75.94,
    -75.23,
    -74.63,
    -74.71,
    -75.36,
    -75.89,
    -75.89,
    -75.68,
    -75.51,
    -75.39,
    -75.43,
    -75.66,
    -75.76,
    -75.54,
    -75.35,
    -75.41,
    -75.31,
    -74.75,
    -74.17,
    -74.06,
    -74.38,
    -74.66,
    -74.67,
    -74.6,
    -74.62,
    -74.79,
    -75.31,
    -76.34,
    -77.19,
    -76.86,
    -76.04,
    -75.71,
    -75.89,
    -76.15,
    -76.27,
    -76.46,
    -76.93,
    -77.62,
    -78.17,
    -77.91,
    -77.1,
    -76.73,
    -76.99,
    -76.95,
    -76.1,
    -75.34,
    -75.12,
    -75.16,
    -75.21,
    -75.27,
    -75.24,
    -75.13,
    -75.29,
    -75.95,
    -76.9,
    -77.68,
    -78.07,
    -77.98,
    -77.42,
    -76.6,
    -75.76,
    -75.07,
    -74.74,
    -74.83,
    -75.15,
    -75.33,
    -75.24,
    -75.05,
    -74.86,
    -74.73,
    -74.73,
    -74.96,
    -75.33,
    -75.63,
    -75.66,
    -75.58,
    -75.74,
    -76.22,
    -76.55,
    -76.18,
    -75.36,
    -74.68,
    -74.45,
    -74.58,
    -74.8,
    -75.04,
    -75.39,
    -75.71,
    -75.85,
    -75.91,
    -75.98,
    -75.93,
    -75.67,
    -75.32,
    -75.08,
    -75.15,
    -75.55,
    -75.97,
    -75.99,
    -75.62,
    -75.25,
    -75.17,
    -75.37,
    -75.63,
    -75.84,
    -76.08,
    -76.46,
    -76.86,
    -77.06,
    -77.02,
    -76.88,
    -76.8,
    -76.83,
    -76.96,
    -77.15,
    -77.27,
    -77.21,
    -76.8,
    -76,
    -75.23,
    -74.9,
    -75.06,
    -75.47,
    -75.91,
    -76.32,
    -76.69,
    -77.14,
    -77.52,
    -77.32,
    -76.54,
    -75.82,
    -75.43,
    -75.22,
    -75.12,
    -75.33,
    -75.95,
    -76.43,
    -76.21,
    -75.59,
    -75.08,
    -74.97,
    -75.44,
    -76.26,
    -76.67,
    -76.3,
    -75.77,
    -75.57,
    -75.64,
    -75.74,
    -75.73,
    -75.73,
    -75.94,
    -76.22,
    -76.34,
    -76.37,
    -76.57,
    -76.89,
    -77.1,
    -77.29,
    -77.63,
    -77.99,
    -78.12,
    -78.1,
    -78.19,
    -78.5,
    -78.85,
    -78.82,
    -78.22,
    -77.6,
    -77.5,
    -77.75,
    -77.79,
    -77.63,
    -77.8,
    -78.31,
    -78.68,
    -78.77,
    -78.87,
    -78.9,
    -78.54,
    -78.12,
    -78.21,
    -78.96,
    -79.87,
    -80.13,
    -79.79,
    -79.43,
    -79.33,
    -79.43,
    -79.57,
    -79.64,
    -79.62,
    -79.52,
    -79.48,
    -79.68,
    -80.08,
    -80.34,
    -80.25,
    -80.07,
    -80.1,
    -80.44,
    -81.08,
    -81.74,
    -81.98,
    -81.94,
    -81.93,
    -81.96,
    -82.07,
    -82.41,
    -82.82,
    -83.07,
    -83.37,
    -83.98,
    -84.73,
    -85.14,
    -85.01,
    -84.66,
    -84.41,
    -84.28,
    -84.13,
    -84.07,
    -84.37,
    -84.88,
    -85.03,
    -84.88,
    -85.03,
    -85.6,
    -86.05,
    -86.12,
    -86.13,
    -86.36,
    -86.89,
    -87.63,
    -88.13,
    -87.98,
    -87.59,
    -87.44,
    -87.72,
    -88.36,
    -88.96,
    -89.03,
    -88.8,
    -88.72,
    -88.72,
    -88.75,
    -89.09,
    -89.69,
    -89.72,
    -88.97,
    -88.15,
    -87.42,
    -86.7,
    -86.26,
    -86.21,
    -86.21,
    -85.89,
    -85.36,
    -84.73,
    -84.12,
    -83.74,
    -83.68,
    -83.68,
    -83.42,
    -82.87,
    -82.35,
    -82.24,
    -82.71,
    -83.38,
    -83.5,
    -83.09,
    -82.68,
    -82.41,
    -82.21,
    -82.12,
    -81.95,
    -81.47,
    -80.99,
    -81.01,
    -81.71,
    -82.71,
    -83.02,
    -82.17,
    -81.07,
    -80.54,
    -80.68,
    -80.97,
    -80.7,
    -79.94,
    -79.34,
    -79.19,
    -79.45,
    -79.83,
    -80.01,
    -80.03,
    -80.02,
    -79.89,
    -79.62,
    -79.38,
    -79.09,
    -78.54,
    -77.91,
    -77.61,
    -77.69,
    -78.03,
    -78.55,
    -79.23,
    -79.77,
    -79.8,
    -79.3,
    -78.66,
    -78.26,
  ];

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
    this.data$.pipe(untilDestroyed(this)).subscribe(
      (response: IMeasurement) => {
        console.log('RESPONSE --> ', response);
        this.chart.data = [
          {
            // x: this.seedData().map((item: any) => item.x),
            y: response.PSD_MEAS,
            hoverinfo: 'none',
          },
        ];
      },
      (error: any) => {
        console.log('error', error);
      },
      () => {
        console.log('observable is now completed.');
      }
    );
    // const chartData = [...this.testData].map((x: any) => [x]);
    // console.log('chartData', chartData);
    /*   this.testData.forEach((element) => {
      plotly.extendTraces(
        chart,
        {
          y: [[element]],
        },
        [0]
      );
    }); */
    this.chart.data  =  [
        {
          y: this.testData,
          type: 'scattergl',
        mode: 'lines',
        line: {
          // color: 'rgb(55, 128, 191)',
          width: 1,
        },
        hoverinfo: 'none',
        },
      ]
 
   /*   const update = {
      // x: this.seedData().map((item: any) => item.x),
      data: this.testData,
      // hoverinfo: 'none',
    };
    const layout_update = {
      title: 'some new title', // updates the title
    };*/
    // plotly.update(chart, update, layout_update);
    // this.revision += 1; 
   //  plotly.relayout(chart, update);
    // this.changeDetectorRef.detectChanges();
    // this.chart.data[0]['y'].push(this.testData);
    // this.y.push(this.testData);
    // this.chart.data = [{ x: this.x.slice(), y: this.y.slice(), type: 'scattergl' }];
    // this.chart.data[0].y = this.testData;
  }

  close(): void {
    console.log('close');
    this.websocketService.close();
  }

  public addMaxChart(): void {
    const plotly = this.plotlyService.getPlotly();
    const chart = this.chartComponent.plotEl.nativeElement;
    plotly.addTraces(chart, {
      y: this.testData.slice(100),
      type: 'scattergl',
      mode: 'lines',
      hoverinfo: 'none',
    });
    // this.plotly.getPlotly().relayout(this.chartContainer.plotEl.nativeElement, updatedData);
  }

  public addMinChart(): void {
    const plotly = this.plotlyService.getPlotly();
    const chart = this.chartComponent.plotEl.nativeElement;
    plotly.addTraces(chart, {
      y: this.testData.slice(50),
      type: 'scattergl',
      mode: 'lines',
      hoverinfo: 'none',
    });
    // this.plotly.getPlotly().relayout(this.chartContainer.plotEl.nativeElement, updatedData);
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
}
