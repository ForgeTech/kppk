
// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { FgModalComponent } from './fg-modal.component';
// import { FgMaterialModule } from 'src/app/modules/fg-material/fg-material.module';
// import { FgComponentBaseService } from '../fg-component-base/fg-component-base.service';
// import { NGXLogger } from 'ngx-logger';
// import { FgEventService } from 'src/app/modules/fg-shared/service/fg-event/fg-event.service';
// import { VlvDataService } from 'src/app/services/vlv-data/vlv-data.service';
// import { TranslateService } from '@ngx-translate/core';
// import { FgKeyboardService } from 'src/app/modules/fg-shared/service/fg-keyboard/fg-keyboard.service';
// import { FgGraphqlService } from 'src/app/modules/fg-shared/service/fg-graphql/fg-graphql.service';
// import { FgBreakpointService } from 'src/app/modules/fg-material/service/fg-breakpoint/fg-breakpoint.service';
// import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

// describe('FgModalComponent', () => {
//   let component: FgModalComponent;
//   let fixture: ComponentFixture<FgModalComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         FgMaterialModule
//       ],
//       providers: [
//         FgComponentBaseService,
//         FgEventService,
//         VlvDataService,
//         { provide: MatDialogRef, useValue: {} },
//         { provide: MAT_DIALOG_DATA, useValue: {} },
//         { provide: NGXLogger, useValue: jasmine.createSpyObj(['log', 'warn']) },
//         { provide: TranslateService, useValue: jasmine.createSpy() },
//         { provide: FgKeyboardService, useValue: jasmine.createSpy() },
//         { provide: FgGraphqlService, useValue: jasmine.createSpyObj(['createClient', 'testRestQuery']) },
//         { provide: FgBreakpointService, useValue: jasmine.createSpy() },
//       ],
//       declarations: [ FgModalComponent ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(FgModalComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
