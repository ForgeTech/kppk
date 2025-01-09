export const form_merge_values_with_units = ( values: any, units: any ) => {
    let result: any = {}

    Object.keys(values).forEach( key => {
        const value = values[ key ];
        const unit = units[ key ];
        if(value && !Array.isArray(value) && typeof value === 'object' ) {
            result[ key ] = form_merge_values_with_units( value, unit );
        } else {
            result[ key ] = {
                value,
                unit,
            } 
        }
    })
    return result;
};