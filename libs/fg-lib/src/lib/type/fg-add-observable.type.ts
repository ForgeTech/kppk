import { Observable } from 'rxjs';
/**
 * FgAddObservable -
 * Type extends passed generic T with observable
 * of same type
 */
export type FgAddObservable<T> = T | Observable<T>;
