import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import * as fc from 'd3fc';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit, AfterViewInit {
  @ViewChild('chart')
  chartContainer!: ElementRef;

  constructor() {}

  ngAfterViewInit(): void {
    const data = fc.randomFinancial()(50);

    const yExtent = fc.extentLinear().accessors([(d) => d.high, (d) => d.low]);

    const xExtent = fc.extentDate().accessors([(d) => d.date]);

    const gridlines = fc.annotationSvgGridline();
    const candlestick = fc.seriesSvgCandlestick();
    const multi = fc.seriesSvgMulti().series([gridlines, candlestick]);

    const chart = fc
      .chartCartesian(d3.scaleTime(), d3.scaleLinear())
      .yDomain(yExtent(data))
      .xDomain(xExtent(data))
      .svgPlotArea(multi);
    console.log(this, this.chartContainer);
    d3.select(this.chartContainer.nativeElement).datum(data).call(chart);
  }

  ngOnInit(): void {
    console.log('init');
  }
}
