/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import * as fc from 'd3fc';

@Component({
  selector: 'app-streaming-chart',
  templateUrl: './streaming-chart.component.html',
  styleUrls: ['./streaming-chart.component.scss'],
})
export class StreamingChartComponent implements OnInit, AfterViewInit {
  @ViewChild('streamingchart') chartContainer!: ElementRef;

  constructor() {}
  ngAfterViewInit(): void {
    this.renderChart();
    // container.requestRedraw();
    /*   setInterval(() => {
      this.renderChart();
    }, 500); */
  }

  public renderChart(): void {
    const stream = fc.randomFinancial().stream();
    const data = stream.take(1100);
    // console.log(data);

    const yExtent = fc.extentLinear().accessors([(d: { high: any }) => d.high, (d: { low: any }) => d.low]);

    const xExtent = fc.extentDate().accessors([(d: { date: any }) => d.date]);

    const gridlines = fc.annotationSvgGridline();

    const extent = fc.extentLinear();

    const xScale = d3.scaleLinear().domain([0, data.length - 1]);

    const yScale = d3.scaleLinear().domain(extent(data));
    const series = fc
      .seriesWebglLine()
      .xScale(xScale)
      .yScale(yScale)
      .mainValue((d: { high: any }) => d.high)
      .crossValue((d: { date: any }) => d.date)
      .defined(() => true)
      .equals((previousData: string | any[]) => previousData.length > 0);
    //.mapping((d: { data: any }) => d.data);
    //  const multi = fc.seriesSvgMulti().series([gridlines, series]);

    const chart = fc
      .chartCartesian(d3.scaleTime(), d3.scaleLinear())
      .yDomain(yExtent(data))
      .xDomain(xExtent(data))
      .webglPlotArea(series)
      .svgPlotArea(gridlines);
    data.push(stream.next());
    data.shift();

    chart.yDomain(yExtent(data)).xDomain(xExtent(data));
    d3.select(this.chartContainer.nativeElement).datum(data).call(chart);
    /*   const gl = this.chartContainer.nativeElement.querySelector('canvas').getContext('webgl');
      series.context(gl); */
  }

  ngOnInit(): void {
    console.log('init');
  }
}
