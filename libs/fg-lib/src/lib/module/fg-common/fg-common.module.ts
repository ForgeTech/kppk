import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { RxLet } from '@rx-angular/template/let';
import { RxPush } from '@rx-angular/template/push';
import { RxFor } from '@rx-angular/template/for';
import { RxUnpatch } from '@rx-angular/template/unpatch';

const common_module = [
  CommonModule,
  TranslocoModule,
  RxLet,
  RxPush,
  RxFor,
  RxUnpatch
];

@NgModule({
  imports: common_module,
  exports: common_module,
})
export class FgCommonModule {}
