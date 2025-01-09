import { inject, Injectable } from "@angular/core";
import { FgBaseService } from "@fg-kppk/fg-base";
import { TranslocoService } from "@jsverse/transloco";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { map, startWith } from "rxjs";
import { KppkReactFieldsUtils } from "./kppk-react-fields-utils.service";

@Injectable({
  providedIn: 'root',
})
export class KppkReactDemolishDisposalFields extends FgBaseService { 
  protected $utils = inject(KppkReactFieldsUtils);
  
  protected container_select_options = () => { return [
      { label: this.$translate.translate( 'calc.' + '10_cubic_meter_container'), value: '10_cubic_meter_container' },
      { label: this.$translate.translate( 'calc.' + 'roll_off_container'), value: 'roll_off_container' },
  ]};
  
  protected concrete_fields: FormlyFieldConfig[] = [
      {
       key: "concrete",
       fieldGroupClassName: "flex flex-row gap-2",
       wrappers: ['section-h4'],
       expressions: {
        'props.label': this.$translate.selectTranslate('calc.concrete')
       },
       fieldGroup: [
         {
           key: 'volume.value',
           type: 'input',
           wrappers: ['unit', 'form-field'],
           // defaultValue: 100,
           props: {
             required: true,
             type: 'number',
             min: 0,
           },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
           expressions: {
            'props.label': this.$translate.selectTranslate('calc.concrete_volume'),
            'props.unit': this.$utils.provide_unit,
           }
         },
         {
           key: 'container.value',
           type: 'select',
           wrappers: ['unit', 'form-field'],
           // defaultValue: '10_cubic_meter_container',
           props: {
             required: true,
             
            //  options: this.container_select_options
           },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
           expressions: {
              'props.label': this.$translate.selectTranslate('calc.concrete_transport'),
              'props.options': this.$translate.langChanges$.pipe( 
                startWith( this.$translate.getActiveLang() ),
                map( () => this.container_select_options() ) 
              ),
            }
         },
         {
           key: 'distance.value',
           type: 'input',
           wrappers: ['unit', 'form-field'],
           // defaultValue: 50,
           props: {
             required: true,
             type: 'number',
             unit: 'km',
             min: 0,
           },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
           expressions: {
            'props.label': this.$translate.selectTranslate('calc.concrete_distance'),
            'props.unit': this.$utils.provide_unit
           }
         }
       ]
      },
     ];
  
  protected steel_fields: FormlyFieldConfig[] = [
      {
       key: "steel",
       fieldGroupClassName: "flex flex-row gap-2",
       wrappers: ['section-h4'],
       expressions: {
        'props.label': this.$translate.selectTranslate('calc.steel')
       },
       fieldGroup: [
         {
           key: 'volume.value',
           type: 'input',
           wrappers: ['unit', 'form-field'],
           // defaultValue: 10,
           props: {
             required: true,
             type: 'number',
             min: 0,
           },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
           expressions: {
            'props.label': this.$translate.selectTranslate('calc.steel_volume'),
            'props.unit': this.$utils.provide_unit
           }
         },
         {
           key: 'container.value',
           type: 'select',
           wrappers: ['unit', 'form-field'],
           // defaultValue: '10_cubic_meter_container',
           props: {
             required: true,
             
            //  options: this.container_select_options
           },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
           expressions: {
              'props.label': this.$translate.selectTranslate('calc.steel_transport'),
              'props.options': this.$translate.langChanges$.pipe( 
                startWith( this.$translate.getActiveLang() ),
                map( () => this.container_select_options() ) 
              ),
            }
         },
         {
           key: 'distance.value',
           type: 'input',
           wrappers: ['unit', 'form-field'],
           // defaultValue: 15,
           props: {
             required: true,
             type: 'number',
             unit: 'km',
             min: 0,
           },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
           expressions: {
            'props.label': this.$translate.selectTranslate('calc.steel_distance'),
            'props.unit': this.$utils.provide_unit
           }
         }
       ]
      },
     ];
  
