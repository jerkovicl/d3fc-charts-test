/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent implements OnInit, AfterViewInit {
  @ViewChild('chart')
  chartContainer!: ElementRef;
  public data$: any = this.websocketService.messages$.pipe(
    map((rows: any) => rows),
    catchError((error) => {
      throw error;
    }),
    tap({
      error: (error: any) => console.log('Error:', error),
      complete: () => console.log('Connection Closed'),
    })
  );
  public chartConfig = {
    data: [{ x: [1, 2, 3], y: [2, 3, 4], type: 'scattergl', mode: 'lines', hoverinfo: 'none' }],
    layout: {
      autosize: true,
      showlegend: false,
      title: 'SkymonNG',
      interactiveConfig: { displayModeBar: false, displaylogo: false },
    },
  };

  constructor(private websocketService: WebsocketService) {}

  ngOnInit(): void {
    console.log('init');
  }

  ngAfterViewInit(): void {
    console.log('afterViewInit');
    this.websocketService.connect();
  }

  sendMessage(): void {
    console.log('sendMessage');
    this.websocketService.sendMessage('Test Message');
  }
}
