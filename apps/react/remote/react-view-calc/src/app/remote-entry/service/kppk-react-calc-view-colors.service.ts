import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KppkReactCalcViewColorsService  {
  public absorbing = '#7CB342';
  public emitting = '#FF3D00';

  public construction_site = '#FF9800';
  public container_village = '#FFC107';
  public excavation_pit = '#FFEB3B';
  public materials = '#9C27B0';
  public demolish_disposal = '#3949AB';
  public heating_system = '#E91E63';

  public transport = '#3949AB';
  public creation = '#9C27B0';
  public operation = '#E91E63';

  public concrete = '#FF3D00';
  public concrete_oeko = '#7CB342'
}
