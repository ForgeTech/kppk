import { Injectable } from '@angular/core';
// import { saveAs } from 'file-saver';
import { saveAs } from 'file-saver-es';
import { FgBaseService } from '../../base';

export interface FgDownloadJSONConfigurationInterface {
  encoding?: string;
  replacer?: (() => {}) | null;
  space?: number;
  filename?: string;
  fileending?: string;
}
/** Config-entity for client-side constructed downloads */
/**
 * Service used to prepare and execute user file-downloads on the client-side
 */
@Injectable({
  providedIn: 'root',
})
export class FgDownloadService extends FgBaseService {
  /** CONSTRUCTOR */
  constructor() {
    super()
  }
  /**
   * Stringify the passed data-object encode it and download the file
   * @param data
   * @param config
   */
  // CSV( data: object, config: FgDownloadJSONConfigurationInterface = {} ){

  // }
  /**
   * Stringify the passed data-object encode it and download the file
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify?retiredLocale=de
   * @param data
   * @param config
   */
  JSON(data: object, config: FgDownloadJSONConfigurationInterface = {}) {
    const defaultConfig = {
      encoding: 'text/plain;charset=utf-8',
      replacer: null,
      space: 2,
      filename: 'download',
      fileending: 'json',
    };
    const helper: any = Object.assign({}, defaultConfig);
    const usedConfig: any = Object.assign(helper, config);
    const blob = new Blob([JSON.stringify(data, usedConfig.replacer, usedConfig.space)], { type: usedConfig.encoding });
    saveAs(blob, usedConfig.filename.concat('.', usedConfig.fileending), true);
  }
}
