import { z } from "zod";
import { unit_tonco2_parser } from "../../types/kppk-react-unit.types";

export const bgf_or_bzg_parser = z.string().trim().startsWith('BZG').or( z.string().trim().startsWith('BGF'));
export const ends_with_m2 = z.string().trim().endsWith('m²')
  .or( z.string().endsWith('m2'))
  .transform( value => {
    const splitted = value.split(' ');
    const area = parseFloat(splitted[0].replace('.', '').replace(',', '.'));
    return area;
  })
  .pipe(z.number());
export const oi3_bgf_bzg_m2_parser = z.tuple([ bgf_or_bzg_parser, ends_with_m2 ])

export const oi3_table_headline_parser = z.array(z.literal('Materialliste des gesamten Projektes')).length(1);
export const oi3_table_header_type_parser = z.tuple([
  z.string(), 
  z.string().includes('m²'), 
  z.string().includes('pro m²'),
  z.string().includes('pro m²'),
  z.string().includes('pro m²'),
  z.string().includes('pro m²'),
  z.string().includes('pro m²'),
])

export const oi3_table_row_type_parser = z.array(z.string()).length(7);
export type OI3_TABLE_ROW_TYPE = z.infer<typeof oi3_table_row_type_parser>;

export const rose_table_section_headline_parser = z.array(z.literal('System comparison').or(z.literal('Systemvergleich'))).length(1);
export type ROSE_TABLE_SECTION_HEADLINE = z.infer<typeof rose_table_section_headline_parser>;

//  ['Gas', 'Fernwärme', 'Luft-Wasser *', 'Sole-Wasser', 'Pellets']
// 'Gas', 'District', 'Air-water *', 'Geothermal', 'Pellets']
export const rose_table_system_row_parser = z.tuple( [ 
  z.string().startsWith('Gas')
  .or( z.string().startsWith('Fernwärme') )
  .or( z.string().startsWith('Luft-Wasser') )
  .or( z.string().startsWith('Sole-Wasser') )
  .or( z.string().startsWith('Pellets') )
  // .or( z.string().startsWith('Gas') )
  .or( z.string().startsWith('District') )
  .or( z.string().startsWith('Air-water') )
  .or( z.string().startsWith('Geothermal') )
  // .or( z.string().startsWith('Pellets') )
] ).rest( z.string() );
export type ROSE_TABLE_SYSTEM_ROW = z.infer<typeof rose_table_system_row_parser>;

export const rose_table_row_parser = z.tuple( [ 
  z.literal('CO₂ Äquivalent nach 20 Jahren') 
  .or(z.literal('CO₂ equivalent after 20 years') )
] ).rest( z.string() );
export type ROSE_TABLE_ROW_TYPE = z.infer<typeof rose_table_row_parser>;