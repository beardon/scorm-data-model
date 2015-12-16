// converts a cmi path to a path supported by the underlying data structure
// eg: cmi.interactions.0 -> cmi.interactions._arr[0] -> cmi._sub.interactions._arr[0]._value
export function normalizePath(path) {
    return path
        .toLowerCase()
        // replace ".n." with "._arr[n]"
        .replace(/\.(\d)\./g, '._arr[$1].')
        .split('.')
        // if you're not trying to get ".n"/"._count"/"._children", get "._sub"
        .map((part, i, arr) => /^(_arr|_count$|_children$)/.test(arr[i + 1] || '') ? part : `${part}._sub`)
        .join('.')
        .split('.')
        .slice(0, -1)
        .concat('_value')
        .join('.');
}

// converts a cmi path to a generic version so we can compare against the spec
// i.e. converts array indices to "n"
export function genericizePath(path) {
    return path
        .toLowerCase()
        // replace ".n." with literal ".n."
        .replace(/\.(\d)\./g, '.n.');
}

export function validatePath(path) {

}
