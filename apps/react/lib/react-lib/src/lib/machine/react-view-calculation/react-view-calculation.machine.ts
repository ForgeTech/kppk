// import { 
//   Actor,
//   ActorRefFrom,
//   EventFromLogic,
//   SnapshotFrom,
//   setup 
// } from "xstate";
// // import { react_init_load_from_remote_data_parser } from "../react-init/react-init.types";
// import { z } from "zod";
// import { 
//   react_calculation_materials_v1_input,
//   ReactCalculationMaterialsV1Input 
// } from "./react-view-calculation-materials.service";
// import {  unit_string_parser } from "../../types/kppk-react-unit.types";

// import { ROSE_FILE_DATA } from "../../types/kppk-react-heating-system.types";
// // import { calculate_excavation_pit_dynamic_values } from "./react-view-calculation-excavation-pit.utils";
// import { form_heating_system_calculate_dynamic_model_values } from "./react-view-calculation-heating-system.utils";
// import { react_view_calculation_context_parser } from "../../types/kppk-react-calculation.types";

// export type ReactViewCalculationV1Snapshot = SnapshotFrom<typeof REACT_VIEW_CALCULATION_MACHINE_V4>;
// export type ReactViewCalculationV1Event = EventFromLogic<typeof REACT_VIEW_CALCULATION_MACHINE_V4>;
// export type ReactViewCalculationV1Ref = ActorRefFrom<typeof REACT_VIEW_CALCULATION_MACHINE_V4>;
// export type ReactViewCalculationV1Machine = typeof REACT_VIEW_CALCULATION_MACHINE_V4;
// export type ReactViewCalculationV1Actor = Actor<typeof REACT_VIEW_CALCULATION_MACHINE_V4>;

// export const react_view_calculation_v1_context_parser = z.object({
//   calculation_defaults: react_view_calculation_context_parser, 
//   calculation: react_view_calculation_context_parser,
//   data: react_init_load_from_remote_data_parser,
// });

// export type ReactViewCalculationV1Context =  z.infer<typeof react_view_calculation_v1_context_parser>;

// export const form_heating_system_get_intial_select_key = ( rose_file_data: ROSE_FILE_DATA ) => {
//   const value = Object.keys(rose_file_data).find( key => {
//     const item = rose_file_data[ key as keyof typeof rose_file_data];
//     return item.value !== 0;
//   });
//   const result = unit_string_parser.parse({ value })
//   return result;
// }

// export const react_view_calculation_machine_context = ({ input }: { input: Partial<ReactViewCalculationV1Context>}) => {
//     const context: ReactViewCalculationV1Context = {
//       calculation: react_view_calculation_context_parser.parse(input.calculation),
//       calculation_defaults: react_view_calculation_context_parser.parse(input.calculation_defaults),
//       data: react_init_load_from_remote_data_parser.parse(input.data),
//     }
//     const form_heating_system_system_select_initial_key = form_heating_system_get_intial_select_key(context.calculation.file_rose);
//     context.calculation.form_heating_system.value.system_select = form_heating_system_system_select_initial_key;
    
//     context.calculation.form_heating_system.value = form_heating_system_calculate_dynamic_model_values( 
//       context.calculation.form_heating_system.value, context.calculation.file_rose 
//     );
    
//     // context.calculation.form_excavation_pit.value = calculate_excavation_pit_dynamic_values( context.calculation.form_excavation_pit.value, context.data )
//   return react_view_calculation_v1_context_parser.parse(context);
// }

// export const react_calculation_materials_input = ({ context, event }: { context: ReactViewCalculationV1Context, event: any}) => {
//   const input: ReactCalculationMaterialsV1Input = react_calculation_materials_v1_input.parse({
//     file_aufbauten: context.calculation?.file_aufbauten,
//     file_bauteilflaechen: context.calculation?.file_bauteilflaechen,
//     file_oi3: context.calculation?.file_oi3,
//   });
//   return input;
// }

// export const react_view_calculation_context_input = ({ context, event }: { context: ReactViewCalculationV1Context, event: any}) => {
//   return context;
// }
