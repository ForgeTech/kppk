import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  imports: [CommonModule, NxWelcomeComponent],
  selector: 'kppk-react-react_view_login-entry',
  template: `<kppk-react-nx-welcome></kppk-react-nx-welcome>`,
})
export class RemoteEntryComponent {}
