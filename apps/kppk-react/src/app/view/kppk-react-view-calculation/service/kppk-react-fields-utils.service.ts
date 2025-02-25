import { inject, Injectable, signal } from '@angular/core';
import { FgBaseService, FgTranslate } from '@kppk/fg-lib-new';
import { TranslocoService } from '@jsverse/transloco';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyFieldProps } from '@ngx-formly/material/form-field';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KppkReactFieldsUtils extends FgBaseService {
  protected $translate = inject(FgTranslate);
  protected focus_root_parent_path_key_s = signal<undefined | number | string>(
    undefined
  );

  public provide_unit = (
    field: FormlyFieldConfig<
      FormlyFieldProps & {
        [additionalProperties: string]: any;
      }
    >
  ) => {
    const to_load: Record<string, string> = {};
    let unit: string;
    if (field.key) {
      const key = field.key.toString().replace('.value', '');
      unit = field.model[key as keyof typeof field.model]?.unit;
      unit = unit ? unit : 'none';
      to_load[unit] = 'units';
      // console.log('UNIT: ', unit);
      //this.$translate.translate('calc.' + unit);
    }
    return this.$translate.get_translations$(to_load).pipe(
      // tap( trans => {
      //   console.log('TRANS: ')
      //   console.log(trans);
      // }),
      map( trans => trans[unit]),
      // tap( value => {
      //   console.log('TRANS2: ')
      //   console.log(value);
      // }),
    )
  };

  public provide_focus = (
    field: FormlyFieldConfig<
      FormlyFieldProps & {
        [additionalProperties: string]: any;
      }
    >
  ): any => {
    this.$log?.fatal('TODO! WORK ON PROVIDE_FOCUS');
    const current_field_root_path = this.get_root_parent_path(field);
    return (
      current_field_root_path.join() === this.focus_root_parent_path_key_s()
    );
  };

  public set_focus = (
    field: FormlyFieldConfig<
      FormlyFieldProps & {
        [additionalProperties: string]: any;
      }
    >
  ) => {
    this.$log?.fatal('TODO! WORK ON SET_FOCUS');
    let field_path = this.get_root_parent_path(field)?.join();
    this.$log?.error('SET_FOCUS: ' + field_path);
    this.focus_root_parent_path_key_s.set(field_path);
  };

  public get_root_parent = (
    field: FormlyFieldConfig<
      FormlyFieldProps & {
        [additionalProperties: string]: any;
      }
    >
  ): FormlyFieldConfig<
    FormlyFieldProps & {
      [additionalProperties: string]: any;
    }
  > => {
    let found_root: FormlyFieldConfig<
      FormlyFieldProps & {
        [additionalProperties: string]: any;
      }
    > = field;
    if (found_root.parent) {
      found_root = this.get_root_parent(found_root.parent);
    }
    return found_root;
  };

  public get_root_parent_path = (
    field: FormlyFieldConfig<
      FormlyFieldProps & {
        [additionalProperties: string]: any;
      }
    >,
    root_path: string[] = []
  ): string[] => {
    this.$log?.fatal('TODO! WORK ON GET_ROOT_PARENT_PATH');
    let found_root: FormlyFieldConfig<
      FormlyFieldProps & {
        [additionalProperties: string]: any;
      }
    > = field;
    if (field.key) {
      if (Array.isArray(field.key)) {
        root_path.push(...field.key.map((key) => key.toString()));
      } else {
        root_path.push(field.key.toString());
      }
    }
    if (found_root.parent) {
      found_root = this.get_root_parent(found_root.parent);
    }
    console.log('>>>>>>>>>>>>>>>>FOUND_PATH>>>>>>>>>>>>');
    console.log(root_path);
    return root_path;
  };
}
