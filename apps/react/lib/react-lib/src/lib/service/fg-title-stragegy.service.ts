import { Injectable, inject } from '@angular/core';

import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

import { TranslocoService } from '@jsverse/transloco';

import { Subject, combineLatest, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FgPublicTitleStragegyService extends TitleStrategy {
  protected $title = inject(Title);
  protected $translate = inject(TranslocoService);

  protected count = 1;
  protected UPDATE_TITLE$ = new Subject<RouterStateSnapshot>();
  // protected UPDATE_TITLE$$: SubscriptionLike;
  constructor() {
    super();
    const generalTranslation$ = this.$translate.langChanges$.pipe(
      switchMap(lang => this.$translate.selectTranslation('general'.concat('/', lang))),
    );
    const updateTitle$ = combineLatest([this.UPDATE_TITLE$, generalTranslation$]);
    // this.UPDATE_TITLE$$ = updateTitle$
    //   .pipe(
    //     map(values => {
    //       const [snapshot, translation] = values;
    //       // console.log('SNAPSHOT');
    //       // console.log(translation);
    //       const urlFragments = snapshot.url.split('/');
    //       // let defaultTitle = ['PDV']; //urlFragments.map(fragment => this.$translate.translate(fragment)).join('/');
    //       // console.log(urlFragments);
    //       return defaultTitle.toString();
    //     }),
    //   )
    //   .subscribe(title => {
    //     // console.log('>>>>>>>>>>>>>TITLE');
    //     // console.log(title);
    //     this.$title.setTitle(title);
    //   });
  }
  override updateTitle(routerState: RouterStateSnapshot) {
    this.UPDATE_TITLE$.next(routerState);
  }
}
