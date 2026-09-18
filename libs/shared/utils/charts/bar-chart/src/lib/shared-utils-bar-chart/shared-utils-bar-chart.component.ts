// eslint-disable-next-line  @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostListener,
  OnChanges,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Filter } from 'utils-models';
import {
  axisBottom,
  axisLeft,
  BaseType,
  index,
  InternMap,
  pointer,
  ScaleBand,
  scaleBand,
  ScaleLinear,
  SeriesPoint,
  stack,
  union,
} from 'd3';
import { max } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import { select, Selection } from 'd3-selection';
import { Series, Stack } from 'd3-shape';
import { GenericChartComponent } from 'generic-chart';

interface ChartPoint extends SeriesPoint<{ [key: string]: number }> {
  key?: string;
}

@Component({
  selector: 'lib-shared-utils-bar-chart',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './shared-utils-bar-chart.component.html',
  styleUrls: ['./shared-utils-bar-chart.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedUtilsBarChartComponent
  extends GenericChartComponent
  implements OnInit, OnChanges
{
  placeholderUrl = computed(() => {
    return `assets/charts/placeholders/chart${Math.floor(
      Math.random() * 2,
    )}.webp`;
  });

  bars!: unknown;
  series!: Series<unknown, unknown>; //Stack<never, { [key: string]: number }, string>;
  xScale!: ScaleBand<string>;
  yScale!: ScaleLinear<number, number, never>;

  constructor() {
    super();
    this.margins.set({ top: 20, bottom: 50, right: 30, left: 10 });
  }

  @HostListener('window:resize', [])
  onResize() {
    this.makeChart();
  }

  ngOnInit() {
    if (this.chartElement() && this.isBrowser()) {
      const element = this.chartElement().nativeElement;

      select(element).select('svg').remove();

      this.svg = select(element)
        .append('svg:svg')
        .attr('xmlns', 'http://www.w3.org/2000/svg')
        .attr('xmlns:xlink', 'http://www.w3.org/1999/xlink')
        .attr('id', 'chart-id')
        .attr('width', this.width())
        .attr('height', this.height())
        .attr('viewBox', [0, 0, this.width(), this.height()])
        .attr(
          'style',
          'max-width: 100%; height: auto; height: intrinsic; overflow: visible;',
        )
        .on('touchstart', (event) => event.preventDefault());

      if (this.dataSignal()) {
        this.makeChart();
      }
    }
  }

  ngOnChanges() {
    if (this.dataSignal() && this.svg) {
      this.svg.selectAll('*').remove();
      if (this.dataSignal()) {
        this.makeChart();
      }
    }
  }

  makeChart() {
    // Determine the series that need to be stacked.
    this.keys = [...new Set(this.dataSignal().values.map((d) => d.term))].sort(
      (a: string, b: string) => a?.toString().localeCompare(b.toString()),
    );
    const seriesIndex: InternMap = index(
      this.dataSignal().values,
      (d: Filter) => d.term,
      (d: Filter) => d.label,
    ) as InternMap;
    this.series = (<unknown>stack()
      .keys(union(this.dataSignal().values.map((d) => d.label))) // distinct series keys, in input order
      .value((D, key: string) => {
        //   const dataMap = D[1] as Map<string, Filter>
        const dKey: Filter = D[1].get(key);
        if (dKey) {
          return <number>dKey.count;
        } else return 0;
      })(
      // get value for each series key and stack
      seriesIndex as Iterable<{ [key: string]: number }>,
    )) as Series<unknown, unknown>; //as Stack<never, { [key: string]: number }, string>; // group by stack then series key
    // Prepare the scales for positional and color encodings.
    this.xScale = scaleBand()
      .domain(this.keys)
      .range([this.margins().left, this.width() - this.margins().right])
      .padding(0.1);

    const yMax: unknown = max(this.series, (d) =>
      max(d, (d: ChartPoint) => d[1]),
    );
    this.yScale = scaleLinear()
      .domain([0, <number>yMax])
      .rangeRound([this.height() - this.margins().bottom, this.margins().top]);

    // Append a group for each series, and a rect for each element in the series.
    this.bars = this.svg
      .append('g')
      .selectAll()
      .data(this.series)
      .join('g')
      .attr('class', 'bar-chart-fill')
      .attr(
        'id',
        (d: { key: string }) => `${<string>d.key.replaceAll(' ', '-')}-fill`,
      )
      .selectAll('rect')
      .data((D: Series<{ [key: string]: number }, string>) =>
        D.map((d: ChartPoint) => ((d.key = D.key), d)),
      )
      .join('rect')
      .attr('x', (d: ChartPoint) => this.xScale(<string>(<unknown>d.data[0])))
      .attr('y', (d: number[]) => this.yScale(d[1]))
      .attr('height', (d: number[]) => this.yScale(d[0]) - this.yScale(d[1]))
      .attr('width', this.xScale.bandwidth())
      .on('mouseover', (event: Event, d: ChartPoint) =>
        this.pointerMoved(event, d),
      )
      .on('mouseout', (event: Event) => this.pointerLeft(event));

    // Append the horizontal axis.
    this.svg
      .append('g')
      .attr(
        'transform',
        `translate(0,${this.height() - this.margins().bottom})`,
      )
      .call(
        axisBottom(this.xScale).tickValues(
          this.xScale.domain().filter(function (d, i) {
            return !(i % 4);
          }),
        ),
      )
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-65)');

    // Append the vertical axis.
    this.svg
      .append('g')
      .attr('transform', `translate(${this.margins().left},0)`)
      .call(axisLeft(this.yScale)); //.ticks(null, "s"))

    // add tooltip last
    this.tooltip = this.svg
      .append('g')
      .attr('class', 'tooltip')
      .style('pointer-events', 'none');
  }

  pointerLeft(event: Event) {
    const bars = this.bars.nodes();
    const i = bars.indexOf(event.currentTarget);
    select(bars[i]).classed('hovered', false);
    this.tooltip.style('display', 'none');
  }

  pointerMoved(event: Event, d: ChartPoint) {
    const bars = this.bars.nodes();
    const i = bars.indexOf(event.currentTarget);
    select(bars[i]).classed('hovered', true);

    const dataString: string[] = (<unknown>[d.data[0]]) as string[];
    Array.from(d.data[1].entries()).forEach(
      (value: [string, { [key: string]: unknown }]) => {
        dataString.push(
          (value[1]['label'] + ': ' + value[1]['count']) as string,
        );
      },
    );

    this.tooltip.style('display', null);
    const [mx, my] = pointer(event);
    this.tooltip.attr('transform', `translate(${mx}, ${my})`);

    const path: Selection<
      BaseType | SVGPathElement,
      undefined,
      null,
      undefined
    > = this.tooltip
      .selectAll('path')
      // eslint-disable-next-line no-sparse-arrays
      .data([,])
      .join('path')
      .attr('fill', 'white')
      .attr('stroke', 'black');

    const text: Selection<
      BaseType | SVGTextElement,
      undefined,
      null,
      undefined
    > = this.tooltip
      .selectAll('text')
      .data([undefined])
      .join('text')
      .call((text) =>
        text
          .selectAll('tspan')
          .data(dataString)
          .join('tspan')
          .attr('x', 0)
          .attr('y', (_, i) => `${i * 1.1}em`)
          .attr('font-weight', (_, i) => (i ? null : 'bold'))
          .text((d) => d),
      );

    this.tooltip.transition().duration(100).style('opacity', 0.9);

    this.size(text, path);
  }
}