  protected brick_fields: FormlyFieldConfig[] = [
      {
       key: "brick",
       fieldGroupClassName: "flex flex-row gap-2",
       wrappers: ['section-h4'],
       expressions: {
        'props.label': this.$translate.selectTranslate('calc.brick')
       },
       fieldGroup: [
         {
           key: 'volume.value',
           type: 'input',
           wrappers: ['unit', 'form-field'],
           // defaultValue: 10,
           props: {
             required: true,
             type: 'number',
             min: 0,
           },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
           expressions: {
            'props.label': this.$translate.selectTranslate('calc.brick_volume'),
            'props.unit': this.$utils.provide_unit
           }
         },
         {
           key: 'container.value',
           type: 'select',
           wrappers: ['unit', 'form-field'],
           // defaultValue: '10_cubic_meter_container',
           props: {
             required: true,
             
            //  options: this.container_select_options
           },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
           expressions: {
              'props.label': this.$translate.selectTranslate('calc.brick_transport'),
              'props.unit': this.$utils.provide_unit,
              'props.options': this.$translate.langChanges$.pipe( 
                startWith( this.$translate.getActiveLang() ),
                map( () => this.container_select_options() ) 
              ),
            }
         },
         {
           key: 'distance.value',
           type: 'input',
           wrappers: ['unit', 'form-field'],
           // defaultValue: 100,
           props: {
             required: true,
             type: 'number',
             unit: 'km',
             min: 0,
           },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
           expressions: {
            'props.label': this.$translate.selectTranslate('calc.brick_distance'),
            'props.unit': this.$utils.provide_unit,
           }
         }
       ]
      },
     ];
  
  protected plasterboard_fields: FormlyFieldConfig[] = [
      {
       key: "plasterboard",
       fieldGroupClassName: "flex flex-row gap-2",
       wrappers: ['section-h4'],
       expressions: {
        'props.label': this.$translate.selectTranslate('calc.plasterboard')
       },
       fieldGroup: [
         {
           key: 'volume.value',
           type: 'input',
           wrappers: ['unit', 'form-field'],
           // defaultValue: 10,
           props: {
             required: true,
             type: 'number',
             min: 0,
           },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
           expressions: {
            'props.label': this.$translate.selectTranslate('calc.plasterboard_volume'),
            'props.unit': this.$utils.provide_unit,
           }
         },
         {
           key: 'container.value',
           type: 'select',
           wrappers: ['unit', 'form-field'],
           // defaultValue: '10_cubic_meter_container',
           props: {
             required: true,
             
            //  options: this.container_select_options
           },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
           expressions: {
              'props.label': this.$translate.selectTranslate('calc.plasterboard_transport'),
              'props.unit': this.$utils.provide_unit,
            }
         },
         {
           key: 'distance.value',
           type: 'input',
           wrappers: ['unit', 'form-field'],
           // defaultValue: 100,
           props: {
             required: true,
             type: 'number',
             unit: 'km',
             min: 0,
           },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
           expressions: {
            'props.label': this.$translate.selectTranslate('calc.plasterboard_distance'),
            'props.unit': this.$utils.provide_unit,
           }
         }
       ]
      },
     ];
  
  protected glass_fields: FormlyFieldConfig[] = [
      {
       key: "glass",
       fieldGroupClassName: "flex flex-row gap-2",
       wrappers: ['section-h4'],
       expressions: {
        'props.label': this.$translate.selectTranslate('calc.glass')
       },
       fieldGroup: [
         {
           key: 'volume.value',
           type: 'input',
           wrappers: ['unit', 'form-field'],
           // defaultValue: 2,
           props: {
             required: true,
             type: 'number',
             min: 0,
           },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
           expressions: {
            'props.label': this.$translate.selectTranslate('calc.glass_volume'),
            'props.unit': this.$utils.provide_unit,
           }
         },
         {
           key: 'container.value',
           type: 'select',
           wrappers: ['unit', 'form-field'],
           // defaultValue: '10_cubic_meter_container',
           props: {
             required: true,
             
            //  options: this.container_select_options
           },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
           expressions: {
              'props.label': this.$translate.selectTranslate('calc.glass_transport'),
              'props.unit': this.$utils.provide_unit,
              'props.options': this.$translate.langChanges$.pipe( 
                startWith( this.$translate.getActiveLang() ),
                map( () => this.container_select_options() ) 
              ),
            }
         },
         {
           key: 'distance.value',
           type: 'input',
           wrappers: ['unit', 'form-field'],
           // defaultValue: 100,
           props: {
             required: true,
             type: 'number',
             unit: 'km',
             min: 0,
           },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
           expressions: {
            'props.label': this.$translate.selectTranslate('calc.glass_distance'),
            'props.unit': this.$utils.provide_unit,
           }
         }
       ]
      },
     ];
  
