import { Component, computed, input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Annotation } from 'rdas-models';

@Component({
  selector: 'lib-annotations-display',
  imports: [CommonModule],
  templateUrl: './annotations-display.component.html',
  styleUrls: ['./annotations-display.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
})
export class AnnotationsDisplayComponent {
  annotations = input<Annotation[] | undefined>();

  annotationsMap = computed(() => {
    const aMap: Map<string, string[]> = new Map<string, string[]>();
    this.annotations()?.forEach((annotation: Annotation) => {
      annotation.semanticTypeNames?.forEach((type: string) => {
        if (aMap.has(type)) {
          let types = aMap.get(type);
          if (types) {
            types.push(<string>annotation.umlsConcept);
          } else {
            types = [<string>annotation.umlsConcept];
          }
          aMap.set(type, types);
        } else {
          aMap.set(type, [<string>annotation.umlsConcept]);
        }
      });
    });
    return aMap;
  });
}
