import { EXCAVATION_PIT_SECURITY_METHODE_ENUM, JET_BLASTING_PROCESS_CYLINDER_SHAPE_ENUM } from "apps/react/remote/react-view-calc/src/app/remote-entry/service/kppk-react-excavation-pit.fields.service";
import { FG_FORM_EXCAVATION_PIT_CONTEXT } from "./kppk-react-calculation.machine.types";
import { 
  RESULT_EXCAVATION_PIT,
  result_excavation_pit_parser,
  UNIT_JET_BLASTING_PROCESS_CYLINDER_SHAPE 
} from "../../types/kppk-react-excavation-pit.types";
import { material_co2_equ_item_parser, material_density_item_parser } from "../../types/kppk-react-material.types";
import { truck_data_item_parser } from "../../types/kppk-react-truck.types";
import { 
  add_number_units,
  UNIT_DEGREE,
  UNIT_GCO2_KM,
  UNIT_KG,
  UNIT_KG_M2,
  UNIT_KG_M3,
  UNIT_KGCO2,
  UNIT_KGCO2_KG,
  UNIT_KGCO2_KM,
  unit_kilogram_co2_parser,
  unit_kilogram_parser,
  unit_kilogramco2_kilogram_parser,
  unit_kilogramco2_kilometer_parser,
  UNIT_KM,
  UNIT_M,
  UNIT_M3,
  unit_meter_cubic_parser,
  unit_meter_parser,
  UNIT_MM,
  UNIT_PIECES,
  unit_radiant_parser 
} from "../../types/kppk-react-unit.types";
import { REACT_INIT_LOAD_FROM_REMOTE_DATA } from "./../react-init/react-init.machine.types";

    export const calculate_excavation_co2_transport = (
        volume: UNIT_M3,
        distance: UNIT_KM,
        capacity_volume: UNIT_M3,
        co2_consumption: UNIT_GCO2_KM
    ): UNIT_KGCO2 => {
        // =K3/'Transport Kennzahlen'!F15
        const first = volume.value / capacity_volume.value;
        // *BauGrube!K7*'Transport Kennzahlen'!E20
        const second = first * distance.value * co2_consumption.value;
        // from g to kg
        const third = second / 1000;
        // Double for two-way transport
        const value = third * 2;

        return unit_kilogram_co2_parser.parse({ value });
    }


  export const calculate_excavation_pit_security_co2_transport = (
    co2_transport: UNIT_KGCO2_KM,
    distance: UNIT_KM
  ): UNIT_KGCO2 => {
    const value = co2_transport.value * distance.value;
    return unit_kilogram_co2_parser.parse({ value });
  }

  // =((E11^2*PI())/4)*E3*E12
  export const calculate_foundation_pile_concrete_volumne = (
    diameter: UNIT_M,
    depth: UNIT_M,
    amount: UNIT_PIECES
  ): UNIT_M3 => {
    const inner = ( Math.pow(diameter.value, 2) * Math.PI ) / 4;
    const value = inner * depth.value * amount.value;

    return unit_meter_cubic_parser.parse({ value });
  }

  export const calculate_foundation_pile_concrete_mass = (
    concrete_volume: UNIT_M3,
    density: UNIT_KG_M3
  ): UNIT_KG => {
    const value = concrete_volume.value * density.value;
    return unit_kilogram_parser.parse({ value });
  }

  export const calculate_shotcrete_additional_excavation = (
    depth: UNIT_M,
    linear_meter: UNIT_M,
    thickness: UNIT_M,
    density: UNIT_KG_M3
  ) => {
    const value = depth.value * linear_meter.value * thickness.value * density.value;
    return unit_kilogram_parser.parse({ value });
  }


  export const calculate_sheet_pile_wall_steel_mass = (
    depth: UNIT_M,
    linear_meter: UNIT_M,
    mass_unit_area: UNIT_KG_M2
  ): UNIT_KG => {
    const value = depth.value * linear_meter.value * mass_unit_area.value;
    return unit_kilogram_parser.parse({ value });
  }

  export const calculate_escarpment_additional_excavation = (
    depth: UNIT_M,
    running_meter: UNIT_M,
    density_escavation: UNIT_KG_M3,
    tilt: UNIT_DEGREE
  ): UNIT_KG => {
    const first = Math.pow(depth.value, 2);
    const second = 2 * Math.tan(degrees_to_radiants( tilt ).value);
    let value = 0
    if( second !== 0 ) {
        value = (first / second ) * running_meter.value * density_escavation.value;
    } else {
        console.log('WARNING_DEVISION_WITH_ZERO: Return 0 insteat NAN');
    }
    return unit_kilogram_parser.parse({ value  });
  }

  export const degrees_to_radiants  = (
    degrees: UNIT_DEGREE
  ) => {
    const value = (degrees.value * Math.PI) / 180.0;
    return unit_radiant_parser.parse({ value });
  }

  // 2*PI()*SQRT(K3/(PI()*E3))
  export const calculate_line_meter_min = (  
    volume: UNIT_M3,
    depth: UNIT_M, 
  ): UNIT_M => {
    // K3/(PI()*E3)
    const divisor = Math.PI * depth.value;
    let inner_result = 0;
    if( divisor !== 0 ) {
        inner_result = volume.value / divisor
    } else {
     console.log('WARNING_DEVISION_WITH_ZERO: Return 0 insteat NAN');
    }
    const value = 2 * Math.PI * Math.sqrt( inner_result );
    return unit_meter_parser.parse({ value });
  }

  // =I26*I27*E3
  export const calculate_jet_blasting_process_cubid_volume = (
    depth: UNIT_M,
    length: UNIT_M,
    width: UNIT_M
  ): UNIT_M3 => {
    const value = depth.value * length.value * width.value;
    return unit_meter_cubic_parser.parse({ value });
  }
 

  // =IF(J21=Tabelle7[
  // @[1/4 Kreis]],
  //((K16^2*PI())/4)*E3*K17, 
  // IF(J21=Tabelle7[[#Headers],[1/4 Kreis]], 
  //(((K16^2*PI())/4)*E3*K17)/2, 
  //((K16^2*PI())/4)*E3*K17)/2)
  export const calculate_jet_blasting_process_cylinder_volume = (
    depth: UNIT_M,
    diameter: UNIT_M,
    amount: UNIT_PIECES, 
    process_type: UNIT_JET_BLASTING_PROCESS_CYLINDER_SHAPE,
  ): UNIT_M3 => {
    // let result: { value: number, unit: "m³" } = {
    //   value: 0,
    //   unit: "m³"
    // };
    let value = 0;
    // K16^2*PI())/4
    const inner_result = ( Math.pow( diameter.value, 2) * Math.PI ) / 4;
    // inner_result * E3 * K17
    const result_full = inner_result * depth.value * amount.value;
    const result_half = result_full / 2;
    const result_quater = result_half / 2;
    switch( process_type.value ) {
      case JET_BLASTING_PROCESS_CYLINDER_SHAPE_ENUM.full_circle:
        value = result_full;
        break;
      case JET_BLASTING_PROCESS_CYLINDER_SHAPE_ENUM.half_circle:
        value = result_half;
        break;
      case JET_BLASTING_PROCESS_CYLINDER_SHAPE_ENUM.quater_circle:
        value = result_quater;
        break;
    }
    return unit_meter_cubic_parser.parse({ value });
  }

  export const calculate_mass = (  
    volume: UNIT_M3,
    density: UNIT_KG_M3, 
    ): UNIT_KG => {
      const value = volume.value * density.value;

    return unit_kilogram_parser.parse({ value });
  }

  // =(K30/'Transport Kennzahlen'!$D$5)*'Transport Kennzahlen'!$E$10
  export const co2_transport = (  
    mass_concrete: UNIT_KG,
    truck_max_load: UNIT_KG, 
    truck_co2_km: UNIT_GCO2_KM
    ): UNIT_KGCO2_KM => {
    const number_of_drives = mass_concrete.value / truck_max_load.value;
    const value = number_of_drives * truck_co2_km.value  / 1000;

    return unit_kilogramco2_kilometer_parser.parse({ value });
  }

  export const double_co2 = (
    truck_co2_km: UNIT_KGCO2_KM, 
  ): UNIT_KGCO2_KM => {
    const value = truck_co2_km.value * 2;
    return unit_kilogramco2_kilometer_parser.parse({ value });
  }


