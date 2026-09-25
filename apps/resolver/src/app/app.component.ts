import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IfxHeaderComponent } from 'ifx-header';

@Component({
  imports: [RouterModule, IfxHeaderComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Resolver';
}
