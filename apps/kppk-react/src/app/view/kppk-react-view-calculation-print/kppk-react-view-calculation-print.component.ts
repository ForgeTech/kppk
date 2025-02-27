import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { KppkPrintLayoutComponent } from '../../layout/kppk-print-layout/kppk-print-layout.component';
import { KppkPrintLayoutImagesService } from '../../layout/kppk-print-layout/kppk-print-layout-images.service';
// import { FgComponentBaseComponent } from 'src/app/modules/fg-shared/components/fg-component-base/fg-component-base.component';
// import { FgComponentBaseService } from 'src/app/modules/fg-shared/components/fg-component-base/fg-component-base.service';
// import { RoseApplicationInterface } from 'src/app/modules/rose-shared/interface/rose-application-interface';
// import { RoseCalculationDataInterface } from 'src/app/modules/rose-shared/interface/rose-application-user-calculation-data.interface';
// import { CalcResultInterface } from 'src/app/modules/rose-shared/interface/rose-calc.interface';
// import { RoseCalcService } from 'src/app/modules/rose-shared/service/rose-calc/rose-calc.service';
// import { RosePrintImagesService } from '../../view/rose-print/rose-print-images.service';
// import { PRINT_IMAGE_ROSE_COVER_PAGE } from '../../view/rose-print/rose-print-result-images.constants';
/**
 * RosePrintResultComponent -
 * Component used to present a deticated print-view
 * for rose calculation results
 */
@Component({
  selector: 'kppk-react-view-calculation-print',
  imports: [CommonModule, KppkPrintLayoutComponent],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './kppk-react-view-calculation-print.component.html',
  styleUrls: ['./kppk-react-view-calculation-print.component.scss']
})
export class KppkReactViewCalculationPrintComponent {
  protected $images = inject(KppkPrintLayoutImagesService)
  // public dataIsReady: boolean = false;
  // public printData: RoseCalculationDataInterface 
  protected print_cover = this.$images.print_cover;
  // public systemsPages$: Observable<any>
  /** CONSTRUCTOR */
  constructor(
    // protected $activeRoute: ActivatedRoute,
    // public $calc: RoseCalcService,
    // public $component: FgComponentBaseService,
    // protected $printImg: RosePrintImagesService
  ) {
    // super( $component )
  //   this.imgROSECover = this.$printImg.printImageRoseCoverPagePpt;
  //   const app: RoseApplicationInterface = this.$component.$data.app as RoseApplicationInterface;
  //   if( app.user.calculation !== undefined )
  //   this.printData = app.user.calculation;
  //   this.systemsPages$ = this.$calc.calcResult$
  //   .pipe(
  //     map( results => {
  //       let systemPages: CalcResultInterface[][] = [];
  //       let page: CalcResultInterface[] = [];
  //       Object.keys( results ).forEach( ( key, index, items ) => {
  //         const system: CalcResultInterface | false = results[ key ];
  //         if( system !== false ) {
  //           page.push( system )
  //         }
  //         if( page.length === 2 || index === items.length - 1) {
  //           systemPages.push( page );
  //           page = [];
  //         }
  //       });
  //       return systemPages;
  //     })
  //   );
  }
}