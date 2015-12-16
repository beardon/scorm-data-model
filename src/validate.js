import { PERM, SCORM_2004 as SCORM_DATA, TYPE } from './constants';

// TODO: make validations legit
export const VALIDATIONS = {
    [TYPE.CHARACTERSTRING]: (value, data) => data ? value === data : true,
    [TYPE.LOCALIZED_STRING_TYPE]: () => true,
    [TYPE.LANGUAGE_TYPE]: () => true,
    [TYPE.LONG_IDENTIFIER_TYPE]: (value) => value.length > 0 && /\S/.test(value),
    [TYPE.SHORT_IDENTIFIER_TYPE]: (value) => value.length > 0 && /\S/.test(value),
    [TYPE.INTEGER]: (value) => !Number.isNaN(Number(value)) && Math.floor(Number(value)) === Number(value),
    [TYPE.STATE]: (value, data = []) => data.some((state) => VALIDATIONS[state.type](value, state.data)),
    [TYPE.REAL]: (value, [min, max] = [-Infinity, Infinity]) => value > min && value < max,
    [TYPE.TIME]: () => true,
    [TYPE.TIMEINTERVAL]: (value) => /^P.*/.test(value)
};

export function pathExists(path) {
    if (/\._count$/.test(path)) {
        return pathExists(path.slice(0, -'._count'.length));
    }

    return !!SCORM_DATA[path];
}

function hasPermissions(path, permission) {
    const { perm } = SCORM_DATA[path];

    return perm === PERM.READ_WRITE || perm === permission;
}

export function isReadable(path) {
    return hasPermissions(path, PERM.READ_ONLY);
}

export function isWritable(path) {
    return hasPermissions(path, PERM.WRITE_ONLY);
}

export function isValidValue(path, value) {
    const { type, data = null } = SCORM_DATA[path];

    // TODO: support inherited types, just return true for now
    if (!VALIDATIONS[type]) return true;

    return VALIDATIONS[type](value, data);
}
