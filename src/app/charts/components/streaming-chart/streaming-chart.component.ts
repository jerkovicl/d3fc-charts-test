/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import * as fc from 'd3fc';

@Component({
  selector: 'app-streaming-chart',
  templateUrl: './streaming-chart.component.html',
  styleUrls: ['./streaming-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StreamingChartComponent implements OnInit, AfterViewInit {
  @ViewChild('streamingchart') chartContainer!: ElementRef;

  constructor() {}
  ngAfterViewInit(): void {
    this.renderChart();
    // container.requestRedraw();
  }

  public simulateRealtime(): void {
    setInterval(() => {
      this.renderChart();
    }, 500);
  }

  public renderChart(): void {
    // const stream = fc.randomFinancial().stream();
    // const data = stream.take(1100);
    const array = this.generateNegativeRandomNumbersArray(-80, -70);
    const data = array.map((value, index) => {
      return { time: index, value: value };
    });
    // console.log('data', data);

    const max_array = this.generateNegativeRandomNumbersArray(-60, -50);
    const min_array = this.generateNegativeRandomNumbersArray(-100, -90);
    // console.log('data', data);

    const yExtent = fc.extentLinear().accessors([(d: any) => d.value]);
    const xExtent = fc.extentLinear().accessors([(d: any) => d.time]);
    // const yExtent = fc.extentLinear().accessors([(d: { high: any }) => d.high, (d: { low: any }) => d.low]);

    // const xExtent = fc.extentDate().accessors([(d: { date: any }) => d.date]);

    const gridlines = fc.annotationSvgGridline();

    const extent = fc.extentLinear();

    const xScale = d3.scaleLinear().domain([0, data.length]);
    const yScale = d3.scaleLinear().domain([-100, 0]);
    //  const yScale = d3.scaleLinear().domain(extent(data));
    const series = fc
      .seriesWebglLine()
      //.xScale(xScale)
      //  .yScale(yScale)
      .mainValue((d: any) => d.value)
      //  .crossValue((d: any) => d.time)
      .crossValue((_: any, i: any) => i)
      // .mainValue((d: { high: any }) => d.high)
      // .crossValue((d: { date: any }) => d.date)
      .defined(() => true)
      .equals((previousData: string | any[]) => previousData.length > 0);
    //.mapping((d: { data: any }) => d.data);
    //  const multi = fc.seriesSvgMulti().series([gridlines, series]);

    const chart = fc
      .chartCartesian(d3.scaleLinear(), d3.scaleLinear())
      .yDomain(yExtent(data))
      .xDomain(xExtent(data))
      .xDomain([0, 600])
      .yDomain([-100, -50])
      .xTickFormat(d3.format(','))
      .yTickFormat(d3.format(','))
      .xLabel('')
      .yLabel('')
      // .xTickValues([0, 50, 100, 150, 600])
      // .yTickValues([-100, -95, -90, -50])
      .webglPlotArea(series);
    //.svgPlotArea(gridlines);
    // data.push(stream.next());
    // data.shift();

    // chart.yDomain(yExtent(data)).xDomain(xExtent(data));
    // chart.yDomain(yExtent(data));
    d3.select(this.chartContainer.nativeElement).datum(data).call(chart);
    /*   const gl = this.chartContainer.nativeElement.querySelector('canvas').getContext('webgl');
      series.context(gl); */
  }

  private negativeRandomNumber(m: number, n: number): number {
    return Math.floor(Math.random() * (n - m + 1)) + m;
  }

  private generateNegativeRandomNumbersArray(from: number, to: number): number[] {
    const arrayLength = 1000;
    const newArray = [];

    for (let i = 0; i < arrayLength; i++) {
      const y = this.negativeRandomNumber(from, to);
      newArray[i] = y;
    }
    // const points = Simplify.simplify(newArray, 1, false);
    // console.log('points', points);
    return newArray;
  }

  ngOnInit(): void {
    console.log('init');
  }
}
