import { Injectable } from '@angular/core';
import { jsPDF, jsPDFOptions } from 'jspdf';
import html2canvas from 'html2canvas';
// import domtoimage from 'dom-to-image';
import { FgGlobalService } from 'src/app/modules/fg-global/fg-global.service';
import { from, Observable } from 'rxjs';
// import { image } from 'html2canvas/dist/types/css/types/image';
/**
 * FgJsPdfService -
 * Service to provide client-side pdf-generation.
 */
@Injectable({ providedIn: 'root' })
export class FgJsPdfService {
  /** CONSTRUCTOR */
  constructor(public $global: FgGlobalService) {
    // this.jsPdf = new jsPDF();
  }
  public html2canvas(domElement, options): Observable<HTMLCanvasElement> {
    const defaultOptions = {
      // scale: 1,
      imageTimeout: 1000,
      // backgroundColor: '#00f'
    };
    options = Object.assign(defaultOptions, options);
    const image$ = from(html2canvas(domElement, options));
    // image$.subscribe( image => {
    //   console.log( 'HTML2CANVAS_IMAGE' );
    //   console.log( image );
    //   }
    // )
    return image$;
  }

  // public canvasToPDF( pageCanvases: HTMLCanvasElement[], header: HTMLCanvasElement, footer: HTMLCanvasElement ): jsPDF {
  //   const  fileWidth = 208;
  //   const options: jsPDFOptions = {
  //     orientation: 'p',
  //     unit: 'mm',
  //     format: 'a4',
  //     compress: true,
  //     // fontSize: 8,
  //     // lineHeight: 1,
  //     // autoSize: false,
  //     // printHeaders: true

  //   }

  //   const  pdf = new jsPDF( options );
  //   const headerImg = header.toDataURL('image/png');
  //   const headerHeight = header.height * fileWidth / header.width;
  //   const footerImg = footer.toDataURL('image/png');
  //   const footerHeight = footer.height * fileWidth / footer.width;

  //   pageCanvases.forEach( (canvas, index) => {
  //     let fileHeight = canvas.height * fileWidth / canvas.width;
  //     const pageImg = canvas.toDataURL('image/png');
  //     let position = 0;
  //     pdf.addImage(headerImg, 'PNG', 1, 0, fileWidth, headerHeight, )
  //     pdf.addImage(pageImg, 'PNG', 5, headerHeight, fileWidth, fileHeight, 'FAST')
  //     pdf.addImage(footerImg, 'PNG', 1, 285, fileWidth, footerHeight)
  //     pdf.setFontSize( 8 )
  //     pdf.text( ( index + 1 ) + '/' + pageCanvases.length, 205 , 295, {})
  //     // console.log('PDF_PAGE:', index )
  //     // console.log(pageImg )
  //     if ( index < pageCanvases.length-1 ) {
  //       let page = pdf.addPage();
  //     }
  //   });

  //   return pdf;
  // }
  public canvasToPDF2(
    pdf: jsPDF,
    page: HTMLCanvasElement,
    header: HTMLCanvasElement,
    footer: HTMLCanvasElement,
    pageIndex: number,
    pageMaxCount
  ): jsPDF {
    const fileWidth = 208;

    const headerImg = header.toDataURL('image/png');
    const headerHeight = (header.height * fileWidth) / header.width;
    const footerImg = footer.toDataURL('image/png');
    const footerHeight = (footer.height * fileWidth) / footer.width;

    let fileHeight = (page.height * fileWidth) / page.width;
    const pageImg = page.toDataURL('image/png');
    let position = 0;
    pdf.addImage(headerImg, 'PNG', 1, 0, fileWidth, headerHeight);
    pdf.addImage(pageImg, 'PNG', 5, headerHeight, fileWidth, fileHeight, 'FAST');
    pdf.addImage(footerImg, 'PNG', 1, 285, fileWidth, footerHeight);
    pdf.setFontSize(8);
    pdf.text(pageIndex + 1 + '/' + pageMaxCount, 205, 295, {});

    pdf.addPage();

    return pdf;
  }

  public openPDF(): void {
    if (this.$global.isBrowser) {
      // public openPDF( htmlData: ElementRef, pdfName: string | false = false ,  ):void {
      let DATA = document.querySelector('.page');
      console.log('DATA');
      console.table(DATA);

      let pdfName: false | string = 'default';
      if (!pdfName) {
        pdfName = 'default';
      }
      // html2canvas(DATA).then(
      //   canvas => {

      //     let fileWidth = 208;
      //     let fileHeight = canvas.height * fileWidth / canvas.width;

      //     const FILEURI = canvas.toDataURL('image/png')
      //     let PDF = new jsPDF('p', 'mm', 'a4');
      //     PDF.addPage()
      //     let position = 0;
      //     PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
      //     PDF.text( 'test', 0 ,0)

      //     PDF.save(`${ pdfName }.pdf`);
      // });
    }
  }
}

// const doc = new jsPDF();
// doc.text("Hello world!", 10, 10);
// doc.save("a4.pdf"); //
