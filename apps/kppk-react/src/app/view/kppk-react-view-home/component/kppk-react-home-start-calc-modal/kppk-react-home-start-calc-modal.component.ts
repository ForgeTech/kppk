import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  effect,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {
  FgLayoutDefaultComponent,
  pdf2array,
  Pdf2ArrayOptions,
} from '@kppk/fg-lib-new';
import { parse } from 'papaparse';
import {
  FileInput,
  MaterialFileInputModule,
} from 'ngx-custom-material-file-input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FileValidator } from 'ngx-custom-material-file-input';
import { FormControl, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  KppkFormlyModule,
  oi3_bgf_bzg_m2_parser,
  oi3_table_header_type_parser,
  oi3_table_headline_parser,
  OI3_TABLE_ROW_TYPE,
  oi3_table_row_type_parser,
  ReactViewHomeMachineActorService,
  rose_file_data_parser,
  rose_table_row_parser,
  ROSE_TABLE_ROW_TYPE,
  rose_table_section_headline_parser,
  ROSE_TABLE_SYSTEM_ROW,
  rose_table_system_row_parser,
  unit_tonco2_xyear_parser,
} from '@kppk/react-lib';
import { FgTranslate } from '@kppk/fg-lib-new';
import { z } from 'zod';

@Component({
  selector: 'react-home-start-calc-modal',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatTooltipModule,
    MatToolbarModule,
    MatIconModule,
    KppkFormlyModule,
    MaterialFileInputModule,
    MatFormFieldModule,
    FgLayoutDefaultComponent,
  ],
  templateUrl: './kppk-react-home-start-calc-modal.component.html',
  styles: [''],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KppkReactHomeStartCalcModalComponent {
  protected $translate = inject(FgTranslate);
  protected $actor_react_view_home = inject(ReactViewHomeMachineActorService);

  protected kppk_react_home_translationsS = toSignal(
    this.$translate.get_translations$({
      headline_start_calc_modal: "home",
      content_provide_calculation_data: "home",
      content_provide_calculation_data_choose_option: "home",
      content_provide_calculation_data_from_files: "home",
      content_provide_calculation_data_from_storage: "home",
      headline_selected_from_files: "home",
      placeholder_oi3_file: "home",
      error_required: "home",
      error_max_file_size: "home",
      placeholder_aufbauten_file: "home",
      placeholder_bauteilflaechen_file: "home",
      placeholder_heating_system_file: "home",
      headline_selected_from_stored: "home",
      button_back: "home",
      button_cancel: "home",
      button_start_calc: "home",
    })
  );
  // protected pdf_parser = new PDFParser();

  protected readonly maxSize = 104857600; //100Mb

  protected oi3_file = new FormControl(undefined, [
    Validators.required,
    FileValidator.maxContentSize(this.maxSize),
  ]);
  protected aufbauten_file = new FormControl(undefined, [
    Validators.required,
    FileValidator.maxContentSize(this.maxSize),
  ]);
  protected bauteilflaechen_file = new FormControl(undefined, [
    Validators.required,
    FileValidator.maxContentSize(this.maxSize),
  ]);
  protected heating_system_file = new FormControl(undefined, [
    Validators.required,
    FileValidator.maxContentSize(this.maxSize),
  ]);

  protected selected_s = computed(() => {
    return this.$actor_react_view_home
      .stateS()
      ?.matches({ MODAL: { SHOWN: 'SELECTED' } });
  });
  protected selected_from_files_s = computed(() => {
    return this.$actor_react_view_home
      .stateS()
      ?.matches({ MODAL: { SHOWN: { SELECTED: 'FROM_FILES' } } });
  });
  protected selected_from_stored_s = computed(() => {
    return this.$actor_react_view_home
      .stateS()
      ?.matches({ MODAL: { SHOWN: { SELECTED: 'FROM_STORED' } } });
  });
  protected selected_ready_s = computed(() => {
    return this.$actor_react_view_home
      .stateS()
      ?.matches({ MODAL: { SHOWN: { SELECTED: { FROM_FILES: 'READY' } } } });
    // || this.$actor_react_view_home.stateS()?.matches({ 'MODAL': { 'SHOWN': {'SELECTED': { 'FROM_STORED': {'FROM_FILE'}}}}});
  });

  protected oi3_file_change_s = toSignal(this.oi3_file.valueChanges, {
    initialValue: undefined,
  });
  protected aufbauten_file_change_s = toSignal(
    this.aufbauten_file.valueChanges,
    { initialValue: undefined }
  );
  protected bauteilflaechen_file_change_s = toSignal(
    this.bauteilflaechen_file.valueChanges,
    { initialValue: undefined }
  );
  protected heating_system_file_change_s = toSignal(
    this.heating_system_file.valueChanges,
    { initialValue: undefined }
  );

  protected oi3_file_change_e = effect(() => {
    // console.log('>>>>>>>>>>oi3_file_change_e>>>>>>>>')
    const fileInput = this.oi3_file_change_s() as undefined | FileInput;
    if (fileInput?.files) {
      this.handle_oi3_file(fileInput.files[0]);
    }
  });
  protected aufbauten_file_change_e = effect(() => {
    // console.log('>>>>>>>>>>aufbauten_file_change_e>>>>>>>>')
    const fileInput = this.aufbauten_file_change_s() as undefined | FileInput;
    if (fileInput?.files) {
      this.handle_aufbauten_file(fileInput.files[0]);
    }
  });
  protected bauteilflaechen_file_change_e = effect(() => {
    // console.log('>>>>>>>>>>FILE>>>>>>>>')
    const fileInput = this.bauteilflaechen_file_change_s() as
      | undefined
      | FileInput;
    if (fileInput?.files) {
      this.handle_bauteilflaechen_file(fileInput.files[0]);
    }
  });
  protected heating_system_file_change_e = effect(() => {
    // console.log('>>>>>>>>>>heating_system_file_change_e>>>>>>>>')
    const fileInput = this.heating_system_file_change_s() as
      | undefined
      | FileInput;
    if (fileInput?.files) {
      this.handle_rose_file(fileInput.files[0]);
    }
  });
  protected select_from_files = (event: Event) => {
    event.preventDefault();
    this.$actor_react_view_home.send({
      type: 'react.view.home.event.modal.from_files',
    });
  };
  protected select_from_stored = (event: Event) => {
    event.preventDefault();
    this.$actor_react_view_home.send({
      type: 'react.view.home.event.modal.from_stored',
    });
  };
  protected close_modal = (event: Event) => {
    event.preventDefault();
    this.$actor_react_view_home.send({
      type: 'react.view.home.event.modal.close',
    });
  };
  protected back = (event: Event) => {
    event.preventDefault();
    this.$actor_react_view_home.send({
      type: 'react.view.home.event.modal.back',
    });
  };
  protected start_calc = (event: Event) => {
    event.preventDefault();
    this.$actor_react_view_home.send({
      type: 'react.view.home.event.modal.start_calculation',
    });
  };

  public cleanString(input: string) {
    var output = '';
    for (let i = 0; i < input.length; i++) {
      if (
        input.charCodeAt(i) <= 127 ||
        (input.charCodeAt(i) >= 160 && input.charCodeAt(i) <= 255)
      ) {
        output += input.charAt(i);
      } else {
        output += '?';
      }
    }
    return output;
  }

  public handle_oi3_file(file: File) {
    file.arrayBuffer().then((buffer: ArrayBuffer) => {
      // console.log('>>>>>>>>>>>>>>>>>>>>ARRAY_BUFFER');
      // console.log( buffer instanceof ArrayBuffer )
      const options: Pdf2ArrayOptions = {
        stripFooters: true,
        stripSuperscript: true,
      };
      pdf2array(buffer, options).then((pdfData) => {
        // console.log('>>>>>>>>>>>>>>>>>PDF_DATA>>>>>>>>>>>>>>>>>');
        // console.log(pdfData);
        let found_bfg_or_bgz = false;
        let bfg_or_bgz_value = 0;
        let found_matching_table_format = false;
        let found_section_headline = false;

        const data_matching_format: OI3_TABLE_ROW_TYPE[] = [];
        const data_matching_after_section_headline: OI3_TABLE_ROW_TYPE[] = [];

        pdfData.forEach((row, index) => {
          if (found_bfg_or_bgz === false) {
            for (let row_field = 0; row_field < row.length - 1; row_field++) {
              // console.log('>>>>>>>>>>>>>>CHECK_ROW_INDEX>>>>>>>>>>>>>: ' + index )
              const element1 = row[row_field];
              const element2 = row[row_field + 1];
              const tuple_to_parse = [element1, element2];
              // console.log(tuple_to_parse)
              // const parsed = oi3_bgf_bzg_m2_parser.parse([element1, element2])
              const parsed = oi3_bgf_bzg_m2_parser.parse(['BGF:', '661,78 m²']);
              // console.log('>>>>>>>>>>>>>FOUND_BGF_BZG_AT_ROW: ', index);
              bfg_or_bgz_value = parsed[1];
              // console.log(bfg_or_bgz_value);
              found_bfg_or_bgz = true;
              break;
            }
          }
          try {
            oi3_table_headline_parser.parse(row);
            found_section_headline = true;
            // console.log('>>>>>>>>>>>>>FOUND_SECTION_HEADLINE_AT_ROW: ', index);
          } catch (error) {
            // Ignore error
          }
          try {
            if (found_matching_table_format === false) {
              row = row.map((cell: any) => cell.trim());
              oi3_table_header_type_parser.parse(row);
              // console.log('>>>>>>>>>>>>>TABLE_STARTED_AT_ROW: ', index+1);
              found_matching_table_format = true;
            } else {
              oi3_table_row_type_parser.parse(row);
              data_matching_format.push(row);
              if (found_section_headline) {
                data_matching_after_section_headline.push(row);
              }
            }
          } catch (error) {
            if (found_matching_table_format === true) {
              // console.log('>>>>>>>>>>>>>TABLE_ENDED_AT_ROW: ', index-1);
              found_matching_table_format = false;
            }
          }
        });
        // console.log('>>>>>>>>>>>>>END_PARSING_OI3: ');
        // console.log('>>>>>>>>>>>>>RESULT: ');
        // console.log(data_matching_format.length)
        // console.log(data_matching_after_section_headline.length);
        console.table(data_matching_after_section_headline);
        for (
          let index = 0;
          index < data_matching_after_section_headline.length;
          index++
        ) {
          const row = data_matching_after_section_headline[index];
          const name = row[0];
          row[0] = this.cleanString(name);
        }

        try {
          // const data = oi3_file_data_parser.parse({
          const data = z.any().parse({
            area: bfg_or_bgz_value,
            data: data_matching_after_section_headline,
          });
          this.$actor_react_view_home.send({
            type: 'react.view.home.event.oi3.ready',
            data,
          });
        } catch (error) {
          // this.$actor_react_view_home.send({ type: 'react.view.home.event.oi3.error' });
        }
      });
    });
  }

  public handle_rose_file(file: File) {
    file.arrayBuffer().then((buffer: ArrayBuffer) => {
      // console.log('>>>>>>>>>>>>>>>>>>>>ARRAY_BUFFER');
      // console.log( buffer instanceof ArrayBuffer )
      const options: Pdf2ArrayOptions = {
        stripFooters: true,
        stripSuperscript: true,
      };
      pdf2array(buffer, options).then((pdfData) => {
        // console.log(pdfData);
        let rose_table_section_headline_count = 0;
        let rose_table_system_row: ROSE_TABLE_SYSTEM_ROW | undefined =
          undefined;
        let found_matching_row: ROSE_TABLE_ROW_TYPE | undefined = undefined;

        pdfData.forEach((row, index) => {
          if (rose_table_section_headline_count < 2) {
            // Find headline section row
            try {
              rose_table_section_headline_parser.parse(row);
              rose_table_section_headline_count++;
              // console.log('>>>>>>>>>>>>>FOUND_ROSE_SECTION_HEADLINE_INDEX: ', index);
            } catch (error) {}
          }
          if (
            rose_table_section_headline_count === 2 &&
            rose_table_system_row === undefined
          ) {
            // Find system row
            try {
              rose_table_system_row = rose_table_system_row_parser.parse(row);
              // console.log('>>>>>>>>>>>>>FOUND_ROSE_SYSTEM_ROW_AT_INDEX: ', index);
            } catch (error) {}
          }
          if (
            rose_table_section_headline_count === 2 &&
            rose_table_system_row &&
            found_matching_row === undefined
          ) {
            // Find value row
            try {
              found_matching_row = rose_table_row_parser.parse(row);
              // console.log('>>>>>>>>>>>>>FOUND_ROSE_DATA_ROW_AT_INDEX: ', index);
            } catch (error) {}
          }
        });
        // console.log('>>>>>>>>>>>>>ROSE_PARSED>>>>>>>>>>>>>: ');
        console.table(rose_table_system_row);
        console.table(found_matching_row);
        const rose_data_raw = rose_file_data_parser.parse({});
        try {
          found_matching_row =
            found_matching_row as unknown as ROSE_TABLE_ROW_TYPE;
          // Remove first element
          found_matching_row.shift();
          for (let index = 0; index < rose_table_system_row!.length; index++) {
            const system_value = rose_table_system_row![index].toLowerCase();
            const value = found_matching_row.shift();
            const unit = found_matching_row.shift();
            // console.log('TEST:', value + ' ' + unit);

            if (system_value.startsWith('gas')) {
              rose_data_raw.gas = unit_tonco2_xyear_parser.parse({ value });
            } else if (
              system_value.startsWith('district') ||
              system_value.startsWith('fernwärme')
            ) {
              rose_data_raw.district = unit_tonco2_xyear_parser.parse({
                value,
              });
            } else if (
              system_value.startsWith('air-water') ||
              system_value.startsWith('luft-wasser')
            ) {
              rose_data_raw.air_water = unit_tonco2_xyear_parser.parse({
                value,
              });
            } else if (
              system_value.startsWith('geothermal') ||
              system_value.startsWith('sole-wasser')
            ) {
              rose_data_raw.geothermal = unit_tonco2_xyear_parser.parse({
                value,
              });
            } else if (system_value.startsWith('pellets')) {
              rose_data_raw.pellets = unit_tonco2_xyear_parser.parse({ value });
            }
          }

          const payload = rose_file_data_parser.parse(rose_data_raw);
          this.$actor_react_view_home.send({
            type: 'react.view.home.event.rose.ready',
            data: payload,
          });
        } catch (error) {
          // this.$actor_react_view_home.send({ type: 'react.view.home.event.rose.error' });
        }
      });
    });
  }

  public transform_aufbauten_data(data: [string[]]) {
    let result: string[] = [];

    let result_test: any[] = [];
    data.forEach((row) => {
      // console.log('>>>>>>>>>>>>ROW>>>>>>>>>>>>>>>');
      // console.log(row);
      const result = row.map((value) => value.split('\t')).flat();
      result_test.push(result);
      // result_test += '["'.concat( row.join('", "')  ,'"],\n')
    });
    // console.log(result_test)
    this.$actor_react_view_home.send({
      type: 'react.view.home.event.aufbauten.ready',
      data: result_test,
    });
  }

  public handle_aufbauten_file(file: File) {
    const config = {
      delimiter: ';',
      // // newline: "",
      // quoteChar: '"',
      // escapeChar: '"',
      header: false,
      // transformHeader: undefined,
      // dynamicTyping: false,
      // preview: 0
      encoding: 'ISO-8859-1',
      // worker: false,
      // comments: false,
      // step: undefined,
      complete: (result: any) =>
        this.transform_aufbauten_data(result.data as [string[]]),
      error: (error: any) => {},
      // download: false,
      // downloadRequestHeaders: undefined,
      // downloadRequestBody: undefined,
      // skipEmptyLines: false,
      // chunk: undefined,
      // chunkSize: undefined,
      // fastMode: undefined,
      // beforeFirstChunk: undefined,
      // withCredentials: undefined,
      // transform: undefined,
      // delimitersToGuess: [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP],
      // skipFirstNLines: 0
    };
    parse(file, config);
  }

  public handle_bauteilflaechen_file(file: File) {
    const config = {
      delimiter: ';',
      // // newline: "",
      // quoteChar: '"',
      // escapeChar: '"',
      // header: false,
      // transformHeader: undefined,
      // dynamicTyping: false,
      // preview: 0,
      encoding: 'ISO-8859-1',
      // worker: false,
      // comments: false,
      // step: undefined,
      complete: (result: any) =>
        this.transform_bauteilflaechen_data(result.data as [string[]]),
      // error: undefined,
      // download: false,
      // downloadRequestHeaders: undefined,
      // downloadRequestBody: undefined,
      // skipEmptyLines: false,
      // chunk: undefined,
      // chunkSize: undefined,
      // fastMode: undefined,
      // beforeFirstChunk: undefined,
      // withCredentials: undefined,
      // transform: undefined,
      // delimitersToGuess: [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP],
      // skipFirstNLines: 0
    };
    parse(file, config);
  }

  public transform_bauteilflaechen_data(data: [string[]]) {
    let result: string[][] = [];
    data.splice(2, data.length).forEach((row) => {
      result.push(row);
    });
    console.table(result);
    this.$actor_react_view_home.send({
      type: 'react.view.home.event.bauteilflaechen.ready',
      data: result,
    });
  }
}
