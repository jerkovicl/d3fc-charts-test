/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PlotlyComponent, PlotlyService } from 'angular-plotly.js';
import { catchError, map, tap } from 'rxjs/operators';
import { WebsocketService } from '../../services/websocket.service';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent implements OnInit, AfterViewInit {
  @ViewChild('chart')
  chartComponent!: PlotlyComponent;

  public deviceId = new FormControl('fes01:Sat-01');
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
  public chartConfig = {
    data: [
      {
        // x: this.seedData().map((item: any) => item.x),
        y: this.seedData().map((item: any) => item.y),
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

  constructor(private websocketService: WebsocketService, private plotly: PlotlyService) {}

  ngOnInit(): void {
    console.log('init');
  }

  ngAfterViewInit(): void {
    console.log('afterViewInit');
    console.log('seedData', this.seedData());
    const plotly = this.plotly.getPlotly();
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
    this.data$.pipe(untilDestroyed(this)).subscribe(
      (response: any) => {
        console.log('RESPONSE --> ', response);
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
    const plotly = this.plotly.getPlotly();
    const chart = this.chartComponent.plotEl.nativeElement;
    plotly.addTraces(chart, {
      y: this.seedData().map((item: any) => item.x),
      type: 'scattergl',
      mode: 'lines',
      hoverinfo: 'none',
    });
    // this.plotly.getPlotly().relayout(this.chartContainer.plotEl.nativeElement, updatedData);
  }

  public removeChart(): void {
    const plotly = this.plotly.getPlotly();
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
