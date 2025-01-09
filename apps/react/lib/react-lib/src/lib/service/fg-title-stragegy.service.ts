import { Injectable, OnDestroy } from '@angular/core';

import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

import { TranslocoService } from '@jsverse/transloco';

import { Subject, SubscriptionLike, combineLatest, map, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FgPublicTitleStragegyService extends TitleStrategy implements OnDestroy {
  protected count = 1;
  protected UPDATE_TITLE$ = new Subject<RouterStateSnapshot>();
  protected UPDATE_TITLE$$: SubscriptionLike;
  constructor(
    private readonly $title: Title,
    private readonly $translate: TranslocoService,
  ) {
    super();
    const generalTranslation$ = this.$translate.langChanges$.pipe(
      switchMap(lang => this.$translate.selectTranslation('general'.concat('/', lang))),
    );
    const updateTitle$ = combineLatest([this.UPDATE_TITLE$, generalTranslation$]);
    this.UPDATE_TITLE$$ = updateTitle$
      .pipe(
        map(values => {
          const [snapshot, translation] = values;
          // console.log('SNAPSHOT');
          // console.log(translation);
          const urlFragments = snapshot.url.split('/');
          let defaultTitle = ['PDV']; //urlFragments.map(fragment => this.$translate.translate(fragment)).join('/');
          // console.log(urlFragments);
          return defaultTitle.toString();
        }),
      )
      .subscribe(title => {
        // console.log('>>>>>>>>>>>>>TITLE');
        // console.log(title);
        this.$title.setTitle(title);
      });
  }
  override updateTitle(routerState: RouterStateSnapshot) {
    this.UPDATE_TITLE$.next(routerState);
  }
  ngOnDestroy(): void {
    this.UPDATE_TITLE$$.unsubscribe();
  }
}
