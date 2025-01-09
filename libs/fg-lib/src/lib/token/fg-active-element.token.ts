import { DOCUMENT } from '@angular/common';
import { inject, InjectionToken } from '@angular/core';
import { fromEvent, map, merge, Observable, shareReplay } from 'rxjs';

export const ACTIVE_ELEMENT = new InjectionToken<Observable<any>>('ACTIVE_ELEMENT', {
  providedIn: 'root',
  factory() {
    const doc = inject(DOCUMENT);
    return merge(
      // something is wrong with RxJS types, this may not happen on a local device
      fromEvent(doc, 'focus', true as any).pipe(map(() => true)),
      fromEvent(doc, 'blur', true as any).pipe(map(() => false))
    ).pipe(
      map(hasFocus => (hasFocus ? doc.activeElement : null)),
      shareReplay({ refCount: true, bufferSize: 1 })
    );
  },
});
