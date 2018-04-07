import { Component } from '@angular/core';

@Component({
  selector: 'septa-root',
  template: `
  <h1>
    {{title}}
  </h1>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'septa works!';
}
