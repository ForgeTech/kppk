import { z } from 'zod';

export const add_number_units = <
  T extends { value: number; unit: number | string; type: 'number' }
>(
  target: T,
  toAdd: T
) => {
  target.value += toAdd.value;
  if (target.unit !== target.unit) {
    throw 'ERROR: add_number_units unit missmatch';
  }
  return target;
};

export const editable_unit_base = z.object({
  edited: z.boolean().optional().default(false),
});
export const number_type_unit_base = editable_unit_base.extend({
  type: z.literal('number').optional().default('number'),
});
export const boolean_type_unit_base = editable_unit_base.extend({
  type: z.literal('boolean').optional().default('boolean'),
});
export const string_type_unit_base = editable_unit_base.extend({
  type: z.literal('string').optional().default('string'),
});

export const applyEditsToTarget = <T>(
  context: any,
  draft: any,
  changes_obj: any,
  round: number = 3,
  edited: boolean = true
): T => {
  (Object.keys(changes_obj) as any[]).forEach((key) => {
    if (context[key]?.unit !== changes_obj[key]?.unit) {
      throw 'ERROR: unit missmatch on key: ' + key;
    }

    let co_value = context[key]?.value;
    let ch_value = changes_obj[key].value;
    // Normalize possible number string
    // if it is in ',' instead of '.' decimal format
    if (typeof ch_value === 'string' && ch_value.indexOf(',') !== -1) {
      ch_value = ch_value.replaceAll('.', '');
      ch_value = ch_value.replace(',', '.');
    }
    // Parse to see if values are numbers
    // (Note! toFixed turns possible NaN to 'NaN')
    co_value = parseFloat(co_value).toFixed(3);
    ch_value = parseFloat(ch_value).toFixed(3);

    // for numbers
    if (ch_value !== 'NaN') {
      if (co_value !== ch_value) {
        draft[key].value = ch_value;
        draft[key].edited = edited ? true : undefined;
      }
    }
    // for strings
    else if (ch_value === 'NaN' && typeof changes_obj[key].value === 'string') {
      co_value = context[key].value;
      ch_value = changes_obj[key].value;
      if (co_value !== ch_value) {
        draft[key].value = ch_value;
        draft[key].edited = edited ? true : undefined;
      }
    }
    // for object
    else if (typeof context[key] === 'object') {
      draft[key] = applyEditsToTarget(
        context[key],
        draft[key],
        changes_obj[key]
      );
    }
    // for array
    else if (Array.isArray(context[key])) {
      for (let index = 0; index < context[key].length; index++) {
        draft[key][index] = applyEditsToTarget(
          context[key][index],
          draft[key][index],
          changes_obj[key][index]
        );
      }
    }
  });
  return draft;
};

export const unit_general_parser = editable_unit_base.extend({
  value: z.any(),
  unit: z.any(),
});
export type UNIT_GENERAL = z.infer<typeof unit_string_parser>;

export const unit_string_parser = string_type_unit_base.extend({
  value: z.string().default(''),
  unit: z.string().default(''),
});
export type UNIT_STRING = z.infer<typeof unit_string_parser>;

export const unit_number_parser = number_type_unit_base.extend({
  value: z
    .number()
    .or(z.null().transform(() => 0))
    .or(z.string().transform((value) => parseFloat(value)))
    .default(0),
  unit: z.string().default(''),
});
export type UNIT_NUMBER = z.infer<typeof unit_number_parser>;

export const unit_boolean_parser = boolean_type_unit_base.extend({
  value: z.boolean().optional().default(false),
  unit: z.string().default(''),
});
export type UNIT_BOOLEAN = z.infer<typeof unit_boolean_parser>;

export const unit_id_parser = z
  .number()
  .transform((value) => {
    return { value: value.toString(), unit: 'id' as const };
  })
  .or(
    z.string().transform((value) => {
      return { value: value, unit: 'id' as const };
    })
  )
  .or(
    z.object({
      value: z.string(),
      unit: z.literal('id').default('id'),
    })
  );
export type UNIT_ID = z.infer<typeof unit_id_parser>;

