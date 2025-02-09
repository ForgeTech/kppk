// See for explaination https://stackoverflow.com/a/68636342/1622564
export function is_empty_obj(obj: object) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}