export const co2_creation = ( 
    concrete_mass: UNIT_KG,
    concrete_co2_kg: UNIT_KGCO2_KG, 
): UNIT_KGCO2 => {
    const value = concrete_mass.value * concrete_co2_kg.value;
    return unit_kilogram_co2_parser.parse({ value });
}

export const calculate_linear_meter = ( 
    depth: UNIT_M,
    volumn: UNIT_M3, 
): UNIT_M => {

    let value = 0;
    // PI()*E3
    const divisor = Math.PI * depth.value;
    // =2*PI()*SQRT(K3/(divisor)
    if( divisor !== 0 ) {
      value = 2*Math.PI*Math.sqrt(volumn.value / divisor)
    } else {
      console.log('WARNING_DEVISION_WITH_ZERO: Return 0 insteat NAN');
    }
    return unit_meter_parser.parse({ value });
}

// export const calculate_excavation_pit_dynamic_values = (
//   form_excavation_pit: FORM_EXCAVATION_PIT_DATA,
//   data: REACT_INIT_LOAD_FROM_REMOTE_COMMON 
// ): FORM_EXCAVATION_PIT_DATA => {
//   let result = form_excavation_pit_parser.parse(form_excavation_pit)
//   result.excavation_pit_security.linear_meter = calculate_linear_meter(
//     result.excavation_pit_security.depth,
//     result.excavation.volume,
//   );
//   return form_excavation_pit_parser.parse(result);
// }

