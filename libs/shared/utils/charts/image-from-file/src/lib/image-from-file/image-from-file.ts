import { Component, computed, input, resource } from '@angular/core';
import { xml, zoom, zoomIdentity } from 'd3';
import { select } from 'd3-selection';
import { GenericChartComponent } from 'generic-chart';
import { ImageDownloadComponent } from 'image-download';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'lib-image-from-file',
  imports: [ImageDownloadComponent, MatButton],
  templateUrl: 'image-from-file.html',
  styleUrl: './image-from-file.scss',
})
export class ImageFromFile extends GenericChartComponent {
  dataUrl = input<string>();

  override svgExport = computed(() => {
    if (this.dataFileResource.hasValue()) {
      return (<unknown>this.dataFileResource.value()) as SVGElement;
    } else {
      return undefined as unknown as SVGElement;
    }
  });

  dataFileResource = resource({
    params: () => ({ dataUrl: <string>this.dataUrl() }),
    loader: ({ params }) => {
      return xml(params.dataUrl).then((res) => {
        return res.documentElement;
      });
    },
  });

  override svg = computed(() => {
    if (this.dataFileResource.hasValue()) {
      const element = select(this.chartElement().nativeElement);
      const node = element.node();
      node!.append(this.dataFileResource.value());
      this.zoomed = zoom()
        .scaleExtent([1, 8])
        .on('zoom', (event) => {
          const holder = select('.svglite');
          holder.attr('transform', event.transform);
        });
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      element.call(this.zoomed);
      return node;
    } else return undefined;
  });

  constructor() {
    super();
    this.margins.set({ top: 20, bottom: 50, right: 30, left: 10 });
  }

  resetScale() {
    const holder = select('.svglite');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    holder.call(this.zoomed.transform, zoomIdentity);
  }
}
