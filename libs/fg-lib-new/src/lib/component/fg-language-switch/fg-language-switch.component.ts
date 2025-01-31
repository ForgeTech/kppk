import { 
  ChangeDetectionStrategy,
  Component,
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
  
  public input_icon_pathS = input('./i18n/icons/', { alias: 'icon_path'});
  public input_colorS = input('primary', { alias: 'color'});
  public input_available_langsS = input<LANG_OPTIONS>([], { alias: 'available_langs' });
  
  public input_selected_langS = input<string>('', {alias: 'selected'});

  // TODO: WRITE OBSIDIAN
  // protected selected_langS = linkedSignal<LANG_OPTIONS, LANG_OPTION | undefined>({
  //   // `selectedOption` is set to the `computation` result whenever this `source` changes.
  //   source: this.input_available_langsS,
  //   computation: (source, previous) => {
  //     console.log( 'PREVIOSU' )
  //     console.log( source )
  //     console.log( previous )
  //     const lang_selected_id = this.input_selected_langS();
  //     if( lang_selected_id !== previous?.value?.id) {
  //       return source.find( lang => lang.id === lang_selected_id)
  //     }
  //     return previous?.value;
  //   }
  // });

  // protected selected_langS = linkedSignal<LANG_OPTIONS, LANG_OPTION | undefined>({
  //   // `selectedOption` is set to the `computation` result whenever this `source` changes.
  //   source: this.input_available_langsS,
  //   computation: (source, previous) => {
  //     console.log( 'PREVIOSU' )
  //     console.log( source )
  //     console.log( previous )
  //     const lang_selected_id = this.input_selected_langS();
  //     if( lang_selected_id !== previous?.value?.id) {
  //       return source.find( lang => lang.id === lang_selected_id)
  //     }
  //     return previous?.value;
  //   }
  // });

  protected selected_langS = linkedSignal<LANG_OPTION | undefined>(
    () => {
      const lang_selected_id = this.input_selected_langS();
      const available_langs = this.input_available_langsS();
      return available_langs.find( lang => lang.id === lang_selected_id);
    }, {
      equal: (prev, next) => prev?.id === next?.id
    }
  );

  public selectionO = output<string>({ alias: 'selection'})

  public on_change( change: MatSelectChange ) {
    const selected = change.value;
      this.selected_langS.set( selected )
      this.selectionO.emit( selected.id )
  }
}
