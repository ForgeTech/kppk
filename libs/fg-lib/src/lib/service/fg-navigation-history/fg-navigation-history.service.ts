import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { FgEventService } from '../fg-event/fg-event.service';
import { FgEvent } from './../fg-event/fg-event.class';
import { FgNavigationHistoryEvent } from './fg-navigation-history.event';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

/**
 * FgNavigationHistoryService -
 * Service collecting routers 'last few' navigation-end-events
 */
@Injectable({
  providedIn: 'root',
})
export class FgNavigationHistoryService {
  /** Holds the number of navigation-end events to collect until dropping oldest */
  protected _navigationHistoryItemCount = 15;
  /** Return count of allowed navigation-items */
  get navigationHistoryItemCount(): number {
    return this._navigationHistoryItemCount;
  }
  /** Set allowed count of collected navigation-items and dispatches history-change event */
  set navigationHistoryItemCount(count: number) {
    this._navigationHistoryItemCount = count;
    // Truncate array to allowed number of elements
    if (this._navigationHistory.length > this.navigationHistoryItemCount) {
      this._navigationHistory = this._navigationHistory.slice(0, count);
    }
    // Dispatch history-update event
    this.update();
  }
  /** Stack containing previous navigation-end events starting with newest */
  protected _navigationHistory: NavigationEnd[] = [];
  /** Return previous navigation-end events starting with newest */
  get navigationHistory(): NavigationEnd[] {
    return this._navigationHistory;
  }
  /** Flags if navigating-back is currently possible */
  protected _historyUpdates$: Subject<NavigationEnd[]> = new BehaviorSubject(this._navigationHistory);
  /** Streams current navigation-history */
  get updates$(): Observable<NavigationEnd[]> {
    return this._historyUpdates$.asObservable();
  }
  /** CONSTRUCTOR */
  constructor(
    /** Reference to angular router */
    protected $router: Router,
    /** Reference to event-service */
    protected $event: FgEventService
  ) {
    // Subscribe to routers navigationEnd events and collect them
    this.$router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if (this._navigationHistory.length === this.navigationHistoryItemCount) {
          // If exactly the defined count is contained remove oldest
          this._navigationHistory.unshift();
        }
        // but newest event on top of stack
        this._navigationHistory.unshift(event);
        // dispach navigation history update
        this.update();
      }
    });
  }
  /** Methode for updating and dispatching update on changes to navigation-history */
  update() {
    // Disparch update on observable
    this._historyUpdates$.next(this._navigationHistory);
    // Dispatch history-update event
    this.$event.emitEvent(new FgEvent(FgNavigationHistoryEvent.UPDATE, this, this._navigationHistory));
  }
}