export const unit_floor_parser = number_type_unit_base.extend({
  value: z
    .number()
    .or(z.null().transform(() => 1))
    .or(z.string().transform((value) => parseFloat(value)))
    .default(1),
  unit: z.literal('floor').default('floor'),
});
export type UNIT_FLOOR = z.infer<typeof unit_floor_parser>;

export const unit_percent_parser = number_type_unit_base.extend({
  value: z
    .number()
    .or(z.null().transform(() => 0))
    .or(z.string().transform((value) => parseFloat(value)))
    .default(0),
  unit: z.literal('%').default('%'),
});
export type UNIT_PERCENT = z.infer<typeof unit_percent_parser>;

export const unit_milimeter_parser = number_type_unit_base.extend({
  value: z
    .number()
    .or(z.null().transform(() => 0))
    .or(z.string().transform((value) => parseFloat(value)))
    .default(0),
  unit: z.literal('mm').default('mm'),
});
export type UNIT_MM = z.infer<typeof unit_milimeter_parser>;

export const unit_kilometer_parser = number_type_unit_base.extend({
  value: z
    .number()
    .or(z.null().transform(() => 0))
    .or(z.string().transform((value) => parseFloat(value)))
    .default(0),
  unit: z.literal('km').default('km'),
});
export type UNIT_KM = z.infer<typeof unit_kilometer_parser>;

export const unit_liter_parser = number_type_unit_base.extend({
  value: z
    .number()
    .or(z.null().transform(() => 0))
    .or(z.string().transform((value) => parseFloat(value)))
    .default(0),
  unit: z.literal('l').default('l'),
});
export type UNIT_LITER = z.infer<typeof unit_liter_parser>;

export const unit_liter_hundred_kilometers_parser =
  number_type_unit_base.extend({
    value: z.number(),
    unit: z.literal('l/100km').default('l/100km'),
  });
export type UNIT_LITER_100KM = z.infer<
  typeof unit_liter_hundred_kilometers_parser
>;

export const unit_pieces_parser = number_type_unit_base.extend({
  value: z
    .number()
    .or(z.null().transform(() => 0))
    .or(z.string().transform((value) => parseFloat(value)))
    .default(0),
  unit: z.literal('pieces').default('pieces'),
});
export type UNIT_PIECES = z.infer<typeof unit_pieces_parser>;

export const unit_trips_parser = number_type_unit_base.extend({
  value: z
    .number()
    .or(z.null().transform(() => 0))
    .or(z.string().transform((value) => parseFloat(value)))
    .default(0),
  unit: z.literal('trips').default('trips'),
});
export type UNIT_TRIPS = z.infer<typeof unit_trips_parser>;

export const unit_month_parser = number_type_unit_base.extend({
  value: z
    .number()
    .or(z.null().transform(() => 0))
    .or(z.string().transform((value) => parseFloat(value)))
    .default(0),
  unit: z.literal('month').default('month'),
});
export type UNIT_MONTH = z.infer<typeof unit_month_parser>;

export const unit_years_parser = number_type_unit_base.extend({
  value: z
    .number()
    .or(z.null().transform(() => 0))
    .or(z.string().transform((value) => parseFloat(value)))
    .default(0),
  unit: z.literal('year').default('year'),
});
export type UNIT_YEAR = z.infer<typeof unit_years_parser>;

export const unit_meter_parser = number_type_unit_base.extend({
  value: z
    .number()
    .or(z.null().transform(() => 0))
    .or(z.string().transform((value) => parseFloat(value)))
    .default(0),
  unit: z.literal('m').default('m'),
});
export type UNIT_M = z.infer<typeof unit_meter_parser>;

export const unit_degree_parser = number_type_unit_base.extend({
  value: z
    .number()
    .or(z.null().transform(() => 0))
    .or(z.string().transform((value) => parseFloat(value)))
    .default(0),
  unit: z.literal('°').default('°'),
});
export type UNIT_DEGREE = z.infer<typeof unit_degree_parser>;

