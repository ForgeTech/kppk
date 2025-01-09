import { Component, computed, effect, input, output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { KppkFormlyModule } from '../../../module/kppk-formly-form/kppk-formly.module';
import { KppkReactMaterialsAufbautenRowComponent } from './kppk-react-materials-aufbauten-row.component';
import { KppkReactMaterialsBauteilflaechenRowComponent } from './kppk-react-materials-bauteilflaechen-row.component';
import { KppkReactMaterialsOi3RowComponent } from './kppk-react-materials-oi3-row.component';
import { KppkReactMaterialsTypeRowComponent } from './kppk-react-materials-type-row.component';
import { KppkLoadingIndicatorComponent } from '../../../component/kppk-loading-indicator/kppk-loading-indicator.component';
import { ReactViewCalculationV1Snapshot } from '../../../machine/react-view-calculation/react-view-calculation.machine';
import { KppkReactMaterialsMaterialRowComponent } from "./kppk-react-materials-material-row.component";
import { KppkReactMaterialsConcreteRowComponent } from "./kppk-react-materials-concrete-row.component";
import { KppkReactMaterialsWindowRowComponent } from './kppk-react-materials-window-row.component';
import { FormlyFormOptions } from '@ngx-formly/core';
import { KppkReactMaterialsDefaultsFormComponent } from './kppk-react-materials-defaults-form';
import { KppkReactMaterialsFooterRowComponent } from './kppk-react-materials-footer-row.component';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { REACT_VIEW_CALCULATION_CONTEXT } from '../../../types/kppk-react-calculation.types';
import { KppkWarnBoxResetComponent } from '../../../component/kppk-warn-box-reset/kppk-warn-box-reset.component';

@Component({
  selector: 'fg-react-demo-kppk-react-materials',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
    ScrollingModule,
    KppkFormlyModule,
    KppkReactMaterialsAufbautenRowComponent,
    KppkReactMaterialsBauteilflaechenRowComponent,
    KppkReactMaterialsOi3RowComponent,
    KppkReactMaterialsTypeRowComponent,
    KppkLoadingIndicatorComponent,
    KppkReactMaterialsMaterialRowComponent,
    KppkReactMaterialsConcreteRowComponent,
    KppkReactMaterialsWindowRowComponent,
    KppkReactMaterialsDefaultsFormComponent,
    KppkReactMaterialsFooterRowComponent,
    MatStepperModule,
    MatIconModule,
    KppkWarnBoxResetComponent
],
  templateUrl: './kppk-react-materials.component.html',
  styleUrl: './kppk-react-materials.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class KppkReactMaterialsComponent {
  public transformed_materials_data_s = input.required<REACT_VIEW_CALCULATION_CONTEXT>( { alias: 'transformed_materials_data' });
  public options_s = input.required<FormlyFormOptions>( { alias: 'options' });
  public change = output<any>();

  protected state_react_view_calculation_s = computed( () => {
    const options: FormlyFormOptions = this.options_s();
    const state = options.formState.state_react_view_calculation as ReactViewCalculationV1Snapshot;
    return state;
  })

  protected transformed_aufbauten_s = computed( () => {
    const transformed_materials_data = this.transformed_materials_data_s();
    const result = transformed_materials_data?.actor_transform_file_inputs?.transformed_aufbauten;
    return result;
  });

  protected transformed_bauteilflaechen_s = computed( () => {
    const transformed_materials_data = this.transformed_materials_data_s();
    const result = transformed_materials_data?.actor_transform_file_inputs?.transformed_bauteilflaechen;
    return result;
  });

  protected transformed_oi3_s = computed( () => {
    const transformed_materials_data = this.transformed_materials_data_s();
    const result = transformed_materials_data?.actor_transform_file_inputs?.transformed_oi3;
    return result;
  });

  protected material_type_s = computed( () => {
    const transformed_materials_data = this.transformed_materials_data_s();
    const result = transformed_materials_data?.actor_merge_arich_oi3?.material_type;
    return result;
  });

  protected material_s = computed( () => {
    const transformed_materials_data = this.transformed_materials_data_s();
    const result = transformed_materials_data?.form_material;
    return result;
  });

  protected concrete_s = computed( () => {
    const transformed_materials_data = this.transformed_materials_data_s();
    const result = transformed_materials_data?.form_concrete
    return result;
  });

  protected window_s = computed( () => {
    const transformed_materials_data = this.transformed_materials_data_s();
    const result = transformed_materials_data?.form_window;
    return result;
  });

  protected form_window_defaults_s = computed( () => {
    const state = this.state_react_view_calculation_s();
    const result = state.context.calculation?.form_window.value.defaults;
    return result;
  });

  protected form_concrete_defaults_s = computed( () => {
    const state = this.state_react_view_calculation_s();
    const result = state.context.calculation?.form_concrete.value.defaults;
    return result;
  });

  protected form_material_defaults_s = computed( () => {
    const state = this.state_react_view_calculation_s();
    const result = state.context.calculation?.form_material.value.defaults;
    return result;
  });


  protected emit_model_change( event: any ) {
    this.change.emit(event);
  }

  protected track_by_id( index: number, item: any ) {
    return item?.id || index;
  }
  protected track_by_unit_id( index: number, item: any ) {
    return item?.id.value || index;
  }

}
