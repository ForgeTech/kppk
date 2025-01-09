import { Injectable } from '@angular/core';

/**
* FgComponentBaseEvent -
* Class containing the events to be dispatched by FgComponentBaseComponent
*/
@Injectable( { providedIn: 'root' } )
export class FgComponentBaseEvent {
    /** Event to be thrown on view-component receiving focus */
    public static readonly CLICK = 'Event_FgComponentBase_click';
    /** Event to be thrown on view-component receiving focus */
    public static readonly FOCUS_IN = 'Event_FgComponentBase_focusIn';
    /** Event to be thrown after view-component lost focus */
    public static readonly FOCUS_OUT = 'Event_FgComponentBase_focusOut';
    /** Event to be thrown when changes appear on view-component data */
    public static readonly ON_CHANGES = 'Event_FgComponentBase_onChanges';
    /** Event to be thrown on intializing view-component */
    public static readonly ON_INIT = 'Event_FgComponentBase_onInit';
    /** Event to be thrown every change detection run, immediately after onChanges- and onInit-Event */
    public static readonly DO_CHECK = 'Event_FgComponentBase_doCheck';
    /** Event to be thrown after angular projects external content into the component's view
     * the view that a directive is in. */
    public static readonly AFTER_CONTENT_INIT = 'Event_FgComponentBase_afterContentInit';
    /**
    * Event to be thrown every Angular checks the content projected into the directive/component.
    * called after the afterContentInit- and every subsequent doCheck-Event.
    */
    public static readonly AFTER_CONTENT_CHECKED = 'Event_FgComponentBase_afterContentChecked';
    /** Event to be thrown after view-component was rendered in view */
    public static readonly AFTER_VIEW_INIT = 'Event_FgComponentBase_afterViewInit';
    /**
    * Event to be thrown after Angular checks the component's views and child views / the view that a directive is in.
    * called after the afterViewInit and every subsequent afterContentChecked.
    */
    public static readonly AFTER_VIEW_CHECKED = 'Event_FgComponentBase_afterViewChecked';
    /** Event to be thrown when view-component is deleted from view */
    public static readonly ON_DESTROY = 'Event_FgComponentBase_onDestroy';
    /** Event to be thrown when view-component is selected by the user */
    public static readonly SELECTED = 'Event_FgComponentBase_selected';
    /**
    * Event to be thrown when view-component should be edited
    */
    // public static readonly EDIT = 'Event_FgComponentBase_edit';
    /**
    * Event to be thrown when view-component should be deleted
    */
    // public static readonly CREATE = 'Event_FgComponentBase_create';
    /**
    * Event to be thrown when view-component should be deleted
    */
    // public static readonly DELETE = 'Event_FgComponentBase_delete';
    /**
    * Event to be thrown when view-component should be locked
    */
    // public static readonly LOCK = 'Event_FgComponentBase_lock';
    /**
    * Event to be thrown when view-component should be printed
    */
    // public static readonly EXPORT = 'Event_FgComponentBase_export';
    /**
    * Event to be thrown when view-component should be printed
    */
    // public static readonly PRINT = 'Event_FgComponentBase_print';
    /**
    * Event to be thrown when change should be undone
    */
    // public static readonly UNDO = 'Event_FgComponentBase_undo';
    /**
    * Event to be thrown when change should be redone
    */
    // public static readonly REDO = 'Event_FgComponentBase_redo';
}
