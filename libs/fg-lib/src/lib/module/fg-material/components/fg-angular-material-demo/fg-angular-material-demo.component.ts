import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fg-angular-material-demo',
  templateUrl: './fg-angular-material-demo.component.html',
  styleUrls: ['./fg-angular-material-demo.component.scss']
})
export class FgAngularMaterialDemoComponent implements OnInit {
  isChecked: boolean = true;
  constructor() { }

  ngOnInit() {
  }

}
