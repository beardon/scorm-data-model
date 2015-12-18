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

    toString(key = '') {
        if (!this._arr.length && !Object.keys(this._sub).length) return `${key} = "${this._value}"`;

        const arr = this._arr.map((ar, i) => ar.toString(`${key}.${i}`));
        const sub = Object.keys(this._sub).map((obj) => this._sub[obj].toString(`${key}.${obj}`));

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

        return this._GetValue(normalizePath(element));
    }

    // slurp the value out of the underlying data structure
    _GetValue(path) {
        return _.get(this.data, path);
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

        const path = normalizePath(element);

        path.split('.').slice(1).slice(0, -1).reduce((currPath, part) => {
            const nextPath = `${currPath}.${part}`;

            const nextVal = _.get(this.data, nextPath);

            if (!nextVal && part !== '_sub') {
                _.set(this.data, nextPath, new ModelComponent());
            }

            return nextPath;
        }, path.split('.')[0]);

        this._SetValue(path, value);
    }

    // slurp the value into the underlying data structure
    _SetValue(path, value) {
        _.set(this.data, path, value);
    }

    // TODO: implement
    Serialize() {

    }

    // TODO: implement
    static Deserialize(serialized) {
        return new Model();
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
