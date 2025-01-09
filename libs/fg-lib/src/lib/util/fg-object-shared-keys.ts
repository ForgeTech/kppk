
export const object_apply_values_of_shared_keys = <T extends object >(target: T, source: Partial<T>) => {
    const keys = Object.keys(source) as Array<keyof T>;
    keys.forEach( key => {
        if( 
            target[ key ] !== undefined
            && source[ key ] !== undefined
        ) {
            target[ key ] = source[ key ] as T[keyof T];
        }
    });
    return target;
};

// export const object_apply_key_values = <T extends object >(target: T, source: Partial<T>) => {
//     const keys = Object.keys(source) as Array<keyof T>;
//     keys.forEach( key => {
//         target[ key ] = source[ key ] as T[keyof T];
//     });
//     return target;
// };