export const unit_radiant_parser = number_type_unit_base.extend({
  value: z
    .number()
    .or(z.null().transform(() => 0))
    .or(z.string().transform((value) => parseFloat(value)))
    .default(0),
  unit: z.literal('rad').default('rad'),
});
export type UNIT_RAD = z.infer<typeof unit_radiant_parser>;

export const unit_meter_square_parser = number_type_unit_base.extend({
  value: z
    .number()
    .or(z.null().transform(() => 0))
    .or(z.string().transform((value) => parseFloat(value)))
    .default(0),
  unit: z
    .literal('m2')
    .or(z.literal('m²').transform(() => 'm2' as const))
    .default('m2'),
});
export type UNIT_M2 = z.infer<typeof unit_meter_square_parser>;

export const unit_meter_cubic_parser = number_type_unit_base.extend({
  value: z
    .number()
    .or(z.null().transform(() => 0))
    .or(z.string().transform((value) => parseFloat(value)))
    .default(0),
  unit: z
    .literal('m3')
    .or(z.literal('m³').transform(() => 'm3' as const))
    .default('m3'),
});
export type UNIT_M3 = z.infer<typeof unit_meter_cubic_parser>;

export const unit_oi3_meter_square_parser = number_type_unit_base.extend({
  value: z
    .number()
    .or(z.null().transform(() => 0))
    .or(z.string().transform((value) => parseFloat(value)))
    .default(0),
  unit: z
    .literal('oi3/m2')
    .or(z.literal('oi3/m²').transform(() => 'oi3/m2' as const))
    .default('oi3/m2'),
});
export type UNIT_OI3_M2 = z.infer<typeof unit_oi3_meter_square_parser>;

export const unit_mj_meter_square_parser = number_type_unit_base.extend({
  value: z
    .number()
    .or(z.null().transform(() => 0))
    .or(z.string().transform((value) => parseFloat(value)))
    .default(0),
  unit: z
    .literal('MJ/m2')
    .or(z.literal('MJ/m²').transform(() => 'MJ/m2' as const))
    .default('MJ/m2'),
});
export type UNIT_MJ_M2 = z.infer<typeof unit_mj_meter_square_parser>;

export const unit_kilogram_parser = number_type_unit_base.extend({
  value: z
    .number()
    .or(z.null().transform(() => 0))
    .or(z.string().transform((value) => parseFloat(value)))
    .default(0),
  unit: z.literal('kg').default('kg'),
});
export type UNIT_KG = z.infer<typeof unit_kilogram_parser>;

export const unit_kilogram_meter_cubic_parser = number_type_unit_base.extend({
  value: z
    .number()
    .or(z.null().transform(() => 0))
    .or(z.string().transform((value) => parseFloat(value)))
    .default(0),
  unit: z
    .literal('kg/m3')
    .or(z.literal('kg/m³').transform(() => 'kg/m3' as const))
    .default('kg/m3'),
});
export type UNIT_KG_M3 = z.infer<typeof unit_kilogram_meter_cubic_parser>;

export const unit_kilogram_meter_square_parser = number_type_unit_base.extend({
  value: z
    .number()
    .or(z.null().transform(() => 0))
    .or(z.string().transform((value) => parseFloat(value)))
    .default(0),
  unit: z
    .literal('kg/m2')
    .or(z.literal('kg/m²').transform(() => 'kg/m2' as const))
    .default('kg/m2'),
});
export type UNIT_KG_M2 = z.infer<typeof unit_kilogram_meter_square_parser>;

export const unit_kilogram_co2_meter_square_parser =
  number_type_unit_base.extend({
    value: z
      .number()
      .or(z.null().transform(() => 0))
      .or(z.string().transform((value) => parseFloat(value)))
      .default(0),
    unit: z
      .literal('kgCo2/m2')
      .or(z.literal('kgCo²/m²').transform(() => 'kgCO2/m2' as const))
      .default('kgCo2/m2'),
  });
export type UNIT_KGCO2_M2 = z.infer<
  typeof unit_kilogram_co2_meter_square_parser
>;

