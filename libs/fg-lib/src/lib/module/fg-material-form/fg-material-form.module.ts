import { NgFormsManager, NgFormsManagerConfig, NG_FORMS_MANAGER_CONFIG } from '@ngneat/forms-manager';
import { NgModule, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NGXLogger } from 'ngx-logger';
import { FormlyModule } from '@ngx-formly/core';
import { FgCommonModule } from '../fg-common/fg-common.module';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FgFileValueAccessor } from '../../component';

@NgModule({
  declarations: [FgFileValueAccessor],
  imports: [
    FgCommonModule,
    FormlyModule,
    FormlyMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    FgCommonModule,
    FormlyMaterialModule,
    FormlyModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    NgFormsManager,
    {
      provide: NG_FORMS_MANAGER_CONFIG,
      useValue: new NgFormsManagerConfig({
        debounceTime: 1000, // defaults to 300
        storage: {
          key: 'NgFormManager',
        },
      }),
    },
  ],
})
export class FgMaterialFormsModule {
  protected $log = inject(NGXLogger);

  //CONSTRUCTOR
  constructor() {
    this.$log.info('FG_MATERIAL_FORMS_MODULE_LOADED');
  }
}
