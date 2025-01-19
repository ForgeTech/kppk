import { 
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  output,
  signal
} from '@angular/core';
import {
  MatSelectChange,
  MatSelectModule,
} from '@angular/material/select';

export type LangDefinition = {
  id: string;
  label: string;
}

import { CommonModule } from '@angular/common';
/**
 * FgLanguageSwitchComponent -
 * Component used to allow language-selection
 * from a select-list
 */
@Component({
  selector: 'fg-language-switch',
  templateUrl: './fg-language-switch.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule, 
    MatSelectModule,
  ],

})
export class FgLanguageSwitchComponent {
  protected selected_langS = signal<LangDefinition | undefined>( undefined );
  
  public input_icon_pathS = input('./i18n/icons/', { alias: 'icon_path'});
  public input_colorS = input('primary', { alias: 'color'});
  public input_available_langsS = input<LangDefinition[]>([], { alias: 'available_langs' });
  
  public input_selected_langS = input<string>('', {alias: 'selected'});
  protected input_selected_langS_changeE = effect( () => {
    const selected = this.input_selected_langS();
    const found = this.input_available_langsS().find( item => item.id === selected );
    this.selected_langS.set( found )
  })

  public output_selection = output<LangDefinition>({ alias: 'change'})

  public on_change( change: MatSelectChange ) {
    const selected = change.value;
    const found = this.input_available_langsS().find( item => item.id === selected );
    if( found ) {
      this.selected_langS.set( found )
      this.output_selection.emit( found )
    }
  }
}
