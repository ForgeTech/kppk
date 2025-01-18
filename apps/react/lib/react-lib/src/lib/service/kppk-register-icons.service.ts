import { inject, Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { FgBaseService } from '@kppk/fg-lib-new';

@Injectable({
  providedIn: 'root'
})
export class KppkRegisterIconsService extends FgBaseService {
  protected $iconReg = inject(MatIconRegistry);
  protected $domSanatizer = inject(DomSanitizer);
  constructor() {
    super();
    this.$iconReg.addSvgIcon( 'bin', 
      this.$domSanatizer.bypassSecurityTrustResourceUrl( './images/icons/bin.svg' )
    );
    this.$iconReg.addSvgIcon( 'download', 
      this.$domSanatizer.bypassSecurityTrustResourceUrl( './images/icons/download.svg' )
    );
    this.$iconReg.addSvgIcon( 'home', 
      this.$domSanatizer.bypassSecurityTrustResourceUrl( './images/icons/home.svg' )
    );
    this.$iconReg.addSvgIcon( 'info', 
      this.$domSanatizer.bypassSecurityTrustResourceUrl( './images/icons/info.svg' )
    );
    this.$iconReg.addSvgIcon( 'logout', 
      this.$domSanatizer.bypassSecurityTrustResourceUrl( './images/icons/logout.svg' )
    );
    this.$iconReg.addSvgIcon( 'print', 
      this.$domSanatizer.bypassSecurityTrustResourceUrl( './images/icons/print.svg' )
    );
    this.$iconReg.addSvgIcon( 'shield', 
      this.$domSanatizer.bypassSecurityTrustResourceUrl( './images/icons/shield.svg' )
    );
  }
}