export const unit_kilogram_co2_parser = number_type_unit_base.extend({
  value: z
    .number()
    .or(z.null().transform(() => 0))
    .or(z.string().transform((value) => parseFloat(value)))
    .default(0),
  unit: z
    .string()
    .transform((value) => 'kgCo2' as const)
    .or(
      z
        .literal('kgCo2')
        .or(z.literal('kgCo²').transform(() => 'kgCo2' as const))
        .default('kgCo2')
    ),
});
export type UNIT_KGCO2 = z.infer<typeof unit_kilogram_co2_parser>;

export const unit_kilogramco2_kilometer_parser = number_type_unit_base.extend({
  value: z
    .number()
    .or(z.null().transform(() => 0))
    .or(z.string().transform((value) => parseFloat(value)))
    .default(0),
  unit: z
    .literal('kgCo2/km')
    .or(z.literal('kgCo²/km').transform(() => 'kgCo2/km' as const))
    .default('kgCo2/km'),
});
export type UNIT_KGCO2_KM = z.infer<typeof unit_kilogramco2_kilometer_parser>;

export const unit_kilogramco2_kilogram_parser = number_type_unit_base.extend({
  value: z
    .number()
    .or(z.null().transform(() => 0))
    .or(z.string().transform((value) => parseFloat(value)))
    .default(0),
  unit: z
    .literal('kgCo2/kg')
    .or(z.literal('kgCo²/kg').transform(() => 'kgCo2/kg' as const))
    .default('kgCo2/kg'),
});
export type UNIT_KGCO2_KG = z.infer<typeof unit_kilogramco2_kilogram_parser>;

export const unit_kilogramco2_kilowatthour_parser =
  number_type_unit_base.extend({
    value: z
      .number()
      .or(z.null().transform(() => 0))
      .or(z.string().transform((value) => parseFloat(value)))
      .default(0),
    unit: z
      .literal('kgCo2/kWh')
      .or(z.literal('kgCo²/kWh').transform(() => 'kgCo2/kWh' as const))
      .default('kgCo2/kWh'),
  });
export type UNIT_KGCO2_KWH = z.infer<
  typeof unit_kilogramco2_kilowatthour_parser
>;

export const unit_kilogramco2_liter_parser = number_type_unit_base.extend({
  value: z
    .number()
    .or(z.null().transform(() => 0))
    .or(z.string().transform((value) => parseFloat(value)))
    .default(0),
  unit: z
    .literal('kgCo2/l')
    .or(z.literal('kgCo²/l').transform(() => 'kgCo2/l' as const))
    .default('kgCo2/l'),
});
export type UNIT_KGCO2_L = z.infer<typeof unit_kilogramco2_liter_parser>;

export const unit_watt_metersquarekelvin_parser = number_type_unit_base.extend({
  value: z
    .number()
    .or(z.null().transform(() => 0))
    .or(z.string().transform((value) => parseFloat(value)))
    .default(0),
  unit: z
    .literal('W/m2K')
    .or(z.literal('W/m²K').transform(() => 'W/m2K' as const))
    .default('W/m2K'),
});
export type UNIT_W_M2K = z.infer<typeof unit_kilogramco2_liter_parser>;

export const unit_tonco2_parser = number_type_unit_base.extend({
  value: z
    .number()
    .or(z.null().transform(() => 0))
    .or(z.string().transform((value) => parseFloat(value)))
    .default(0),
  unit: z
    .literal('tCo2')
    .or(z.literal('tCo²').transform(() => 'tCo2' as const))
    .default('tCo2'),
});
export type UNIT_TCO2 = z.infer<typeof unit_tonco2_parser>;

export const unit_tonco2_year_parser = number_type_unit_base.extend({
  value: z
    .number()
    .or(z.null().transform(() => 0))
    .or(z.string().transform((value) => parseFloat(value)))
    .default(0),
  unit: z
    .literal('tCo2/year')
    .or(z.literal('tCo²/year').transform(() => 'tCo2/year' as const))
    .default('tCo2/year'),
});
export type UNIT_TCO2_YEAR = z.infer<typeof unit_tonco2_year_parser>;

