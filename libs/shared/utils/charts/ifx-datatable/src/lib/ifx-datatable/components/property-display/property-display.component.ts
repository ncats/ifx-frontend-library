import {
  ChangeDetectionStrategy,
  Component,
  input,
  Input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DecimalPipe } from '@angular/common';
import { DataProperty } from 'utils-models';

@Component({
  selector: 'lib-property-display',
  templateUrl: './property-display.component.html',
  styleUrls: ['./property-display.component.scss'],
  imports: [MatTooltipModule, RouterLink, DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PropertyDisplayComponent {
  showLabel = input<boolean>(true);

  @Input() displayType?:
    'string' | 'number' | 'externalLink' | 'internalLink' | 'date';

  @Input() property!: DataProperty;

  fetchDisplayType(): string {
    let ret = 'string';
    if (this.displayType) {
      ret = this.displayType;
    } else {
      if (this.property) {
        if (this.property.url) {
          if (this.property.internalLink) {
            ret = 'internalLink';
          } else {
            ret = 'externalLink';
          }
        }
        if (
          Number.isNaN(this.property.value) ||
          Number.isInteger(this.property.value)
        ) {
          ret = 'number';
        }
      }
    }
    return ret;
  }

  isArray(data: unknown) {
    return Array.isArray(data);
  }
}
