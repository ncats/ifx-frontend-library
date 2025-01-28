import {
  trigger,
  state,
  style,
  transition,
  animate,
  group,
} from '@angular/animations'

export const slideInOutAnimation = [
  trigger('slideInOut', [
    state(
      'in',
      style({
        //'background-color': 'whitesmoke',
        color: 'black',
      })
    ),
    state(
      'out',
      style({
        'background-color': 'transparent',
        color: 'white',
      })
    ),
    transition('in => out', [group([animate('300ms ease-out')])]),
    transition('out => in', [group([animate('300ms ease-in')])]),
  ]),
]
