// replace ".n." with "._arr[n]"
// eg: cmi.interactions.0 -> cmi.interactions._arr[0]
function arrayifyPath(path) {
    return path.replace(/\.(\d)\./g, '._arr[$1].');
}

// replace ".key" with "._sub.key"
// eg: cmi.interactions -> cmi._sub.interactions
function subifyPath(path) {
    return path
        .split('.')
        // add ._sub if you're not trying to get ".n"/"._count"/"._children"
        .map((part, i, arr) => /^(_arr|_count$|_children$)/.test(arr[i + 1] || '') ? part : `${part}._sub`)
        .join('.');
}

// replace the last n keys with custom values
// eg: cmi._sub.interactions._count -> cmi._sub.interactions._arr.length
function replaceLastKeys(path, keys, newKey) {
    return path
        .split('.')
        .slice(0, -keys)
        .concat(newKey)
        .join('.');
}

// converts a cmi path to a path supported by the underlying data structure
// eg: cmi.interactions._count -> cmi._sub.interactions._arr[0].length
export function normalizePath(path) {
    const newPath = subifyPath(arrayifyPath(path.toLowerCase()));

    if (/_count/.test(newPath)) {
        return replaceLastKeys(newPath, 2, '_arr.length');
    }

    return replaceLastKeys(newPath, 1, '_value');
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
