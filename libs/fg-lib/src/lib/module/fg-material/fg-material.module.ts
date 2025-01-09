import { NgModule } from '@angular/core';
// Import Angular-Material Components ordered by its
// documentation structure/sections
// import {
  // Form Controls
  // https://material.angular.io/components/categories
  import { MatAutocompleteModule } from '@angular/material/autocomplete';
  import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
  import { MatCheckboxModule } from '@angular/material/checkbox';
  import { MatDatepickerModule } from '@angular/material/datepicker';
  import { MatFormFieldModule } from '@angular/material/form-field';
  import { MatInputModule } from '@angular/material/input';
  import { MatRadioModule } from '@angular/material/radio';
  import { MatSelectModule } from '@angular/material/select';
  import { MatSliderModule } from '@angular/material/slider';
  import { MatSlideToggleModule } from '@angular/material/slide-toggle';
  // Navigation
  // https://material.angular.io/components/categories/nav
  import { MatMenuModule } from '@angular/material/menu';
  import { MatSidenavModule } from '@angular/material/sidenav';
  import { MatToolbarModule } from '@angular/material/toolbar';
  // Layout
  // https://material.angular.io/components/categories/layout
  import { MatListModule } from '@angular/material/list';
  import { MatGridListModule } from '@angular/material/grid-list';
  import { MatCardModule } from '@angular/material/card';
  import { MatStepperModule } from '@angular/material/stepper';
  import { MatTabsModule } from '@angular/material/tabs';
  import { MatExpansionModule } from '@angular/material/expansion';
  // Buttons & Indicators
  // https://material.angular.io/components/categories/buttons
  import { MatButtonModule } from '@angular/material/button';
  import { MatButtonToggleModule } from '@angular/material/button-toggle';
  import { MatChipsModule } from '@angular/material/chips';
  import { MatIconModule } from '@angular/material/icon';
  import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
  import { MatProgressBarModule } from '@angular/material/progress-bar';
  // Popups & Modals
  // https://material.angular.io/components/categories/modals
  import { MatDialogModule } from '@angular/material/dialog';
  import { MatTooltipModule } from '@angular/material/tooltip';
  import { MatSnackBarModule } from '@angular/material/snack-bar';
  // Data Table
  // https://material.angular.io/components/table/overview
  import { MatTableModule } from '@angular/material/table';
  import { MatSortModule } from '@angular/material/sort';
  import { MatPaginatorModule } from '@angular/material/paginator';
  import { MatNativeDateModule } from '@angular/material/core';
  import { MatRippleModule } from '@angular/material/core';
  import { MatBadgeModule } from '@angular/material/badge';
// } from '@angular/material/';
// Import Angular-Material CDK
// Common Behaviours
// https://material.angular.io/cdk/categories/component-composition
import { A11yModule } from '@angular/cdk/a11y';
import { ObserversModule } from '@angular/cdk/observers';
import { LayoutModule } from '@angular/cdk/layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { BidiModule } from '@angular/cdk/bidi';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DragDropModule } from '@angular/cdk/drag-drop';
// Components
// https://material.angular.io/cdk/categories/components
import { CdkTableModule } from '@angular/cdk/table';
import { CdkStepperModule } from '@angular/cdk/stepper';
// import { FgAngularMaterialDemoComponent } from './components/fg-angular-material-demo/fg-angular-material-demo.component';

/**
* FgMaterialModule -
* This Module provides all angular-material
* components and cdk classes, including all
* it's dependencies, to the importing
* angular-application
*/
@NgModule({
  imports: [
    // RouterModule.forChild( routes ),
    // ---------------------------
    // Angular-Material Components
    // Form Controls
    MatAutocompleteModule,
    MatBottomSheetModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    // Navigation
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    // Layout
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    // Buttons & Indicators
    MatButtonModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    // Popups & Modals
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    // Data Table
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatBadgeModule,
    // ---------------------------
    // Angular-Material CDK
    // Common Behaviours
    A11yModule,
    ObserversModule,
    LayoutModule,
    OverlayModule,
    PortalModule,
    BidiModule,
    ScrollingModule,
    // Components
    CdkTableModule,
    CdkStepperModule,
    DragDropModule,
    MatNativeDateModule,
    MatRippleModule
  ],
  exports: [
    // ---------------------------
    // Angular-Material Components
    // Form Controls
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    // Navigation
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    // Layout
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    // Buttons & Indicators
    MatButtonModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    // Popups & Modals
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    // Data Table
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    // ---------------------------
    // Angular-Material CDK
    // Common Behaviours
    A11yModule,
    ObserversModule,
    LayoutModule,
    OverlayModule,
    PortalModule,
    BidiModule,
    ScrollingModule,
    // Components
    CdkTableModule,
    CdkStepperModule,
    DragDropModule,
    MatNativeDateModule,
    MatRippleModule,
    MatBadgeModule,
    // ---------------------------
    // Forge Angular-Material Demo-Component
    // FgAngularMaterialDemoComponent,
  ],
  declarations: [
    // FgAngularMaterialDemoComponent
  ],
})
/**
 * FgMaterialModule -
 * Module Exports Angular-Material Components and
 * Services for importing Application. Also provides
 * some additional components and services build upon
 * angular-material and angular-cdk
 */
export class FgMaterialModule {}