     protected rubble_fields: FormlyFieldConfig[] = [
      {
       key: "rubble",
       fieldGroupClassName: "flex flex-row gap-2",
       wrappers: ['section-h4'],
       expressions: {
        'props.label': this.$translate.selectTranslate('calc.rubble')
       },
       fieldGroup: [
         {
           key: 'volume.value',
           type: 'input',
           wrappers: ['unit', 'form-field'],
           // defaultValue: 15,
           props: {
             required: true,
             type: 'number',
             min: 0,
           },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
           expressions: {
            'props.label': this.$translate.selectTranslate('calc.rubble_volume'),
            'props.unit': this.$utils.provide_unit,
           }
         },
         {
           key: 'container.value',
           type: 'select',
           wrappers: ['unit', 'form-field'],
           // defaultValue: '10_cubic_meter_container',
           props: {
             required: true,
           },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
           expressions: {
              'props.label': this.$translate.selectTranslate('calc.glass_transport'),
              'props.unit': this.$utils.provide_unit,
              'props.options': this.$translate.langChanges$.pipe( 
                startWith( this.$translate.getActiveLang() ),
                map( () => this.container_select_options() ) 
              ),
            }
         },
         {
           key: 'distance.value',
           type: 'input',
           wrappers: ['unit', 'form-field'],
           // defaultValue: 36,
           props: {
             required: true,
             type: 'number',
             unit: 'km',
             min: 0,
           },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
           expressions: {
            'props.label': this.$translate.selectTranslate('calc.rubble_distance'),
            'props.unit': this.$utils.provide_unit,
           }
         }
       ]
      },
     ];
  
  protected eps_fields: FormlyFieldConfig[] = [
      {
       key: "eps",
       fieldGroupClassName: "flex flex-row gap-2",
       wrappers: ['section-h4'],
       expressions: {
        'props.label': this.$translate.selectTranslate('calc.eps')
       },
       fieldGroup: [
         {
           key: 'volume.value',
           type: 'input',
           wrappers: ['unit', 'form-field'],
           // defaultValue: 10,
           props: {
             required: true,
             type: 'number',
             min: 0,
           },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
           expressions: {
            'props.label': this.$translate.selectTranslate('calc.eps_volume'),
            'props.unit': this.$utils.provide_unit,
           }
         },
         {
           key: 'container.value',
           type: 'select',
           wrappers: ['unit', 'form-field'],
           // defaultValue: '10_cubic_meter_container',
           props: {
             required: true,
             
            //  options: this.container_select_options
           },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
           expressions: {
              'props.label': this.$translate.selectTranslate('calc.eps_transport'),
              'props.unit': this.$utils.provide_unit,
              'props.options': this.$translate.langChanges$.pipe( 
                startWith( this.$translate.getActiveLang() ),
                map( () => this.container_select_options() ) 
              ),
            }
         },
         {
           key: 'distance.value',
           type: 'input',
           wrappers: ['unit', 'form-field'],
           // defaultValue: 100,
           props: {
             required: true,
             type: 'number',
             unit: 'km',
             min: 0,
           },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
           expressions: {
            'props.label': this.$translate.selectTranslate('calc.eps_distance'),
            'props.unit': this.$utils.provide_unit,
           }
         }
       ]
      },
     ];
  
