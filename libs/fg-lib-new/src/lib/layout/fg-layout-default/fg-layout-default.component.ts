import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'fg-layout-default',
  imports: [CommonModule],
  templateUrl: './fg-layout-default.component.html',
  styleUrls: ['./fg-layout-default.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FgLayoutDefaultComponent {
}
