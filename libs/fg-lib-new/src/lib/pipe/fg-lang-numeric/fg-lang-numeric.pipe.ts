import { inject, Pipe, PipeTransform } from "@angular/core";
import { FgLangNumericFormatService } from "./fg-lang-numeric-format.service";
import { TranslocoService } from "@jsverse/transloco";
import { DecimalPipe } from "@angular/common";

// EXPERIMENT HOW THIS BEST WORKS
// https://stackoverflow.com/questions/76998461/dynamically-change-of-date-and-number-pipe-default-format/77023679
@Pipe({
    name: 'fg-lang-numeric',
    pure: false,
})
export class CustomNumberPipe implements PipeTransform {
    protected $format = inject(FgLangNumericFormatService);
    protected $transloco = inject(TranslocoService);


    transform(number: any): any {
        // const numberPipe = new DecimalPipe(this.translateService.currentLang);
        // return numberPipe.transform(number, this.numberFormatService.currentFormat());
    }

}