  protected xps_fields: FormlyFieldConfig[] = [
      {
       key: "xps",
       fieldGroupClassName: "flex flex-row gap-2",
       wrappers: ['section-h4'],
       expressions: {
        'props.label': this.$translate.selectTranslate('calc.xps')
       },
       fieldGroup: [
         {
           key: 'volume.value',
           type: 'input',
           wrappers: ['unit', 'form-field'],
           // defaultValue: 10,
           props: {
             required: true,
             type: 'number',
             min: 0,
           },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
           expressions: {
            'props.label': this.$translate.selectTranslate('calc.xps_volume'),
            'props.unit': this.$utils.provide_unit,
           }
         },
         {
           key: 'container.value',
           type: 'select',
           wrappers: ['unit', 'form-field'],
           // defaultValue: '10_cubic_meter_container',
           props: {
             required: true,
             
            //  options: this.container_select_options
           },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
           expressions: {
              'props.label': this.$translate.selectTranslate('calc.xps_transport'),
              'props.options': this.$translate.langChanges$.pipe( 
                startWith( this.$translate.getActiveLang() ),
                map( () => this.container_select_options() ) 
              ),
            }
         },
         {
           key: 'distance.value',
           type: 'input',
           wrappers: ['unit', 'form-field'],
           // defaultValue: 100,
           props: {
             required: true,
             type: 'number',
             unit: 'km',
             min: 0,
           },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
           expressions: {
            'props.label': this.$translate.selectTranslate('calc.xps_distance'),
            'props.unit': this.$utils.provide_unit,
           }
         }
       ]
      },
     ];
  
  protected glass_wool_fields: FormlyFieldConfig[] = [
      {
       key: "glass_wool",
       fieldGroupClassName: "flex flex-row gap-2",
       wrappers: ['section-h4'],
       expressions: {
        'props.label': this.$translate.selectTranslate('calc.glass_wool')
       },
       fieldGroup: [
         {
           key: 'volume.value',
           type: 'input',
           wrappers: ['unit', 'form-field'],
           // defaultValue: 10,
           props: {
             required: true,
             type: 'number',
             min: 0,
           },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
           expressions: {
            'props.label': this.$translate.selectTranslate('calc.glass_wool_volume'),
            'props.unit': this.$utils.provide_unit,
           }
         },
         {
           key: 'container.value',
           type: 'select',
           wrappers: ['unit', 'form-field'],
           // defaultValue: '10_cubic_meter_container',
           props: {
             required: true,
             
            //  options: this.container_select_options
           },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
           expressions: {
              'props.label': this.$translate.selectTranslate('calc.glass_wool_transport'),
              'props.options': this.$translate.langChanges$.pipe( 
                startWith( this.$translate.getActiveLang() ),
                map( () => this.container_select_options() ) 
              ),
            }
         },
         {
           key: 'distance.value',
           type: 'input',
           wrappers: ['unit', 'form-field'],
           // defaultValue: 100,
           props: {
             required: true,
             type: 'number',
             unit: 'km',
             min: 0,
           },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
           expressions: {
            'props.label': this.$translate.selectTranslate('calc.glass_wool_distance'),
            'props.unit': this.$utils.provide_unit,
           }
         }
       ]
      },
     ];
  
