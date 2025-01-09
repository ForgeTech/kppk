import { Route } from '@angular/router';
import { RemoteEntryComponent } from './entry.component';
import { ViewCalculationPrintComponent } from './view-calculation-print.component';



export const remoteRoutes: Route[] = [
  { path: '', component: RemoteEntryComponent },
  { path: 'print', component: ViewCalculationPrintComponent },
  { path: '**', redirectTo: '' },
];
