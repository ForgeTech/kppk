import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-react-lib-vite',
  imports: [CommonModule],
  templateUrl: './react-lib-vite.component.html',
  styleUrl: './react-lib-vite.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactLibViteComponent {}
