import { inject, Injectable } from "@angular/core";
import { FgBaseService } from "@kppk/fg-lib";
import { TranslocoService } from "@jsverse/transloco";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { KppkReactFieldsUtils } from "./kppk-react-fields-utils.service";

@Injectable({
    providedIn: 'root',
  })
  export class KppkReactCommonFields extends FgBaseService { 
    protected $utils = inject(KppkReactFieldsUtils);
    
    public fields: FormlyFieldConfig[] = [
      {
        key: "project_name.value",
        type: "input",
        wrappers: ["unit", "form-field"],
        props: {
          required: false,
          label: this.$translate.translate("calc.project_name"),
          type: "string",
        },
        modelOptions: {
          updateOn: 'blur',
          debounce: { default: 500 },
        },
        expressions: {
          'props.unit': this.$utils.provide_unit,
          'props.onFocus': this.$utils.set_focus,
        }
      },
      {
        key: "project_number.value",
        type: "input",
        wrappers: ["unit", "form-field"],
        props: {
          required: false,
          label: this.$translate.translate("calc.project_number"),
          type: "string",
        },
        modelOptions: {
          updateOn: 'blur',
          debounce: { default: 500 },
        },
        expressions: {
          'props.unit': this.$utils.provide_unit,
        }
      },
      {
        key: "project_part.value",
        type: "input",
        wrappers: ["unit", "form-field"],
        props: {
          required: false,
          label: this.$translate.translate("calc.project_part"),
          type: "string",
        },
        modelOptions: {
          updateOn: 'blur',
          debounce: { default: 500 },
        },
        expressions: {
          'props.unit': this.$utils.provide_unit,
        }
      },
    ];

    constructor(
        protected $translate: TranslocoService
    ) {
        super()
    }

  }