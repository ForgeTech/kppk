import { TestBed } from "@angular/core/testing";
import { FG_ENVIRONMENT, FgEnvironmentService } from "@kppk/fg-lib-new";
import { provideAutoSpy } from "jest-auto-spies";
import { LoggerTestingModule } from "ngx-logger/testing";
import { AnyStateMachine, emit, setup } from "xstate";
import { FgXstateService } from "../service";
import { NGXLogger, NgxLoggerLevel, TOKEN_LOGGER_CONFIG } from "ngx-logger";
import { DestroyRef, Injectable } from "@angular/core";
import { FgMachineActorAbstract } from './fg-machine-abstract.service';
import { environment } from "../testing/environment";
import exp from "constants";



describe('FgMachineAbstract', () => {
 
    const TEST_MACHINE = setup({
        types: {
            context: {} as { test: string},
        },
        actions: {
            "emit_event": emit( ( context, event ) => {
            return { type: 'test_event', data: { context, event }};
            })
        }
        }).createMachine({
        context: { test: 'test' },
        id: "test_machine",
        initial: "RUNNING",
        states: {
            RUNNING: {
            entry: {
                type: "emit_event",
            },
            }
        }            
    });
    
  @Injectable({ providedIn: 'any'} )
  class TestMachineService extends FgMachineActorAbstract<typeof TEST_MACHINE>{
    constructor(){
        super(TEST_MACHINE);
    }
  }
  
  let $service:  TestMachineService;
  let $env: FgEnvironmentService;
  let $log: NGXLogger;
  let $xstate: FgXstateService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        LoggerTestingModule,
      ],
      providers: [
        TestMachineService,
        provideAutoSpy(FgEnvironmentService),
        { provide: FG_ENVIRONMENT, useValue: environment },
        provideAutoSpy(NGXLogger),
        { provide: TOKEN_LOGGER_CONFIG, useValue: { level: NgxLoggerLevel.INFO } },
        provideAutoSpy(FgXstateService),
        DestroyRef,
      ],
    });
    $service = TestBed.inject(TestMachineService);
    $env = TestBed.inject(FgEnvironmentService);
    $log = TestBed.inject(NGXLogger);
    $xstate = TestBed.inject(FgXstateService);
    jest.resetAllMocks()
  });

  it.only('TestMachineService based on FgMachineAbstract has been created', () => {
    expect($service).toBeTruthy()
  })

})