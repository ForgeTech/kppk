import { 
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  linkedSignal,
  output,
  signal
} from '@angular/core';
import {
  MatSelectChange,
  MatSelectModule,
} from '@angular/material/select';


export const lang_option = z.object({
  id: z.string(),
  label: z.string()
});
export type LANG_OPTION = z.infer<typeof lang_option>;

export const lang_options = z.array(lang_option);
export type LANG_OPTIONS = z.infer<typeof lang_options>;


import { CommonModule } from '@angular/common';
import { z } from 'zod';
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
  
  public selectionO = output<string>({ alias: 'selection'});
  public input_icon_pathS = input('./i18n/icons/', { alias: 'icon_path'});
  public input_colorS = input('primary', { alias: 'color'});
  public input_available_langsS = input<LANG_OPTIONS>([], { alias: 'available_langs' });
  public input_selected_langS = input<string>('', {alias: 'selected'});

  public selected_lang_idS = linkedSignal( () => {
    return this.input_selected_langS();
  }, 
  {
    equal: (prev, next) => prev === next
  }); 
  protected selected_langS = computed( () => {
    const lang_selected_id = this.selected_lang_idS();
    const langs_available = this.input_available_langsS();
    const result =  langs_available.find( lang => lang.id === lang_selected_id);
    return result;
  });

  public on_change( change: MatSelectChange ) {
    const selected_id = change.value;
    this.selected_lang_idS.set(selected_id);
    this.selectionO.emit( selected_id );
  }
}
