import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { debounceTime, filter, switchMap, take } from 'rxjs/operators';
import { KppkPrintLayoutImagesService } from './kppk-print-layout-images.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'kppk-print-layout',
  templateUrl: './kppk-print-layout.component.html',
  standalone: true,
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./kppk-print-layout.component.scss']
})
export class KppkPrintLayoutComponent {
  // protected $print: RosePrintService,
  protected $images = inject(KppkPrintLayoutImagesService)
  // public imgBuildPpt = PRINT_IMAGE_BUILD_PPT;
  public image_print_company = this.$images.print_company;
  public img_print_logo = this.$images.print_logo;

  /** CONSTRUCTOR */
  constructor(

  ){
    // super( $view );
    // this.imgKPPKPpt = $printImg.printImageKppkPpt;
    // this.imgROSEPpt = $printImg.printImageRosePpt;
    // const afterViewInit$ = this.event$.pipe(
    //   filter( event => event.signature === FgComponentBaseEvent.AFTER_VIEW_INIT ),
    //   switchMap( value => this.event$.pipe(
    //     filter( event => event.signature === FgComponentBaseEvent.AFTER_VIEW_CHECKED ),
    //     take(1)
    //     )
    //   )
    // )
    // const viewPrepared$ = afterViewInit$.pipe( 
    //   debounceTime( this.$component.$dateTime.getMsFromTimeString( '4s' ) ),
    //   switchMap( event => this.$activeRoute.queryParams )
    // );
    // this.subscribe( viewPrepared$, params => {
    //   setTimeout(function(){
    //     if( this.$global.isBrowser ) {
    //       if( params.export === EXPORT_PDF_QUERY_PARAM ) {
    //         this.$print.startPdfExport( params.exportAs );
    //       } else {
    //         this.$print.startPrint();
    //       }
    //     }
    //   }.bind(this), 0);
    // } )
  }
}
