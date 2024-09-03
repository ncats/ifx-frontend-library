import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';
import { Filter } from '@ncats-frontend-library/models/utils';
import {
  Arc,
  DefaultArcObject,
  interpolate,
  Pie,
  quantize,
  ScaleOrdinal,
} from 'd3';
import { scaleOrdinal } from 'd3-scale';
import { select } from 'd3-selection';
import { arc, pie } from 'd3-shape';
import { GenericChartComponent } from 'generic-chart';
import { ImageDownloadComponent } from 'image-download';

@Component({
  selector: 'lib-shared-utils-pie-chart',
  standalone: true,
  imports: [CommonModule, ImageDownloadComponent, NgOptimizedImage],
  templateUrl: './shared-utils-pie-chart.component.html',
  styleUrl: './shared-utils-pie-chart.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class SharedUtilsPieChartComponent
  extends GenericChartComponent
  implements OnInit, OnChanges
{
  arcShape!: Arc<never, DefaultArcObject>;
  pieChart!: unknown;
  radius!: number;
  color!: ScaleOrdinal<string, unknown>;

  constructor() {
    super();
    this.margins = { top: 20, bottom: 30, right: 30, left: 30 };
  }

  ngOnInit() {
    if (this.chartElement && this.isBrowser()) {
      const element = this.chartElement.nativeElement;
      this.width = element.offsetWidth - this.margins.left - this.margins.right;
      this.height =
        element.offsetHeight // + this.margins.top //+ this.margins.bottom;

      this.radius = Math.min(this.width, this.height) / 2;

      this.arcShape = arc()
        .innerRadius(this.radius * 0.67)
        .outerRadius(this.radius - 1)
        .cornerRadius(3)
        .padAngle(0.015);

      this.pieChart = pie()
        .padAngle(1 / this.radius)
        .sort(null)
        //@ts-expect-error dumb
        .value((d) => d.count);

      this.color = scaleOrdinal()
        .domain(this.data.values.map((d) => d.term))
        .range(
          quantize(
            interpolate('#93278f', '#6e4c8f'),
            this.data.values.length,
          ).reverse(),
        );

      select(element).select('svg').remove();
      this.svg = select(element)
        .append('svg:svg')
        .attr('xmlns', 'http://www.w3.org/2000/svg')
        .attr('xmlns:xlink', 'http://www.w3.org/1999/xlink')
        .attr('class', 'chart-id')
       // .attr('viewBox', [-150, -180, 300, 360])
        .attr("viewBox", [-this.width / 2, -this.height / 2, this.width, this.height])
        .attr('style', 'max-width: 100%; height: auto; height: intrinsic;');
      this.makeChart();
    }
  }

  ngOnChanges() {
    if (this.data && this.svg) {
      this.svg.selectAll('*').remove();
      this.makeChart();
    }
  }

  makeChart() {
    this.svg
      .append('g')
      .attr('class', 'pie-chart')
      .append('g')
      .attr('class', 'slices')
      .selectAll()
      //@ts-expect-error dumb
      .data(() => this.pieChart(this.data.values))
      .join('path')
      .attr('fill', (d: { data: Filter }) => this.color(d.data.term))
      .attr('class', 'slice')
      .attr('d', this.arcShape)
      .on('mouseover', (event: Event, d: { data: Filter }) => {
        select((<unknown>event.currentTarget) as string)
          .classed('hovered', true)
          .transition()
          .duration(300)

         // .style('fill', '#278F93');
        this.svg.selectAll('.toolCircle').remove();
        this.addTooltip(d.data);
      })
      .on('mouseout', (event: Event, d: { data: Filter }) => {
      //  const color = this._getColor(d.data.term);
        select((<unknown>event.currentTarget) as string)
          .classed('hovered', false)
          .transition()
          .duration(300)
        //  .style('fill', color);
      })
      .on('click', (event: Event, d: { data: Filter }) => {
        this.clickElement.emit(d.data);
        select((<unknown>event.currentTarget) as string).attr(
          'class',
          'clickedSlice',
        );
      });
    const firstSlice = this.svg
      .select('.slices')
      .selectAll('path.slice')
      .data()
      .reverse();
    const firstSliceIndex = firstSlice.length - 1 || 0;
    if (firstSlice[firstSliceIndex] && firstSlice[firstSliceIndex].data) {
      this.addTooltip(firstSlice[firstSliceIndex].data);
    }

    this.svg
      .append('text')
      .attr('class', 'chart-title')
      .attr('x', 0)
      .attr('y', -this.height/2 + this.margins.top)
      .attr('text-anchor', 'middle')
      .text(this.data.label);

    this.svgExport = <SVGElement>(
      select(this.chartElement.nativeElement).select('svg').node()
    );
  }

  /**
   * add tooltip as donut chart center fill
   * @param d
   */
  addTooltip(d: Filter): void {
    if (!d) {
      return;
    }
    this.svg
      .append('circle')
      .attr('class', 'toolCircle')
      .attr('r', this.radius * 0.65) // radius of tooltip circle
      .style('fill', this.color(d.term)) // colour based on category mouse is over
      .style('fill-opacity', 0.35);
    this.svg
      .append('text')
      .attr('class', 'toolCircle')
      .attr(
        'style',
        'text-anchor: middle; font-family: Roboto, serif; font-color: white',
      )
      .attr('dy', -15) // hard-coded. can adjust this to adjust text vertical alignment in tooltip*/
      .html(d.term); // add text to the circle.
    this.svg
      .append('text')
      .attr('class', 'toolCircle value')
      .attr(
        'style',
        'text-anchor: middle; font-family: Roboto, serif; font-size: 2.4em',
      )
      .attr('dy', 30) // hard-coded. can adjust this to adjust text vertical alignment in tooltip*/
      .html(d.count);
    this.svg.transition().duration(200).style('opacity', 0.9);
  }

  _getColor(term: string): string {
    return <string>this.color(term);
  }
}
