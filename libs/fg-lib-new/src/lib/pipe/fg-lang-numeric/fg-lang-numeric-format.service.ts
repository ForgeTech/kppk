import { Injectable } from "@angular/core";
// EXPERIMENT HOW THIS BEST WORKS
// https://stackoverflow.com/questions/76998461/dynamically-change-of-date-and-number-pipe-default-format/77023679
@Injectable({
    providedIn: 'root'
})
export class FgLangNumericFormatService {

    private format?: string = undefined;

    constructor() {} 

    public useFormat(format: string) {
        this.format = format;
    }

    public currentFormat(): any{
        return this.format;
    }
}