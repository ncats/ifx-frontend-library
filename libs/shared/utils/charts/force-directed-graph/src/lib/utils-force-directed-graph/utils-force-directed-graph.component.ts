// eslint-disable-next-line  @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { CdkPortalOutlet, ComponentPortal } from '@angular/cdk/portal';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  InjectionToken,
  Injector,
  input,
  OnInit,
  PLATFORM_ID,
  Signal,
  signal,
  Type,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { GraphData, GraphNode } from 'utils-models';
import {
  drag,
  forceCenter,
  forceLink,
  forceManyBody,
  forceSimulation,
  forceCollide,
  forceX,
  forceY,
  schemeCategory10,
  selectAll,
  zoom,
  zoomIdentity,
} from 'd3';
import { scaleOrdinal } from 'd3-scale';
import { select } from 'd3-selection';
import { ForceDirectedGraphService } from './force-directed-graph.service';
import { ImageDownloadComponent } from 'image-download';
import { MatButton } from '@angular/material/button';
import { MatSlideToggle } from '@angular/material/slide-toggle';

@Component({
  selector: 'lib-utils-force-directed-graph',
  imports: [
    CommonModule,
    CdkPortalOutlet,
    ImageDownloadComponent,
    MatButton,
    MatSlideToggle,
  ],
  templateUrl: './utils-force-directed-graph.component.html',
  styleUrl: './utils-force-directed-graph.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class UtilsForceDirectedGraphComponent implements OnInit, OnChanges {
  platformId: InjectionToken<NonNullable<unknown>> = inject(
    PLATFORM_ID,
  ) as InjectionToken<NonNullable<unknown>>;
  isBrowser = computed(() => isPlatformBrowser(this.platformId));
  chartElement = viewChild<ElementRef>('graphElement');
  width = computed(
    () =>
      this.chartElement()?.nativeElement.offsetWidth -
      this.margins().left -
      this.margins().right,
  );
  height = computed(
    () =>
      this.chartElement()?.nativeElement.offsetHeight +
      this.margins().top +
      this.margins().bottom,
  );
  margins = signal({ top: 10, bottom: 10, left: 10, right: 10 });
  svgExport = signal(this.getExport());
  data = input<GraphData>({ graph: { nodes: [], links: [] } });

  showLabels = false;
  graphChartService = inject(ForceDirectedGraphService);
  graphLegendElement: Signal<ElementRef | undefined> = viewChild(
    'forceDirectedGraphElement',
  );
  _injector = inject(Injector);
  componentPortal?: ComponentPortal<unknown>;

  color = scaleOrdinal(schemeCategory10);

  clickedNode: GraphNode | null = null;
  svg = computed(() => {
    return select(this.chartElement()?.nativeElement)
      .append('svg:svg')
      .attr('viewBox', [0, -(this.height() / 2), this.width(), this.height()])
      .attr('style', 'max-width: 100%; height: auto;')
      .on('click', (event, d) => {
        if (event.target.nodeName === 'svg') {
          this.clearStyles();
        }
      })
      .call(
        zoom()
          .scaleExtent([0, 8])
          .on('zoom', (event) => this.zoomed(event)),
      );
  });

  gZoom = computed(() =>
    this.svg().append('g').attr('class', 'main-component'),
  );
  // The force simulation mutates links and nodes, so create a copy
  // so that re-evaluating this cell produces the same result.
  links = computed(() => this.data().graph.links.map((d) => ({ ...d })));
  nodes = computed(() => this.data().graph.nodes.map((d) => ({ ...d })));

  simulation = computed(() =>
    forceSimulation(this.nodes())
      .force(
        'collide',
        forceCollide()
          .radius((d) => 20)
          .iterations(30),
      )
      .force('charge', forceManyBody().strength(-10))
      .force(
        'link',
        forceLink(this.links()).id((d) => d.id),
      )
      .force('x', forceX(this.width() / 2))
      .force('y', forceY(-this.height() / 3))
      .force('center', forceCenter(this.width() / 2, -(this.height() / 2)))

      .on('tick', () => this.ticked()),
  );

  link = computed(() =>
    this.gZoom()
      .append('g')
      .selectAll()
      .data(this.links())
      .join('line')
      .classed('edgeLinks', true)
      .attr('stroke-width', 1)
      .attr('stroke', (d) => d.color || '#ffffff')
      .attr('opacity', 0.2),
  );
  // Add a drag behavior.;
  // Add a line for each link, and a circle for each node.
  squareNode = computed(() =>
    this.gZoom()
      .append('g')
      .selectAll()
      .data(this.nodes().filter((n) => n.shape === 'rect'))
      .join('rect')
      .attr('class', (d) => (d.extraClass ? d.extraClass : ''))
      .classed('dataNode', true)
      .classed('squareNode', true)
      .attr('width', 20)
      .attr('height', 20)
      .attr('transform', 'translate(-10, -10)')
      .attr('fill', (d) => (d.color ? d.color : 'black'))
      .attr('stroke-width', 0.5)
      .attr('stroke', '#000000')
      .join('text')
      .text((d) => d.id)
      .on('click', (event, d) => this.clicked(event, d))
      .on('mouseover', (event, d) => this.hovered(event, d))
      .on('mouseout', (event, d) => this.hoveredOff(event, d))

      .call(
        drag()
          .on('start', (event) => this.dragStarted(event))
          .on('drag', (event) => this.dragged(event))
          .on('end', (event) => this.dragEnded(event)),
      ),
  );

  circleNode = computed(() =>
    this.gZoom()
      .append('g')
      .selectAll()
      .data(this.nodes().filter((n) => n.shape === 'circle'))
      .join('circle')
      .attr('class', (d) => (d.extraClass ? d.extraClass : ''))
      .classed('dataNode', true)
      .classed('circleNode', true)
      .attr('r', 10)
      .attr('fill', (d) => (d.color ? d.color : 'black'))
      .attr('stroke-width', 0.5)
      .attr('stroke', '#000000')
      .join('text')
      .text((d) => d.id)
      .on('click', (event, d) => this.clicked(event, d))
      .on('mouseover', (event, d) => this.hovered(event, d))
      .on('mouseout', (event, d) => this.hoveredOff(event, d))
      .call(
        drag()
          .on('start', (event) => this.dragStarted(event))
          .on('drag', (event) => this.dragged(event))
          .on('end', (event) => this.dragEnded(event)),
      ),
  );

  allNodes = computed(() => selectAll('.dataNode'));

  labels = computed(() =>
    this.gZoom()
      .append('g')
      .attr('pointer-events', 'none')
      .attr('text-anchor', 'middle')
      .attr('text-align', 'center')
      .style('user-select', 'none')
      .selectAll('text')
      .data(this.nodes())
      .join('text')
      .classed('graph-label-text', true)
      .text((d) => d.id)
      .attr('transform', 'translate(-10, 5)'),
  );

  ngOnChanges(change) {
    this.gZoom().selectAll('*').remove();
    this.simulation().restart();
    this.resetScale();
    this.svgExport.set(this.getExport());
  }

  ngOnInit(): void {
    this.simulation().restart();
    if (this.graphChartService && this.graphChartService.customComponent) {
      const comp = this._injector.get<Type<unknown>>(
        this.graphChartService.customComponent,
      );
      this.componentPortal = new ComponentPortal(comp);
    }
    this.graphChartService.nodeClicked.subscribe(
      (node) => (this.clickedNode = node),
    );
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.gZoom.call(this.zoomed.transform, zoomIdentity);
    this.svgExport.set(this.getExport());
  }

  clicked(event, d) {
    if (this.clickedNode && this.clickedNode.id === d.id) {
      this.clearStyles();
    } else {
      const filterList = this.links().filter(
        (l) => l.target['id'] === d.id || l.source['id'] === d.id,
      );
      const nodes = Array.from(
        new Set([
          ...filterList.map((l) => l.target['id']),
          ...filterList.map((l) => l.source['id']),
        ]),
      );
      selectAll(this.link())
        .classed(
          'clickedEdge',
          (l) => l.target['id'] === d.id || l.source['id'] === d.id,
        )
        .transition()
        .duration(100);

      selectAll(this.allNodes())
        .classed('clickedNode', (n) => nodes.includes(n.id))
        .transition()
        .duration(100);
      this.graphChartService.nodeClicked.emit(d as GraphNode);
      this.svgExport.set(this.getExport());
    }
  }

  hovered(event, d) {
    const filterList = this.links().filter(
      (l) => l.target['id'] === d.id || l.source['id'] === d.id,
    );
    const nodes = Array.from(
      new Set([
        ...filterList.map((l) => l.target['id']),
        ...filterList.map((l) => l.source['id']),
      ]),
    );
    selectAll(this.link())
      .classed(
        'hoveredEdge',
        (l) => l.target['id'] === d.id || l.source['id'] === d.id,
      )
      .transition()
      .duration(100);

    selectAll(this.allNodes())
      .classed('hoveredNode', (n) => nodes.includes(n.id))
      .transition()
      .duration(100);

    selectAll(this.labels())
      .classed('hoveredLabel', (n) => nodes.includes(n.id))
      .transition()
      .duration(100);

    this.graphChartService.nodeHovered.emit(d as GraphNode);
  }

  hoveredOff(event, d) {
    select(event.target).attr('fill', d.color);
    selectAll(this.labels()).classed('hoveredLabel', this.showLabels);
    this.graphChartService.nodeHovered.emit(null);
  }

  zoomed({ transform }) {
    this.gZoom().attr('transform', transform);
  }

  // Set the position attributes of links and nodes each time the simulation ticks.
  ticked() {
    this.link()
      .attr('x1', (d) => d.source.x)
      .attr('y1', (d) => d.source.y)
      .attr('x2', (d) => d.target.x)
      .attr('y2', (d) => d.target.y);
    this.squareNode()
      .attr('x', (d) => d.x)
      .attr('y', (d) => d.y);
    this.circleNode()
      .attr('cx', (d) => d.x)
      .attr('cy', (d) => d.y);
    this.labels()
      .attr('x', (d) => d.x + 10)
      .attr('y', (d) => d.y + 10);
  }

  // Reheat the simulation when drag starts, and fix the subject position.
  dragStarted(event) {
    if (!event.active) this.simulation().alphaTarget(0.3).restart();
    event.subject.fx = event['subject'].x;
    event.subject.fy = event['subject'].y;
  }

  // Update the subject (dragged node) position during drag.
  dragged(event) {
    event.subject.fx = event['x'];
    event.subject.fy = event['y'];
  }

  // Restore the target alpha so the simulation cools after dragging ends.
  // Unfix the subject position now that it’s no longer being dragged.
  dragEnded(event) {
    if (!event.active) this.simulation().alphaTarget(0);
    event['subject'].fx = event['x'];
    event['subject'].fy = event['y'];
  }

  setLabels() {
    this.showLabels = !this.showLabels;
    selectAll(this.labels())
      .classed('hoveredLabel', this.showLabels)
      .transition()
      .duration(100);
  }

  resetScale() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.zoomed(zoomIdentity);
  }

  clearStyles() {
    selectAll(this.link())
      .classed('clickedEdge', false)
      .classed('hoveredEdge', false)
      .transition()
      .duration(100);

    selectAll(this.allNodes())
      .classed('clickedNode', false)
      .classed('hoveredNode', false)
      .transition()
      .duration(100);

    this.graphChartService.nodeClicked.emit(null);
    this.svgExport.set(this.getExport());
  }

  getExport() {
    return <SVGElement>(
      select(this.chartElement()?.nativeElement).select('svg').node()
    );
  }
}