export const unit_tonco2_xyear_parser = number_type_unit_base.extend({
  value: z
    .number()
    .or(z.null().transform(() => 0))
    .or(z.string().transform((value) => parseFloat(value)))
    .default(0),
  unit: z
    .literal('tCo2/xyear')
    .or(z.literal('tCo²/xyear').transform(() => 'tCo2/xyear' as const))
    .default('tCo2/xyear'),
});
export type UNIT_TCO2_XYEAR = z.infer<typeof unit_tonco2_xyear_parser>;

// export const unit_tonco2_20_years_parser = number_type_unit_base.extend({
//   value: z.number().or(z.null().transform( () => 0)).or(z.string().transform( value => parseFloat(value) )).default(0),
//   unit: z.literal('tCo2/20_years').or(z.literal('tCo²/20_years').transform( () => 'tCo2/20_years' as const)).default('tCo2/20_years'),
// });
// export type UNIT_TCO2_20_YEARS = z.infer<typeof unit_tonco2_20_years_parser>;

// export const unit_tonco2_x_years_parser = number_type_unit_base.extend({
//   value: z.number().or(z.null().transform( () => 0)).or(z.string().transform( value => parseFloat(value) )).default(0),
//   unit: z.string().startsWith('tCo2/').endsWith().or(z.literal('tCo²/year').transform( () => 'tCo2/year' as const)).default('tCo2/year'),
// });
// export type UNIT_TCO2_YEAR = z.infer<typeof unit_tonco2_parser>;

export const unit_gramco2_kilometer_parser = number_type_unit_base.extend({
  value: z
    .number()
    .or(z.null().transform(() => 0))
    .or(z.string().transform((value) => parseFloat(value)))
    .default(0),
  unit: z
    .literal('gCo2/km')
    .or(z.literal('gCo²/km').transform(() => 'gCo2/km' as const))
    .default('gCo2/km'),
});
export type UNIT_GCO2_KM = z.infer<typeof unit_gramco2_kilometer_parser>;

export const unit_gramco2_kilometerkilogram_parser =
  number_type_unit_base.extend({
    value: z.number(),
    unit: z
      .literal('gCo2/km*kg')
      .or(z.literal('gCo²/km*kg').transform(() => 'gCo2/km*kg' as const))
      .default('gCo2/km*kg'),
  });
export type UNIT_GCO2_KMKG = z.infer<
  typeof unit_gramco2_kilometerkilogram_parser
>;

export const unit_kilowatthours_parser = number_type_unit_base.extend({
  value: z
    .number()
    .or(z.null().transform(() => 0))
    .or(z.string().transform((value) => parseFloat(value)))
    .default(0),
  unit: z.literal('kWh').default('kWh'),
});
export type UNIT_KWH = z.infer<typeof unit_kilowatthours_parser>;

export const unit_kilowatthours_week_parser = number_type_unit_base.extend({
  value: z
    .number()
    .or(z.null().transform(() => 0))
    .or(z.string().transform((value) => parseFloat(value)))
    .default(0),
  unit: z.literal('kWh/week').default('kWh/week'),
});
export type UNIT_KWH_WEEK = z.infer<typeof unit_kilowatthours_week_parser>;

export const unit_kilowatthours_month_parser = number_type_unit_base.extend({
  value: z
    .number()
    .or(z.null().transform(() => 0))
    .or(z.string().transform((value) => parseFloat(value)))
    .default(0),
  unit: z.literal('kWh/month').default('kWh/month'),
});
export type UNIT_KWH_MONTH = z.infer<typeof unit_kilowatthours_month_parser>;

export const unit_megawatthours_parser = number_type_unit_base.extend({
  value: z
    .number()
    .or(z.null().transform(() => 0))
    .or(z.string().transform((value) => parseFloat(value)))
    .default(0),
  unit: z.literal('MWh').default('MWh'),
});
export type UNIT_MWH = z.infer<typeof unit_megawatthours_parser>;

export const unit_megawatthours_month_parser = number_type_unit_base.extend({
  value: z
    .number()
    .or(z.null().transform(() => 0))
    .or(z.string().transform((value) => parseFloat(value)))
    .default(0),
  unit: z.literal('MWh/month').default('MWh/month'),
});
export type UNIT_MWH_MONTH = z.infer<typeof unit_megawatthours_month_parser>;
