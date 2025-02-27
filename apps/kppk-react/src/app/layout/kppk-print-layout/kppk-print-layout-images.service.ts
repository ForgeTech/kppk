import { Injectable } from '@angular/core';
import { PRINT_IMAGE_KPPK_PPT, PRINT_IMAGE_ROSE_COVER_PAGE, PRINT_IMAGE_ROSE_PPT  } from './kppk-print-layout-images.constants';

@Injectable({
    providedIn: 'root'
  })
  export class KppkPrintLayoutImagesService {
    public print_image_kppk: string = PRINT_IMAGE_KPPK_PPT;
    public print_image_rose_cover: string = PRINT_IMAGE_ROSE_COVER_PAGE;
    public print_image_rose: string = PRINT_IMAGE_ROSE_PPT;
  }