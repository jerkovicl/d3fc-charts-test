/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
    /*  const data = fc.randomFinancial()(50);

    const yExtent = fc.extentLinear().accessors([(d: { high: any; }) => d.high, (d: { low: any; }) => d.low]);

    const xExtent = fc.extentDate().accessors([(d: { date: any; }) => d.date]);

    const gridlines = fc.annotationSvgGridline();
    const candlestick = fc.seriesSvgCandlestick();
    const multi = fc.seriesSvgMulti().series([gridlines, candlestick]);

    const chart = fc
      .chartCartesian(d3.scaleTime(), d3.scaleLinear())
      .yDomain(yExtent(data))
      .xDomain(xExtent(data))
      .svgPlotArea(multi);
    console.log(this, this.chartContainer); */
    // a random number generator
    const generator = fc.randomGeometricBrownianMotion().steps(11);

    // some formatters
    const dateFormatter = d3.timeFormat('%b');
    const valueFormatter = d3.format('$.0f');

    const yExtent = fc
      .extentLinear()
      .include([0])
      .pad([0, 0.5])
      .accessors([(d: { sales: any }) => d.sales]);

    const data = {
      // target values for the annotations
      targets: [
        {
          name: 'low',
          value: 4.5,
        },
        {
          name: 'high',
          value: 7.2,
        },
      ],
      // randomly generated sales data
      sales: generator(1).map((d: number, i: number) => ({
        month: dateFormatter(new Date(0, i + 1, 0)),
        sales: d + i / 2,
      })),
    };
    const bar = fc
      .autoBandwidth(fc.seriesSvgBar())
      .crossValue((d: { month: any }) => d.month)
      .mainValue((d: { sales: any }) => d.sales)
      .align('left');
    const chart = fc
      .chartCartesian(d3.scaleBand(), d3.scaleLinear())
      .chartLabel('2015 Cumulative Sales')
      .xDomain(data.sales.map((d: { month: any }) => d.month))
      .yDomain(yExtent(data.sales))
      .xPadding(0.2)
      .yTicks(5)
      .yTickFormat(valueFormatter)
      .yLabel('Sales (millions)')
      .yNice();
    const annotation = fc.annotationSvgLine().value((d: { value: any }) => d.value);

    const multi = fc
      .seriesSvgMulti()
      .series([bar, annotation])
      .mapping((data: { sales: any; targets: any }, index: string | number, series: { [x: string]: any }) => {
        switch (series[index]) {
          case bar:
            return data.sales;
          case annotation:
            return data.targets;
        }
      });

    chart.svgPlotArea(multi);
    bar.decorate(
      (selection: {
        select: (
          arg0: string
        ) => {
          (): any;
          new (): any;
          style: { (arg0: string, arg1: (d: any) => 'inherit' | '#0c0'): void; new (): any };
        };
      }) => {
        // The selection passed to decorate is the one which the component creates
        // within its internal data join, here we use the update selection to
        // apply a style to 'path' elements created by the bar series
        selection
          .select('.bar > path')
          .style('fill', (d: any) => (d.sales < data.targets[0].value ? 'inherit' : '#0c0'));
      }
    );

    annotation.decorate(
      (selection: {
        enter: () => {
          (): any;
          new (): any;
          select: {
            (arg0: string): {
              (): any;
              new (): any;
              append: {
                (arg0: string): {
                  (): any;
                  new (): any;
                  attr: {
                    (arg0: string, arg1: number): {
                      (): any;
                      new (): any;
                      attr: { (arg0: string, arg1: number): void; new (): any };
                    };
                    new (): any;
                  };
                };
                new (): any;
              };
            };
            new (): any;
          };
        };
        select: (arg0: string) => { (): any; new (): any; text: { (arg0: (d: any) => string): void; new (): any } };
      }) => {
        selection.enter().select('g.left-handle').append('text').attr('x', 5).attr('y', -5);
        selection.select('g.left-handle text').text((d: any) => `${d.name} - ${valueFormatter(d.value)}M`);
      }
    );
    d3.select(this.chartContainer.nativeElement).datum(data).call(chart);
  }

  ngOnInit(): void {
    console.log('init');
  }
}
