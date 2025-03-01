import { Injectable } from '@angular/core';
import { PRINT_COVER, PRINT_COMPANY, PRINT_LOGO  } from './kppk-print-layout-images-rose.constants';

@Injectable({
    providedIn: 'root'
  })
  export class KppkPrintLayoutImagesRoseService {
    public print_company: string = PRINT_COMPANY;
    public print_cover: string = PRINT_COVER;
    public print_logo: string = PRINT_LOGO;
  }