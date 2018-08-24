import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  template: `
    <h1>Home Page</h1>
    <hr>
    <p>
      index works!
    </p>
  `,
  styles: []
})
export class IndexComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
