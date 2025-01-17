import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'kppk-react-view-home',
  template: `HOME`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RemoteEntryComponent {}
