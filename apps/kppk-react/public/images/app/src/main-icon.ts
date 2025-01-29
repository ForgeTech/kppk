import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { IconModule } from './icon/icon.module';
platformBrowserDynamic()
  .bootstrapModule(IconModule)
  .catch((err) => console.error(err));