  protected rock_wool_fields: FormlyFieldConfig[] = [
      {
       key: "rock_wool",
       fieldGroupClassName: "flex flex-row gap-2",
       wrappers: ['section-h4'],
       expressions: {
        'props.label': this.$translate.selectTranslate('calc.rock_wool')
       },
       fieldGroup: [
         {
           key: 'volume.value',
           type: 'input',
           wrappers: ['unit', 'form-field'],
           // defaultValue: 10,
           props: {
             required: true,
             type: 'number',
             min: 0,
           },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
           expressions: {
            'props.label': this.$translate.selectTranslate('calc.rock_wool_volume'),
            'props.unit': this.$utils.provide_unit,
           }
         },
         {
           key: 'container.value',
           type: 'select',
           wrappers: ['unit', 'form-field'],
           // defaultValue: '10_cubic_meter_container',
           props: {
             required: true,
             
            //  options: this.container_select_options
           },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
           expressions: {
              'props.label': this.$translate.selectTranslate('calc.rock_wool_transport'),
              'props.options': this.$translate.langChanges$.pipe( 
                startWith( this.$translate.getActiveLang() ),
                map( () => this.container_select_options() ) 
              ),
            }
         },
         {
           key: 'distance.value',
           type: 'input',
           wrappers: ['unit', 'form-field'],
           // defaultValue: 100,
           props: {
             required: true,
             type: 'number',
             unit: 'km',
             min: 0,
           },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
           expressions: {
            'props.label': this.$translate.selectTranslate('calc.rock_wool_distance'),
            'props.unit': this.$utils.provide_unit,
           }
         }
       ]
      },
     ];
  
  protected wood_fibre_fields: FormlyFieldConfig[] = [
      {
       key: "wood_fibre",
       fieldGroupClassName: "flex flex-row gap-2",
       wrappers: ['section-h4'],
       expressions: {
        'props.label': this.$translate.selectTranslate('calc.wood_fibre')
       },
       fieldGroup: [
         {
           key: 'volume.value',
           type: 'input',
           wrappers: ['unit', 'form-field'],
           // defaultValue: 10,
           props: {
             required: true,
             type: 'number',
             min: 0,
           },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
           expressions: {
            'props.label': this.$translate.selectTranslate('calc.wood_fibre_volume'),
            'props.unit': this.$utils.provide_unit,
           }
         },
         {
           key: 'container.value',
           type: 'select',
           wrappers: ['unit', 'form-field'],
           // defaultValue: '10_cubic_meter_container',
           props: {
             required: true,
             
            //  options: this.container_select_options
           },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
           expressions: {
              'props.label': this.$translate.selectTranslate('calc.wood_fibre_transport'),
              'props.options': this.$translate.langChanges$.pipe( 
                startWith( this.$translate.getActiveLang() ),
                map( () => this.container_select_options() ) 
              ),
            }
         },
         {
           key: 'distance.value',
           type: 'input',
           wrappers: ['unit', 'form-field'],
           // defaultValue: 100,
           props: {
             required: true,
             type: 'number',
             unit: 'km',
             min: 0,
           },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
           expressions: {
            'props.label': this.$translate.selectTranslate('calc.wood_fibre_distance'),
            'props.unit': this.$utils.provide_unit,
           }
         }
       ]
      },
     ];
  
  protected wood_fields: FormlyFieldConfig[] = [
      {
       key: "wood",
       fieldGroupClassName: "flex flex-row gap-2",
       wrappers: ['section-h4'],
       expressions: {
        'props.label': this.$translate.selectTranslate('calc.wood')
       },
       fieldGroup: [
         {
           key: 'volume.value',
           type: 'input',
           wrappers: ['unit', 'form-field'],
           // defaultValue: 3,
           props: {
             required: true,
             type: 'number',
             min: 0,
           },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
           expressions: {
            'props.label': this.$translate.selectTranslate('calc.wood_volume'),
            'props.unit': this.$utils.provide_unit,
           }
         },
         {
           key: 'container.value',
           type: 'select',
           wrappers: ['unit', 'form-field'],
           // defaultValue: '10_cubic_meter_container',
           props: {
             required: true,
             
            //  options: this.container_select_options
           },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
           expressions: {
              'props.label': this.$translate.selectTranslate('calc.wood_transport'),
              'props.options': this.$translate.langChanges$.pipe( 
                startWith( this.$translate.getActiveLang() ),
                map( () => this.container_select_options() ) 
              ),
            }
         },
         {
           key: 'distance.value',
           type: 'input',
           wrappers: ['unit', 'form-field'],
           // defaultValue: 100,
           props: {
             required: true,
             type: 'number',
             unit: 'km',
             min: 0,
           },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
           expressions: {
            'props.label': this.$translate.selectTranslate('calc.wood_distance'),
            'props.unit': this.$utils.provide_unit,
           }
         }
       ]
      },
     ];
  
