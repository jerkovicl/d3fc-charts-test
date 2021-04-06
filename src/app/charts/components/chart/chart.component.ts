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
    const data = fc.randomGeometricBrownianMotion().steps(1e4)(1);

    const extent = fc.extentLinear();

    const xScale = d3.scaleLinear().domain([0, data.length - 1]);

    const yScale = d3.scaleLinear().domain(extent(data));

    const container = this.chartContainer.nativeElement;

    const series = fc
      .seriesWebglLine()
      .xScale(xScale)
      .yScale(yScale)
      .crossValue((_: any, i: any) => i)
      .mainValue((d: any) => d)
      .defined(() => true)
      .equals((previousData: string | any[]) => previousData.length > 0);

    let pixels: Uint8Array | null = null;
    let frame = 0;
    let gl: {
      drawingBufferWidth: number;
      drawingBufferHeight: number;
      readPixels: (arg0: number, arg1: number, arg2: any, arg3: any, arg4: any, arg5: any, arg6: any) => void;
      RGBA: any;
      UNSIGNED_BYTE: any;
    } | null = null;

    d3.select(container)
      .on('click', () => {
        const domain = xScale.domain();
        const max = Math.round(domain[1] / 2);
        xScale.domain([0, max]);
        container.requestRedraw();
      })
      .on('measure', (event) => {
        const { width, height } = event.detail;
        xScale.range([0, width]);
        yScale.range([height, 0]);

        gl = container.querySelector('canvas').getContext('webgl');
        series.context(gl);
      })
      .on('draw', () => {
        if (gl) {
          if (pixels == null) {
            pixels = new Uint8Array(gl.drawingBufferWidth * gl.drawingBufferHeight * 4);
          }
          performance.mark(`draw-start-${frame}`);
          series(data);
          // Force GPU to complete rendering to allow accurate performance measurements to be taken
          gl.readPixels(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
          performance.measure(`draw-duration-${frame}`, `draw-start-${frame}`);
          frame++;
        }
      });
    console.log('container', container, this.chartContainer);
    console.log(this.chartContainer.nativeElement.children[0]);
    console.log('container canvas', container.querySelector('canvas'));
    container.requestRedraw();

    //  d3.select(this.chartContainer.nativeElement).datum(data).call(chart);
  }

  ngOnInit(): void {
    console.log('init');
  }
}
