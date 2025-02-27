
// EXPERIMENT HOW THIS BEST WORKS
// https://stackoverflow.com/questions/76998461/dynamically-change-of-date-and-number-pipe-default-format/77023679
@Pipe({   
    name: 'customdate',   
    pure: false 
}) 
export class CustomDatePipe implements PipeTransform {  

    constructor(
        private translateService: TranslateService, // provided by ngx-translate
        private dateFormatService: DateFormatService
    ) {}

    transform(date: any): any {
        const datePipe: DatePipe = new DatePipe(this.translateService.currentLang);
        return datePipe.transform(date, this.dateFormatService.currentFormat());     
    } 
}