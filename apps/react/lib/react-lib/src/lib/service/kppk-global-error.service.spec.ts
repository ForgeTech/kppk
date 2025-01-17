import { ErrorHandler, importProvidersFrom } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { KppkGlobalError } from "./kppk-global-error.service";
import { LoggerTestingModule } from "ngx-logger/testing";
import { ERROR_KPPK_GLOBAL_MSG } from './kppk-global-error.service';

describe( 'KppkGlobalError', () => {
    beforeEach( () => {
        TestBed.configureTestingModule({
            providers: [
                importProvidersFrom(LoggerTestingModule),
                { provide: ErrorHandler, useClass: KppkGlobalError },
            ]
        })
    })
    it('METHODE: handleError', () => {
        const $service = TestBed.inject(ErrorHandler) as KppkGlobalError;
        const spy = jest.spyOn($service['$log'], 'fatal'); 
        const error: Error = new Error('ERROR');
        
        $service.handleError(error)
        expect(spy).toHaveBeenNthCalledWith(1, ERROR_KPPK_GLOBAL_MSG);
        expect(spy).toHaveBeenNthCalledWith(2, error);
    })
})