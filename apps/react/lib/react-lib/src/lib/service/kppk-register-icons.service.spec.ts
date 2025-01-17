import { TestBed } from "@angular/core/testing"
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { KppkRegisterIconsService } from "./kppk-register-icons.service";
import { importProvidersFrom } from "@angular/core";
import { LoggerTestingModule } from "ngx-logger/testing";

describe('SERVICE: KppkRegisterIconsService', () => {
    let $service: KppkRegisterIconsService;
    const MatIconRegistryMock = {
        addSvgIcon: jest.fn()
    }
    const DomSanitizerMock = {
        bypassSecurityTrustResourceUrl: jest.fn()
    }
    beforeEach( () => {
        TestBed.configureTestingModule({
            providers: [
                importProvidersFrom(LoggerTestingModule),
                { provide: MatIconRegistry, useValue: MatIconRegistryMock },
                { provide: DomSanitizer, useValue: DomSanitizerMock }
            ]
        });
        $service = TestBed.inject(KppkRegisterIconsService)
    })
    it('register seven icons and sanatize them', () => {
        expect($service['$iconReg']['addSvgIcon']).toHaveBeenCalledTimes(7);
        expect($service['$domSanatizer']['bypassSecurityTrustResourceUrl']).toHaveBeenCalledTimes(7);
    }); 
    // it('register seven icons and sanatize them', () => {
    //     expect($service['$iconReg']['addSvgIcon']).toHaveBeenNthCalledWith(1);
    //     expect($service['$domSanatizer']['bypassSecurityTrustResourceUrl']).toHaveBeenNthCalledWith(1);
    // }); 
})