     protected wood_massive_fields: FormlyFieldConfig[] = [
      {
       key: "wood_massive",
       fieldGroupClassName: "flex flex-row gap-2",
       wrappers: ['section-h4'],
       expressions: {
        'props.label': this.$translate.selectTranslate('calc.wood_massive')
       },
       fieldGroup: [
         {
           key: 'volume.value',
           type: 'input',
           wrappers: ['unit', 'form-field'],
           // defaultValue: 10,
           props: {
             required: true,
             type: 'number',
             min: 0,
           },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
           expressions: {
            'props.label': this.$translate.selectTranslate('calc.wood_massive_volume'),
            'props.unit': this.$utils.provide_unit,
           }
         },
         {
           key: 'container.value',
           type: 'select',
           wrappers: ['unit', 'form-field'],
           // defaultValue: '10_cubic_meter_container',
           props: {
             required: true,
             

            //  options: this.container_select_options
           },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
           expressions: {
              'props.label': this.$translate.selectTranslate('calc.wood_massive_transport'),
              'props.options': this.$translate.langChanges$.pipe( 
                startWith( this.$translate.getActiveLang() ),
                map( () => this.container_select_options() ) 
              ),
            }
         },
         {
           key: 'distance.value',
           type: 'input',
           wrappers: ['unit', 'form-field'],
           // defaultValue: 100,
           props: {
             required: true,
             type: 'number',
             min: 0,
           },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
           expressions: {
            'props.label': this.$translate.selectTranslate('calc.wood_massive_distance'),
            'props.unit': this.$utils.provide_unit,
           }
         }
       ]
      },
     ];
  
     protected wood_material_fields: FormlyFieldConfig[] = [
      {
       key: "wood_material",
       fieldGroupClassName: "flex flex-row gap-2",
       wrappers: ['section-h4'],
       expressions: {
        'props.label': this.$translate.selectTranslate('calc.wood_material')
       },
       fieldGroup: [
         {
           key: 'volume.value',
           type: 'input',
           wrappers: ['unit', 'form-field'],
           // defaultValue: 10,
           props: {
             required: true,
             type: 'number',
             min: 0,
           },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
           expressions: {
            'props.label': this.$translate.selectTranslate('calc.wood_material_volume'),
            'props.unit': this.$utils.provide_unit,
           }
         },
         {
           key: 'container.value',
           type: 'select',
           wrappers: ['unit', 'form-field'],
           // defaultValue: '10_cubic_meter_container',
           props: {
             required: true,
             
            //  options: this.container_select_options
           },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
           expressions: {
              'props.label': this.$translate.selectTranslate('calc.wood_material_transport'),
              'props.options': this.$translate.langChanges$.pipe( 
                startWith( this.$translate.getActiveLang() ),
                map( () => this.container_select_options() ) 
              ),
            }
         },
         {
           key: 'distance.value',
           type: 'input',
           wrappers: ['unit', 'form-field'],
           // defaultValue: 100,
           props: {
             required: true,
             type: 'number',
             unit: 'km',
             min: 0,
           },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
           expressions: {
            'props.label': this.$translate.selectTranslate('calc.wood_material_distance'),
            'props.unit': this.$utils.provide_unit,
           }
         }
       ]
      },
     ];
  
