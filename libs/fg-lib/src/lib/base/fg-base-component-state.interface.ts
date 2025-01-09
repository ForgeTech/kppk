import { Injectable, Injector, OnDestroy, Optional } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { FgEvent, FgLiveCycleEvent } from '../service/fg-event/fg-event.class';
import { FgEventService } from '../service/fg-event/fg-event.service';
import { FgBaseEvent } from './fg-base.event';

export type FgBaseFactoryInterface = { [provider: string]: string };

/**
 * FgBaseStateFactoryService -
 * Meant to provide and intialize a base components
 * state and model
 */

// @Injectable({
//     providedIn: 'root'
// })
// export class FgBaseStateFactoryService<STATE_INTERFACE> {
// public $injector = new BehaviorSubject<Injector>( new Injector() )
//   /** CONSTRUCTOR */
//   constructor<STATE_INTERFACE>( options: STATE_INTERFACE  ){

//   }

// }
