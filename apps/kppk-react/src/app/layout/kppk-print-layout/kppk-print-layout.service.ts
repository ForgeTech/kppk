import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import {Router} from '@angular/router';
import { BehaviorSubject, combineLatest, concat, Observable, of, Subject } from 'rxjs';
import { filter,  switchMap, take, toArray } from 'rxjs/operators';
// import { FgGlobalService } from '../../fg-global/fg-global.service';
// import { FgEvent } from '../../fg-shared/class/fg-event.class';
// import { FgSpinnerGuardEvent } from '../../fg-shared/guards/fg-use-spinner/fg-use-spinner.guard.event';
// import { FgActiveViewService } from '../../fg-shared/service/fg-active-view/fg-active-view.service';
// import { FgEventService } from '../../fg-shared/service/fg-event/fg-event.service';
// import { FgJsPdfService } from '../../fg-shared/service/fg-jspdf/fg-jspdf.service';
// import { FgRendererService } from '../../fg-shared/service/fg-renderer/fg-renderer.service';
// import { RoseGeneratePDFIndicatorComponent } from '../../rose-calc/components/rose-generate-pdf-indicator/rose-generate-pdf-indicator.component';
// import { RoseAppEvent } from '../../rose-shared/service/rose-app-events/rose-app.events';
// import { PRINT_ROUTE } from './../../../app-route.constants';


/**
 * RosePrintService -
 * Service to redirect to print-views
 * within rose-application
 */
@Injectable({
  providedIn: 'root'
})
export class RosePrintService {
  /** Hold reference to global window-object if available */
  protected WINDOW: Window;
  /** Class to be used for identifing printing-state */
  protected PRINT_CLASS = 'is-printing';
  /** Member to hold current print-state */
  protected IS_PRINTING = false;
  /** Subject streaming current stat of printing */
  protected IS_PRINTING$: Subject<boolean> = new BehaviorSubject( this.IS_PRINTING );
  /** Setter to be used to set printing-state */
  public set isPrinting( printActive: boolean ) {
    this.IS_PRINTING = printActive;
    this.IS_PRINTING$.next( this.IS_PRINTING );
  }
  /** Getter to return the current printing-state */
  public get isPrinting(): boolean {
    return this.IS_PRINTING;
  }
  /** Stream the current print-state */
  public isPrinting$: Observable<boolean> =  this.IS_PRINTING$.asObservable();


