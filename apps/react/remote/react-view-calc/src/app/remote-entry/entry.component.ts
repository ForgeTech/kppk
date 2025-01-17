import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'kppk-react-view-calculation',
  template: `<div>CALCULATION</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RemoteEntryComponent {}
