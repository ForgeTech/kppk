import { TestBed } from "@angular/core/testing";
import { FgSpinnerMachineService } from "./fg-spinner.machine.service";
import { FgSpinnerMachineMethodeService } from "./fg-spinner.machine.methode.service";
import { importProvidersFrom, provideExperimentalZonelessChangeDetection } from "@angular/core";
import { LoggerTestingModule } from "ngx-logger/testing";
import { FgImmutableService, FgXstateService } from "../../service";
import { SnapshotFrom, StateMachine } from "xstate";
import { getShortestPaths, createTestModel, TraversalOptions, TestModelOptions, TestModel } from '@xstate/graph';
import { EventFgSpinnerHideParser, EventFgSpinnerShowParser } from "./fg-spinner.machine.types";

describe.only('FgSpinnerMachineService >', () => {
  let $service: FgSpinnerMachineService;
  
  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        FgSpinnerMachineMethodeService,
        FgImmutableService,
        FgXstateService,
        // provideExperimentalZonelessChangeDetection(),
        importProvidersFrom(LoggerTestingModule),
      ],
    });
    $service = TestBed.inject(FgSpinnerMachineService);
    // context = ContextFgSpinnerParser.parse({});
  });

  describe('SERVICE >', () => {
      it('METHODE: get_machine > returns an instance of StateMachine', () => {
        expect( $service.get_machine() instanceof StateMachine ).toBe( true );
      });
  });

//   describe('MACHINE >', () => {
//     it('METHODE: get_machine > returns an instance of StateMachine', () => {
//       const machine = $service.get_machine();
//     //   const options: TestModelOptions< SnapshotFrom<typeof machine>, any, any > = {
        
//     //   };
//       const model = createTestModel( machine, {} );
//       const path = model.getPathsFromEvents([ EventFgSpinnerShowParser.parse({}),  EventFgSpinnerHideParser.parse({})])
//       expect( path ).toBe( true );
//     });
//   });
//   describe('MACHINE >', () => {
//     it('METHODE: get_machine > returns an instance of StateMachine', () => {
//       const machine = $service.get_machine();
//       const options: TraversalOptions< SnapshotFrom<typeof machine>, any, any > = {
//         events: [
//             EventFgSpinnerShowParser.parse({})
//         ],
//         // stopWhen: state => state.context.trigger_count === 1,
//         stopWhen: state => state.matches({ 'DISPLAY': 'SHOWN'})
//       };
//       const paths = getShortestPaths( machine, options );
//       expect( paths ).toBe( true );
//     });
//   });

});