     protected wood_latch_fields: FormlyFieldConfig[] = [
      {
       key: "wood_latch",
       fieldGroupClassName: "flex flex-row gap-2",
       wrappers: ['section-h4'],
       expressions: {
        'props.label': this.$translate.selectTranslate('calc.wood_latch')
       },
       fieldGroup: [
         {
           key: 'volume.value',
           type: 'input',
           wrappers: ['unit', 'form-field'],
           // defaultValue: 10,
           props: {
             required: true,
             type: 'number',
             min: 0,
           },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
           expressions: {
            'props.label': this.$translate.selectTranslate('calc.wood_latch_volume'),
            'props.unit': this.$utils.provide_unit,
           }
         },
         {
           key: 'container.value',
           type: 'select',
           wrappers: ['unit', 'form-field'],
           // defaultValue: '10_cubic_meter_container',
           props: {
             required: true,
             
            //  options: this.container_select_options
           },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
           expressions: {
              'props.label': this.$translate.selectTranslate('calc.wood_latch_transport'),
              'props.options': this.$translate.langChanges$.pipe( 
                startWith( this.$translate.getActiveLang() ),
                map( () => this.container_select_options() ) 
              ),
            }
         },
         {
           key: 'distance.value',
           type: 'input',
           wrappers: ['unit', 'form-field'],
           // defaultValue: 100,
           props: {
             required: true,
             type: 'number',
             unit: 'km',
             min: 0,
           },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
           expressions: {
            'props.label': this.$translate.selectTranslate('calc.wood_latch_distance'),
            'props.unit': this.$utils.provide_unit,
           }
         }
       ]
      },
     ];
  
  protected demolish_disposal_fields_material: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-col gap-2",
      fieldGroup: [
        ...this.concrete_fields,
        ...this.steel_fields,
        ...this.brick_fields,
        ...this.plasterboard_fields,
        ...this.glass_fields,
      ]
    },
    {
      fieldGroupClassName: "flex flex-col gap-2",
      fieldGroup: [
        ...this.wood_fields,
        ...this.wood_massive_fields,
        ...this.wood_material_fields,
        ...this.wood_latch_fields,
        ...this.rubble_fields,
      ]
    }
  ];
  protected demolish_disposal_fields_insulation: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-col gap-2",
      fieldGroup: [
        ...this.eps_fields,
        ...this.xps_fields,
        ...this.glass_wool_fields,
      ]
    },
    {
      fieldGroupClassName: "flex flex-col gap-2",
      fieldGroup: [
        ...this.rock_wool_fields,
        ...this.wood_fibre_fields,
      ]
    },
  ];

  public demolish_disposal_fields_settings: FormlyFieldConfig[] = [
    {
      key: 'distance.value',
      type: 'input',
      wrappers: ['form-field'],
      // defaultValue: 50,
      props: {
        required: true,
        type: 'number',
        min: 0,
      },
      expressions: {
        "props.label": this.$translate.selectTranslate('calc.demolish_disposal_distance'),
        "props.unit": this.$utils.provide_unit
      }
    },
    {
      key: 'usage.value',
      type: 'input',
      wrappers: ['unit', 'form-field'],
      // defaultValue: 80,
      props: {
        required: true,
        type: 'number',
        min: 0,
        max: 100,
      },
      expressions: {
        "props.label": this.$translate.selectTranslate('calc.demolish_disposal_usage'),
        "props.unit": this.$utils.provide_unit
      }
    }
  ];
  
  public demolish_disposal_fields: FormlyFieldConfig[] = [
    {
      key: "setting",
      fieldGroupClassName: "flex flex-row flex-wrap gap-2",
      wrappers: ['section-h3'],
      expressions: {
        'props.label': this.$translate.selectTranslate('calc.demolish_disposal_settings') 
      },
      fieldGroup: this.demolish_disposal_fields_settings
    },
    {
      key: "material",
      fieldGroupClassName: "flex flex-row flex-wrap",
      wrappers: ['section-h3'],
      expressions: {
        'props.label': this.$translate.selectTranslate('calc.material') 
      },
      fieldGroup: this.demolish_disposal_fields_material
    },
    {
      key: "insulation",
      fieldGroupClassName: "flex flex-row flex-wrap",
      wrappers: ['section-h3'],
      expressions: {
        'props.label': this.$translate.selectTranslate('calc.insulation') 
      },
      fieldGroup: this.demolish_disposal_fields_insulation
    }
  ];
  
 

  constructor(
    protected $translate: TranslocoService
  ){
    super();
  }

}