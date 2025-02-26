import { inject, Injectable } from '@angular/core';
import { FgBaseService, FgTranslate } from '@kppk/fg-lib-new';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { KppkReactFieldsUtils } from './kppk-react-fields-utils.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KppkReactCommonFields extends FgBaseService {
  protected $translate = inject(FgTranslate);
  protected translation$ = this.$translate.get_translations$({
    "project_name": "calc",
    "project_number": "calc",
    "project_part": "calc",
  })
  protected translationS = toSignal(this.translation$, {initialValue: undefined});

  protected $utils = inject(KppkReactFieldsUtils);

  public fields: FormlyFieldConfig[] = [
    {
      key: 'project_name.value',
      type: 'input',
      wrappers: ['unit', 'form-field'],
      props: {
        required: false,
        // label: this.$translate.translate('calc.project_name'),
        type: 'string',
      },
      modelOptions: {
        updateOn: 'blur',
        debounce: { default: 500 },
      },
      expressions: {
        'props.label': this.translation$.pipe(
          map( trans => trans['project_name'])
        ),     
        'props.unit': this.$utils.provide_unit,  
        'props.onFocus': this.$utils.set_focus,
      },
    },
    {
      key: 'project_number.value',
      type: 'input',
      wrappers: ['unit', 'form-field'],
      props: {
        required: false,
        // label: this.$translate.translate('calc.project_number'),
        type: 'string',
      },
      modelOptions: {
        updateOn: 'blur',
        debounce: { default: 500 },
      },
      expressions: {
        'props.label': this.translation$.pipe(
          map( trans => trans['project_number'])
        ),  
        'props.unit': this.$utils.provide_unit,  
      },
    },
    {
      key: 'project_part.value',
      type: 'input',
      wrappers: ['unit', 'form-field'],
      props: {
        required: false,
        type: 'string',
      },
      modelOptions: {
        updateOn: 'blur',
        debounce: { default: 500 },
      },
      expressions: {
        'props.label': this.translation$.pipe(
          map( trans => trans['project_part'])
        ),  
        'props.unit': this.$utils.provide_unit,  
      },
    },
  ];
}
