import {
  EventEmitter,
  Injectable,
  InjectionToken,
  Output,
  signal,
} from '@angular/core';
import { GraphNode } from 'utils-models';
import { DataProperty } from 'utils-models';

@Injectable({
  providedIn: 'root',
})
export class ForceDirectedGraphService {
  // note - angular 18 doesn't support output<>() in services, you need an event emitter
  @Output() nodeHovered = new EventEmitter<GraphNode | null>();
  @Output() nodeClicked = new EventEmitter<GraphNode | null>();

  customComponent?: InjectionToken<string>;
  inputData = signal<
    | { data: { [key: string]: DataProperty }[]; fields: DataProperty[] }
    | undefined
  >(undefined);

  hoverNode(data: { event: Event; node: GraphNode }) {
    this.nodeHovered.emit(data.node);
  }

  clickNode(data: { event: Event; node: GraphNode }) {
    this.nodeClicked.emit(data.node);
  }
}