export const calculate_building_gap_linear_meter = (linear_meter: UNIT_M): UNIT_M => {
  const value = linear_meter.value + 8 * 0.8
  return unit_meter_parser.parse({ value })
}

export const calculate_shotcrete_co2_nail_volumen = (nail_count: UNIT_PIECES, nail_length: UNIT_M, nail_diameter: UNIT_MM): UNIT_M3 => {
  const nail_diameter_m = nail_diameter.value / 1000;
  // =C77*C78*
  const value1 = nail_count.value * nail_length.value
  // (((IF(G79=TRUE,I77,I76))/2)^2
  const value2 = Math.pow( nail_diameter_m / 2, 2) * Math.PI;
  const value = value1 * value2
  return unit_meter_cubic_parser.parse({ value })
}

export const calculate_excavation_pit_results = ( 
    form_excavation_pit: FG_FORM_EXCAVATION_PIT_CONTEXT,
    data: REACT_INIT_LOAD_FROM_REMOTE_DATA 
  ): RESULT_EXCAVATION_PIT  => {
    const common_truck = truck_data_item_parser.parse( data.truck.find( item => item.category.includes( 'common' )));
    const concrete_truck = truck_data_item_parser.parse(data.truck.find( item => item.category.includes( 'concrete' )));
    const excavation_truck = truck_data_item_parser.parse(data.truck.find( item => item.category.includes( 'excavation' )));
    
    const concrete_density = material_density_item_parser.parse(data.material_density.find( item => item.material.value === 'concrete' ));
    const excavation_density = material_density_item_parser.parse(data.material_density.find( item => item.material.value === 'excavation' ));
    const steel_density = material_density_item_parser.parse(data.material_density.find( item => item.material.value === 'steel' ));
    
    const concrete_co2_equ_item = material_co2_equ_item_parser.parse(data.material_co2_equ.find( item => item.material.value === 'concrete' ));
    const concrete_co2_kg =  unit_kilogramco2_kilogram_parser.parse(concrete_co2_equ_item.co2_equ);
   
    const steel_co2_equ_item = material_co2_equ_item_parser.parse(data.material_co2_equ.find( item => item.material.value === 'steel' ));
    const steel_co2_kg =  unit_kilogramco2_kilogram_parser.parse(steel_co2_equ_item.co2_equ);
   
    let linear_meter = form_excavation_pit.value.excavation_pit_security.linear_meter;
    if(form_excavation_pit.value.excavation_pit_security.building_gap.value ) {
      linear_meter = calculate_building_gap_linear_meter( linear_meter );
    }

    // const excavation_pit_security_linear_meter_min = calculate_line_meter_min(
    //     form_excavation_pit.value.excavation.volume,
    //     form_excavation_pit.value.excavation_pit_security.depth
    // );
    const  jet_blasting_process_cylinder_concrete_volume = calculate_jet_blasting_process_cylinder_volume( 
        form_excavation_pit.value.excavation_pit_security.depth,
        form_excavation_pit.value.jet_blasting_process.jet_blasting_process_cylinder.diameter,
        form_excavation_pit.value.jet_blasting_process.amount,
        form_excavation_pit.value.jet_blasting_process.jet_blasting_process_cylinder.shape,
    );
    const jet_blasting_process_cylinder_concrete_mass = calculate_mass( 
        jet_blasting_process_cylinder_concrete_volume,
        concrete_density.density 
    );
    const jet_blasting_process_cylinder_concrete_mass_co2_transport = co2_transport(
        jet_blasting_process_cylinder_concrete_mass,
        concrete_truck.capacity_weight,
        concrete_truck.co2_consumption
    );
      const jet_blasting_process_cylinder_concrete_mass_co2_creation = co2_creation(
        jet_blasting_process_cylinder_concrete_mass,
        concrete_co2_kg
      );
      const  jet_blasting_process_cuboid_concrete_volume = calculate_jet_blasting_process_cubid_volume( 
        form_excavation_pit.value.excavation_pit_security.depth,
        form_excavation_pit.value.jet_blasting_process.jet_blasting_process_cuboid.length,
        form_excavation_pit.value.jet_blasting_process.jet_blasting_process_cuboid.width
      );
      const jet_blasting_process_cuboid_concrete_mass = calculate_mass(
        jet_blasting_process_cuboid_concrete_volume,
        concrete_density.density 
      );
      const jet_blasting_process_cuboid_concrete_mass_co2_transport = co2_transport(
        jet_blasting_process_cuboid_concrete_mass,
        concrete_truck.capacity_weight,
        concrete_truck.co2_consumption
      );
      const jet_blasting_process_cuboid_concrete_mass_co2_creation = co2_creation(
        jet_blasting_process_cuboid_concrete_mass,
        concrete_co2_kg
      );

      let concrete_mass_result;
      let co2_transport_result;
      let co2_creation_result;
      if ( form_excavation_pit.value.jet_blasting_process.process_type.value === 'process_type_cylinder') {
        concrete_mass_result = jet_blasting_process_cylinder_concrete_mass;
        co2_transport_result = jet_blasting_process_cylinder_concrete_mass_co2_transport;
        co2_creation_result = jet_blasting_process_cylinder_concrete_mass_co2_creation;
      }
      else if ( form_excavation_pit.value.jet_blasting_process.process_type.value === 'process_type_cuboid') {
        concrete_mass_result = jet_blasting_process_cuboid_concrete_mass;
        co2_transport_result = jet_blasting_process_cuboid_concrete_mass_co2_transport;
        co2_creation_result = jet_blasting_process_cuboid_concrete_mass_co2_creation;
      } else {
        throw new Error('ERROR_EXCAVATION_PIT_SECURITY_JET_BLASTING_METHODE_NOT_FOUND');
      }
      const escarpment_additional_excavation = calculate_escarpment_additional_excavation(
        form_excavation_pit.value.excavation_pit_security.depth,
        linear_meter,
        excavation_density.density,
        form_excavation_pit.value.escarpment.tilt
      );
      const escarpment_co2_transport = double_co2( co2_transport(
        escarpment_additional_excavation,
        concrete_truck.capacity_weight, 
        concrete_truck.co2_consumption
      ));
      const escarpment_co2_creation = {
        value: 0,
        unit: 'kgCo2' as const
      };

      const sheet_pile_wall_steel_mass = calculate_sheet_pile_wall_steel_mass( 
        form_excavation_pit.value.excavation_pit_security.depth,
        linear_meter,
        form_excavation_pit.value.sheet_pile_wall.mass_unit_area 
      );
      // =(E23/'Transport Kennzahlen'!D25)*'Transport Kennzahlen'!E30*2
      const sheet_pile_wall_co2_transport = double_co2( co2_transport(
        sheet_pile_wall_steel_mass,
        common_truck.capacity_weight,
        common_truck.co2_consumption
      ));
      const sheet_pile_wall_co2_creation = {
        value: 0,
        unit: 'kgCo2' as const
      };

      const shotcrete_additional_excavation = calculate_shotcrete_additional_excavation(
        // E3
        form_excavation_pit.value.excavation_pit_security.depth,
        // *E4
        linear_meter,
        // *E43
        form_excavation_pit.value.shotcrete.thickness,
        // *P3
        concrete_density.density
      );
      const shotcrete_escarpment_additional_excavation = calculate_escarpment_additional_excavation(
        form_excavation_pit.value.excavation_pit_security.depth,
        linear_meter,
        excavation_density.density,
        form_excavation_pit.value.shotcrete.tilt
      );
      const shotcrete_escarpment_co2_transport = double_co2( co2_transport(
        shotcrete_escarpment_additional_excavation,
        concrete_truck.capacity_weight, 
        concrete_truck.co2_consumption
      ));
      const shotcrete_additional_excavation_co2_transport = co2_transport(
        shotcrete_additional_excavation,
        concrete_truck.capacity_weight,
        concrete_truck.co2_consumption
      );
      const shotcrete_co2_transport = add_number_units(shotcrete_additional_excavation_co2_transport, shotcrete_escarpment_co2_transport)
      
      const steel_volumn = calculate_shotcrete_co2_nail_volumen(
        form_excavation_pit.value.shotcrete.nail_count,
        form_excavation_pit.value.shotcrete.nail_length,
        form_excavation_pit.value.shotcrete.nail_diameter,
      )
      const steel_volumn_mass = unit_kilogram_parser.parse({ value: steel_volumn.value * steel_density.density.value } );
      
      const shotcrete_steel_co2_transport = co2_transport(
        steel_volumn_mass,
        common_truck.capacity_weight,
        common_truck.co2_consumption
      );
      add_number_units(shotcrete_co2_transport, shotcrete_steel_co2_transport)
      
      const shotcrete_steel_co2_creation = co2_creation(
        steel_volumn_mass,
        steel_co2_kg
      );
 
      const shotcrete_co2_creation = co2_creation(
        shotcrete_additional_excavation,
        concrete_co2_kg
      );
      add_number_units(shotcrete_co2_creation, shotcrete_steel_co2_creation)

      // =((E11^2*PI())/4)*E3*E12
      const foundation_pile_concrete_volumn = calculate_foundation_pile_concrete_volumne(
        // E11
        form_excavation_pit.value.foundation_pile.diameter,
        // E3
        form_excavation_pit.value.excavation_pit_security.depth,
        // E12
        form_excavation_pit.value.foundation_pile.amount
      );
      const foundation_pile_concrete_mass = calculate_foundation_pile_concrete_mass(
        foundation_pile_concrete_volumn,
        concrete_density.density
      );
      const foundation_pile_co2_transport = co2_transport(
        foundation_pile_concrete_mass,
        concrete_truck.capacity_weight,
        concrete_truck.co2_consumption
      );
      const foundation_pile_co2_creation = co2_creation(
        foundation_pile_concrete_mass,
        concrete_co2_kg
      );

      let excavation_pit_security_co2_transport: { value: number, unit: "kgCo2"};
      let excavation_pit_security_co2_creation: { value: number, unit: "kgCo2" };

      switch( form_excavation_pit.value.excavation_pit_security.methode.value) {
        case EXCAVATION_PIT_SECURITY_METHODE_ENUM.escarpment:
          excavation_pit_security_co2_transport = calculate_excavation_pit_security_co2_transport( 
            escarpment_co2_transport,
            form_excavation_pit.value.excavation_pit_security.distance,
          );
          excavation_pit_security_co2_creation = escarpment_co2_creation;
          break;
        case EXCAVATION_PIT_SECURITY_METHODE_ENUM.foundation_pile:
          excavation_pit_security_co2_transport = calculate_excavation_pit_security_co2_transport( 
            foundation_pile_co2_transport,
            form_excavation_pit.value.excavation_pit_security.distance,
          );
          excavation_pit_security_co2_creation = foundation_pile_co2_creation;
          break;
        case EXCAVATION_PIT_SECURITY_METHODE_ENUM.jet_blasting:
          excavation_pit_security_co2_transport = calculate_excavation_pit_security_co2_transport( 
            co2_transport_result,
            form_excavation_pit.value.excavation_pit_security.distance,
          );
          excavation_pit_security_co2_creation = co2_creation_result;
          break;
        case EXCAVATION_PIT_SECURITY_METHODE_ENUM.sheet_pile_wall:
          excavation_pit_security_co2_transport = calculate_excavation_pit_security_co2_transport( 
            sheet_pile_wall_co2_transport,
            form_excavation_pit.value.excavation_pit_security.distance,
          );
          excavation_pit_security_co2_creation = sheet_pile_wall_co2_creation;
          break;
        case EXCAVATION_PIT_SECURITY_METHODE_ENUM.shotcrete:
          excavation_pit_security_co2_transport = calculate_excavation_pit_security_co2_transport( 
            shotcrete_co2_transport,
            form_excavation_pit.value.excavation_pit_security.distance,
          );
          excavation_pit_security_co2_creation = shotcrete_co2_creation;
          break;
        default:
            throw new Error('ERROR_EXCAVATION_PIT_SECURITY_METHODE_NOT_FOUND');
          break;
      }

      const excavation_co2_transport = calculate_excavation_co2_transport(
        form_excavation_pit.value.excavation.volume,
        form_excavation_pit.value.excavation.distance,
        excavation_truck.capacity_volume,
        excavation_truck.co2_consumption
      );

      const result = {
        jet_blasting_process: {
          jet_blasting_process_cylinder: {
            concrete_volume: jet_blasting_process_cylinder_concrete_volume,
            concrete_mass: jet_blasting_process_cylinder_concrete_mass,
            co2_transport: jet_blasting_process_cylinder_concrete_mass_co2_transport,
            co2_creation: jet_blasting_process_cylinder_concrete_mass_co2_creation
          },
          jet_blasting_process_cuboid: {
            concrete_volume: jet_blasting_process_cuboid_concrete_volume,
            concrete_mass: jet_blasting_process_cuboid_concrete_mass,
            co2_transport: jet_blasting_process_cuboid_concrete_mass_co2_transport,
            co2_creation: jet_blasting_process_cuboid_concrete_mass_co2_creation
          },
          concrete_mass: concrete_mass_result,
          co2_transport: co2_transport_result,
          co2_creation: co2_creation_result,
        },
        escarpment: {
          additional_excavation: escarpment_additional_excavation,
          co2_transport: escarpment_co2_transport,
          co2_creation: escarpment_co2_creation,
        },
        sheet_pile_wall: {
          steel_mass: sheet_pile_wall_steel_mass,
          co2_transport: sheet_pile_wall_co2_transport,
          co2_creation: sheet_pile_wall_co2_creation,
        },
        shotcrete: {
          additional_excavation: shotcrete_additional_excavation,
          co2_transport: shotcrete_co2_transport,
          co2_creation: shotcrete_co2_creation,
        },
        foundation_pile: {
          concrete_mass: foundation_pile_concrete_mass,
          co2_transport: foundation_pile_co2_transport,
          co2_creation: foundation_pile_co2_creation,
        },
        excavation_pit_security: {
            linear_meter,
            co2_transport: excavation_pit_security_co2_transport,
            co2_creation: excavation_pit_security_co2_creation,
        },
        excavation: {
            co2_transport: excavation_co2_transport
        }
      };
    return result_excavation_pit_parser.parse(result)
  }
  