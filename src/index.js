import * as validate from './validate';
import _ from 'lodash';
import { normalizePath, genericizePath } from './utils';
import { SCORM_2004 as ERROR } from './errors';
import { SCORM_2004 as SCORM_DATA } from './constants';

class ModelComponent {
    constructor({ value = '', sub = {}, arr = [] } = { value: '', sub: {}, arr: [] }) {
        this._value = String(value);
        this._sub = sub;
        this._arr = arr;
    }

    serialize(key = '') {
        if (!this._arr.length && !Object.keys(this._sub).length) {
            if (this._value === '') return [];

            return { [key]: this._value };
        }

        const arr = _.map(this._arr, (value, idx) => value.serialize(`${key}.${idx}`));
        const sub = _.map(this._sub, (value, obj) => value.serialize(`${key}.${obj}`));

        return arr.concat(sub);
    }

    toString(key = '') {
        if (!this._arr.length && !Object.keys(this._sub).length) return `${key} = "${this._value}"`;

        const arr = _.map(this._arr, (value, idx) => value.toString(`${key}.${idx}`));
        const sub = _.map(this._sub, (value, obj) => value.toString(`${key}.${obj}`));

        return arr
            .concat(sub)
            .concat(arr.length ? `${key}._count = ${arr.length}` : [])
            // .concat(this.__children.length ? `${key}._children = ${this.__children.join(',')}` : [])
            .join('\n');
    }
}

export default class Model {
    constructor() {
        this.data = {
            cmi: new ModelComponent({
                sub: {
                    comments_from_learner: new ModelComponent(),
                    comments_from_lms: new ModelComponent(),
                    completion_status: new ModelComponent({ value: 'incomplete' }),
                    completion_threshold: new ModelComponent(),
                    credit: new ModelComponent(),
                    entry: new ModelComponent(),
                    exit: new ModelComponent(),
                    interactions: new ModelComponent(),
                    launch_data: new ModelComponent(),
                    leaner_id: new ModelComponent(),
                    leaner_name: new ModelComponent(),
                    learner_preference: new ModelComponent(),
                    location: new ModelComponent(),
                    max_time_allowed: new ModelComponent(),
                    mode: new ModelComponent(),
                    objectives: new ModelComponent(),
                    progress_measure: new ModelComponent(),
                    scaled_passing_score: new ModelComponent(),
                    score: new ModelComponent(),
                    session_time: new ModelComponent(),
                    success_status: new ModelComponent(),
                    suspend_data: new ModelComponent(),
                    time_limit_action: new ModelComponent(),
                    total_time: new ModelComponent()
                }
            })
        };
    }

    GetValue(element) {
        const genericPath = genericizePath(element);

        // catch ._children manually
        if (/\._children$/.test(element)) {
            return SCORM_DATA[element].data.join(',');
        }

        if (!validate.pathExists(genericPath)) {
            throw new Error(ERROR.UNDEFINED_DATA_MODEL_ELEMENT);
        }

        if (!validate.isReadable(genericPath)) {
            throw new Error(ERROR.DATA_MODEL_ELEMENT_IS_READ_ONLY);
        }

        // catch ._version manually
        if (element === 'cmi._version') {
            return '1.0';
        }

        return this._GetValue(element);
    }

    // slurp the value out of the underlying data structure
    _GetValue(element) {
        return String(_.get(this.data, normalizePath(element)));
    }

    _ExistPath(element) {
        const path = normalizePath(element);

        path.split('.').slice(1).slice(0, -1).reduce((currPath, part) => {
            const nextPath = `${currPath}.${part}`;

            const nextVal = _.get(this.data, nextPath);

            if (!nextVal && part !== '_sub') {
                _.set(this.data, nextPath, new ModelComponent());
            }

            return nextPath;
        }, path.split('.')[0]);
    }


    SetValue(element, value) {
        const genericPath = genericizePath(element);

        if (!validate.pathExists(genericPath)) {
            throw new Error(ERROR.UNDEFINED_DATA_MODEL_ELEMENT);
        }

        if (!validate.isWritable(genericPath) || /\._(children|count)$/.test(genericPath)) {
            throw new Error(ERROR.DATA_MODEL_ELEMENT_IS_WRITE_ONLY);
        }

        if (!validate.isValidValue(genericPath, value)) {
            throw new Error(ERROR.DATA_MODEL_ELEMENT_TYPE_MISMATCH);
        }

        this._SetValue(element, value);
    }

    // slurp the value into the underlying data structure
    _SetValue(element, value) {
        this._ExistPath(element);

        _.set(this.data, normalizePath(element), value);
    }

    Serialize() {
        return JSON.stringify(_.flattenDeep(_.map(this.data, (value, key) => value.serialize(key))));
    }

    static Deserialize(serializedData) {
        const model = new Model();

        if (serializedData) {
            const serialized = JSON.parse(serializedData);

            _.forEach(serialized, (obj) => {
                const element = Object.keys(obj)[0];
                const value = obj[element];

                model._ExistPath(element);

                model._SetValue(element, value);
            });
        }

        return model;
    }

    // TODO: include children
    toString() {
        return Object.keys(this.data)
            .map((key) => `${this.data[key].toString(key)}`)
            .join('\n')
            .split('\n')
            .sort()
            .join('\n');
    }
}
