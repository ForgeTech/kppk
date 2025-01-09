import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KppkReactCalcViewColorsService  {
  public absorbing: string = '#7CB342';
  public emitting: string = '#FF3D00';

  public construction_site: string = '#FF9800';
  public container_village: string = '#FFC107';
  public excavation_pit: string = '#FFEB3B';
  public materials: string = '#9C27B0';
  public demolish_disposal: string = '#3949AB';
  public heating_system: string = '#E91E63';

  public transport: string = '#3949AB';
  public creation: string = '#9C27B0';
  public operation: string = '#E91E63';

  public concrete: string = '#FF3D00';
  public concrete_oeko: string = '#7CB342'
}