  /** Use this to propagate */
  protected WINDOW_INTERACTION_RECEIVED$: Subject<boolean> = new Subject();
  /** CONSTRUCTOR */
  constructor(
    protected $router: Router,
    protected $renderer: FgRendererService,
    protected $event: FgEventService,
    protected $dialog: MatDialog,
    @Inject(DOCUMENT) protected $document: Document
  ) {
    if( this.$global.isBrowser ) {
      this.WINDOW = this.$global.nativeGlobal<Window>();
      /** Listen for print-shortcuts and surpress default behaviour to use specialized print-view */
      this.$document.addEventListener('keydown', e => {
        if((e.ctrlKey || e.metaKey) && (e.key == "p" || e.charCode == 16 || e.charCode == 112 || e.keyCode == 80) ){
          if( this.$activeView.activeView.printViewUrl !== false ) {
            e.stopImmediatePropagation();
            e.preventDefault();
            e.cancelBubble = true;
            // this.$event.emit( new FgEvent( this.$roseEvent.CALC_PRINT, this ) );
          }
        }
      })
      this.WINDOW.addEventListener('focus', function( event ){ this.WINDOW_INTERACTION_RECEIVED$.next( true ) }.bind( this ));
      this.WINDOW.addEventListener('scroll', function( event ){ this.WINDOW_INTERACTION_RECEIVED$.next( true ) }.bind( this ));
      // this.$event.event$.pipe( filter( event => event.signature === FgSpinnerGuardEvent.END ) ).subscribe( event => {
      //   this.WINDOW_INTERACTION_RECEIVED$.next( true );
      // });
    }
  }
  /** Redirect to according printing sup-route */
  public goToPrintView(documentName: string, documentData: string[]) {
    this.beforePrint();
    this.$router.navigate(['/',
      {
        outlets: {
          'print': [ PRINT_ROUTE, documentName, documentData.join()],
        }
      }
    ]);
  }
  /** Redirect to according printing sup-route */
  public goToExportView(documentName: string, documentData: string[], exportName: string ) {
    this.$router.navigate(['/',
      {
        outlets: {
          'print': [ PRINT_ROUTE, documentName, documentData.join()],
        },
      }
    ],{
      queryParams: {
        export: EXPORT_PDF_QUERY_PARAM,
        exportAs: exportName
      }
    });
  }
  public startPdfExport( filename: string ) {
    this.beforePdfExport();
    if( !filename ) {
      filename = 'export';
    }
    const options: jsPDFOptions = {
      orientation: 'p',
      unit: 'mm',
      format: 'a4',
      compress: true,
      // fontSize: 8,
      // lineHeight: 1,
      // autoSize: false,
      // printHeaders: true

    }
    const  pdf = new jsPDF( options );
    const pages = Array.prototype.slice.call( document.querySelectorAll('.page') );
    const pageMaxCount = pages.length;
    const pageTrigger$: Subject<any> = new Subject()
    let pageIndex = 0;



      concat([
        this.$pdf.html2canvas( document.querySelector('.print-header'), { width: 1050, height: 124 } ),
        this.$pdf.html2canvas( document.querySelector('.print-footer'),  { width: 1050, height: 55 } )
      ]).pipe(
        toArray(),
        switchMap( values => {
          const [header, footer] = values;
          return combineLatest([
            of( header ),
            pageTrigger$.pipe(
              // tap( values => console.log('START HTMLCANVAS FOR: ', pageIndex )),
              switchMap( pageHTML => this.$pdf.html2canvas( pageHTML, { width: 1050, height: 1400, logging: false } ) ),
              // tap( values => console.log('FINISH HTMLCANVAS FOR', pageIndex)),
              // take( 2 )
            ),
            of( footer )
          ])
        }),
      )
      .subscribe(
      progress => {
        // console.log('DOCUMENT Added Page!')
        // console.log( progress );
        if( pageIndex < pages.length ) {
          pageTrigger$.next( pages[pageIndex++] );
        } else {
          pageTrigger$.complete()
        }
      },
      complete => {
        // console.log('DOCUMENT COMPLETE!')
        pdf.save(`${ filename }.pdf`);
        this.afterPdfExport();
      }
    );
    // Start converting the pages
    pageTrigger$.next( pages[pageIndex++] );


  }
  /** Methode called before generating and exporting pdf */
  protected beforePdfExport(): void {
    this.isExporting = true;
    this.$renderer.addHTMLClass( this.EXPORT_CLASS )
    this.openGeneratePDFModal();
  }
  /** Methode called after generating and exporting pdf */
  protected afterPdfExport(): void {
    this.isExporting = false;
    this.$renderer.removeHTMLClass( this.EXPORT_CLASS );
    this.$router.navigate([{ outlets: { print: null }}]);
    this.closeGeneratePDFModal();
  }
  /** Allows opening a generate-pdf-modal*/
  public openGeneratePDFModal(): MatDialogRef<RoseGeneratePDFIndicatorComponent> {
    this.$event.emit( new FgEvent( FgSpinnerGuardEvent.DISABLE, this ) )
    if( !this.EXPORT_SPINNER_REF ) {
      const options: MatDialogConfig =  {
        height: '90%',
        width: '100vw',
        maxWidth: '800px',
      };
      this.EXPORT_SPINNER_REF = this.$dialog.open(
        RoseGeneratePDFIndicatorComponent,
        options
      );
    }
    return this.EXPORT_SPINNER_REF;
  }
  // Allows closing generate-pdf modal
  public closeGeneratePDFModal(): void {
    if( this.EXPORT_SPINNER_REF ) {
      this.EXPORT_SPINNER_REF.close();
      this.EXPORT_SPINNER_REF = undefined;
    }
    this.$event.emit( new FgEvent( FgSpinnerGuardEvent.ENABLE, this ) )
  }
  /**
   * Finishes the of the printing process after
   * printing window is closed by the user
   */
  public startPrint() {
    setTimeout(() => {
      this.WINDOW_INTERACTION_RECEIVED$.pipe( take( 1 ) ).subscribe( values => this.afterPrint() );
      this.WINDOW.print();
    });
  }
  /** Methode called before opening print-window */
  protected beforePrint(): void {
    this.isPrinting = true;
    this.$renderer.addHTMLClass( this.PRINT_CLASS )
  }
  /** Methode called after opening print-window */
  protected afterPrint(): void {
    this.isPrinting = false;
    this.$renderer.removeHTMLClass( this.PRINT_CLASS );
    this.$router.navigate([{ outlets: { print: null }}]);
  }
}
