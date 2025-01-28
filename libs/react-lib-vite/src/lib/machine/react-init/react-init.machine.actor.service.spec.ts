import {
  importProvidersFrom,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { FgXstateService } from '../../service/fg-xstate.service';
import { FgXstateServiceMock } from '../../service/fg-xstate.service.mock';
import { FgAuthLocalMachineService } from '..';
import { FgEnvironmentService } from '@kppk/fg-lib-new';
import { ReactInitMachineActorService } from './react-init.machine.actor.service';
import { test_machine } from '../../testing';
import { EventFrom, SnapshotFrom } from 'xstate';
import { provideHttpClient } from '@angular/common/http';
import { setHeapSnapshotNearHeapLimit } from 'node:v8';

describe('ReactInitMachineActorService', () => {
  const fg_auth_local_service_mock = {
    get_machine: test_machine,
  };
  const fg_environment_service_mock_development_enabled = {
    development: { enabled: true },
  };
  const fg_environment_service_mock_development_disabled = {
    development: { enabled: false },
  };
  let $service: ReactInitMachineActorService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        provideHttpClient(),
        importProvidersFrom(LoggerTestingModule),
        {
          provide: FgAuthLocalMachineService,
          useValue: fg_auth_local_service_mock,
        },
        { provide: FgXstateService, useValue: FgXstateServiceMock },
        {
          provide: FgEnvironmentService,
          useValue: fg_environment_service_mock_development_enabled,
        },
        ReactInitMachineActorService,
      ],
    });
    $service = TestBed.inject(ReactInitMachineActorService);
    vi.clearAllMocks();
    vi.clearAllTimers();
  });

  test('is created', () => {
    expect($service).toBeTruthy();
  });

  describe('> FgEnvironmentService > development > enabled: true', () => {
    test('MEMBER: config > (environment>development>enabled>true)', () => {
      expect($service['config']).toEqual({
        inspect: { inspect: 'inspect' },
      });
    });
    test('MEMBER: event$ > emit events emitted by test_machine', async () => {
      const subscribtion = $service.event$.subscribe((value) => {
        const snapshot = $service[
          'actor'
        ].getSnapshot() as unknown as SnapshotFrom<typeof test_machine>;
        switch (snapshot.value) {
          case 'START':
            expect(value).toEqual({
              type: 'test_event',
              context: { value: 'start' },
            });
            break;
          case 'MIDDLE':
            expect(value).toEqual({
              type: 'test_event',
              context: { value: 'middle' },
            });
            break;
          case 'END':
            expect(value).toEqual({
              type: 'test_event',
              context: { value: 'end' },
            });
            subscribtion.unsubscribe();
            return;
            break;
        }
      });
      $service.start();
      const event = { type: 'proceed' } as unknown as EventFrom<
        (typeof $service)['machine']
      >;
      $service.send(event);
      $service.send(event);
    });
    test('MEMBER: eventS > emits events emitted by test_machine', () => {
      const event = { type: 'proceed' } as unknown as EventFrom<
        (typeof $service)['machine']
      >;
      expect($service.eventsS()).toBe(undefined);
      $service.start();
      expect($service.eventsS()).toEqual({
        type: 'test_event',
        context: { value: 'start' },
      });
      $service.send(event);
      expect($service.eventsS()).toEqual({
        type: 'test_event',
        context: { value: 'middle' },
      });
      $service.send(event);
      expect($service.eventsS()).toEqual({
        type: 'test_event',
        context: { value: 'end' },
      });
    });
    test('MEMBER: state$ > emits snapshot emitted by test_machine', async () => {
      // Is initialized as undefined
      expect($service.eventsS()).toBe(undefined);
      const event = { type: 'proceed' } as unknown as EventFrom<
        (typeof $service)['machine']
      >;
      const subscribtion = $service.state$.subscribe((value) => {
        const snapshot = value as unknown as SnapshotFrom<typeof test_machine>;
        switch (snapshot.value) {
          case 'START':
            expect(snapshot.children).toEqual({});
            expect(snapshot.context).toEqual({ value: 'start' });
            expect(snapshot.error).toBe(undefined);
            expect(snapshot.historyValue).toEqual({});
            expect(snapshot.output).toEqual(undefined);
            expect(snapshot.status).toEqual('active');
            expect(snapshot.tags).toEqual(new Set());
            expect(snapshot.value).toEqual('START');
            break;
          case 'MIDDLE':
            expect(snapshot.children).toEqual({});
            expect(snapshot.context).toEqual({ value: 'middle' });
            expect(snapshot.error).toBe(undefined);
            expect(snapshot.historyValue).toEqual({});
            expect(snapshot.output).toEqual(undefined);
            expect(snapshot.status).toEqual('active');
            expect(snapshot.tags).toEqual(new Set());
            expect(snapshot.value).toEqual('MIDDLE');
            break;
          case 'END':
            expect(snapshot.children).toEqual({});
            expect(snapshot.context).toEqual({ value: 'end' });
            expect(snapshot.error).toBe(undefined);
            expect(snapshot.historyValue).toEqual({});
            expect(snapshot.output).toEqual({ value: 'end' });
            expect(snapshot.status).toEqual('done');
            expect(snapshot.tags).toEqual(new Set());
            expect(snapshot.value).toEqual('END');
            subscribtion.unsubscribe();
            return true;
            break;
        }
      });
      $service.start();
      $service.send(event);
      $service.send(event);
    });
    test('MEMBER: stateS > emits snapshot emitted by test_machine', () => {
      // Is initialized as undefined
      const event = { type: 'proceed' } as unknown as EventFrom<
        (typeof $service)['machine']
      >;
      expect($service.stateS()).toBe(undefined);
      $service.start();

      expect($service.stateS()?.children).toEqual({});
      expect($service.stateS()?.context).toEqual({ value: 'start' });
      expect($service.stateS()?.error).toBe(undefined);
      expect($service.stateS()?.historyValue).toEqual({});
      expect($service.stateS()?.output).toEqual(undefined);
      expect($service.stateS()?.status).toEqual('active');
      expect($service.stateS()?.tags).toEqual(new Set());
      expect($service.stateS()?.value).toEqual('START');

      $service.send(event);
      expect($service.stateS()?.children).toEqual({});
      expect($service.stateS()?.context).toEqual({ value: 'middle' });
      expect($service.stateS()?.error).toBe(undefined);
      expect($service.stateS()?.historyValue).toEqual({});
      expect($service.stateS()?.output).toEqual(undefined);
      expect($service.stateS()?.status).toEqual('active');
      expect($service.stateS()?.tags).toEqual(new Set());
      expect($service.stateS()?.value).toEqual('MIDDLE');

      $service.send(event);
      expect($service.stateS()?.children).toEqual({});
      expect($service.stateS()?.context).toEqual({ value: 'end' });
      expect($service.stateS()?.error).toBe(undefined);
      expect($service.stateS()?.historyValue).toEqual({});
      expect($service.stateS()?.output).toEqual({ value: 'end' });
      expect($service.stateS()?.status).toEqual('done');
      expect($service.stateS()?.tags).toEqual(new Set());
      expect($service.stateS()?.value).toEqual('END');
    });
    test('MEMBER: is_runningS > is false', () => {
      expect($service.is_runningS()).toBe(false);
    });
    test('METHODE: start > calls ACTOR start and sets is_runningS to true', () => {
      const spy = vi.spyOn($service['actor'], 'start');
      const spy2 = vi.spyOn($service['is_runningS'], 'set');
      $service.start();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy2).toHaveBeenCalledWith(true);
    });
    test('METHODE: stop > calls ACTOR stop and sets is_runningS to false', () => {
      const spy = vi.spyOn($service['actor'], 'stop');
      const spy2 = vi.spyOn($service['is_runningS'], 'set');
      $service.stop();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy2).toHaveBeenCalledWith(false);
    });
    test('METHODE: create_from_config > call logs warning when actor is running', () => {
      const spy = vi.spyOn($service['$log'], 'warn');
      $service.start();
      expect($service.is_runningS()).toBe(true);
      $service.create_from_config({});
      expect(spy).toHaveBeenCalledTimes(2);
    });
    test('METHODE: create_from_config > setups new actor from config', () => {
      const state_subscription_spy = vi.spyOn(
        $service['state_subscription'],
        'unsubscribe'
      );
      const events_subscription_spy = vi.spyOn(
        $service['events_subscription'],
        'unsubscribe'
      );
      const old_state_subscription = $service['state_subscription'];
      const old_events_subscription = $service['events_subscription'];
      const old_actor = $service['actor'];
      const old_config = $service['config'];
      $service.create_from_config({ systemId: 'NEW_ACTOR' });
      // Have been unsubscribed
      expect(state_subscription_spy).toHaveBeenCalledTimes(1);
      expect(events_subscription_spy).toHaveBeenCalledTimes(1);
      // Actor has been renewed
      expect($service['actor']).not.toBe(old_actor);
      // Old subscription has been renewed
      expect($service['state_subscription']).not.toBe(old_state_subscription);
      expect($service['events_subscription']).not.toBe(old_events_subscription);
    });
    test('METHODE: create_from_config > if no new inspect is passed config contains old inspect', () => {
      const old_config = $service['config'];
      const old_inspect = $service['config'].inspect;
      $service.create_from_config({ systemId: 'NEW_ACTOR' });
      const new_config = $service['config'];
      const new_inspect = $service['config'].inspect;
      // Check new config was created
      expect(old_config).not.toBe(new_config);
      expect(new_config.systemId).toBe('NEW_ACTOR');
      // Check inspects
      expect(old_inspect).toBeTruthy();
      expect(new_inspect).toBeTruthy();
      expect(old_inspect).toBe(new_inspect);
    });
    test('METHODE: create_from_config > if new inspect is passed config contains new inspect', () => {
      const old_config = $service['config'];
      const old_inspect = $service['config'].inspect;
      const new_inspect_mock = { inspect: 'inspect' } as any;
      $service.create_from_config({
        systemId: 'NEW_ACTOR',
        inspect: new_inspect_mock,
      });
      const new_config = $service['config'];
      const new_inspect = $service['config'].inspect;
      // Check new config was created
      expect(old_config).not.toBe(new_config);
      expect(new_config.systemId).toBe('NEW_ACTOR');
      // Check inspects
      expect(old_inspect).toBeTruthy();
      expect(new_inspect).toBeTruthy();
      // New inspect is set
      expect(new_inspect).toBe(new_inspect_mock);
    });
  });
  describe('> FgEnvironmentService > development > enabled: false', () => {
    beforeEach(() => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          provideExperimentalZonelessChangeDetection(),
          importProvidersFrom(LoggerTestingModule),
          {
            provide: FgAuthLocalMachineService,
            useValue: fg_auth_local_service_mock,
          },
          { provide: FgXstateService, useValue: FgXstateServiceMock },
          {
            provide: FgEnvironmentService,
            useValue: fg_environment_service_mock_development_disabled,
          },
          ReactInitMachineActorService,
        ],
      });
      $service = TestBed.inject(ReactInitMachineActorService);
      vi.clearAllMocks();
      vi.clearAllTimers();
    });
    test("MEMBER: config doesn't contain inspect", () => {
      expect($service['config']).toEqual({});
    });
  });
});
