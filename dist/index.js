'use strict';

var _ = require('lodash');
_ = 'default' in _ ? _['default'] : _;

var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

babelHelpers.slicedToArray = (function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
})();

babelHelpers;
// converts a cmi path to a path supported by the underlying data structure
// eg: cmi.interactions.0 -> cmi.interactions._arr[0] -> cmi._sub.interactions._arr[0]._value
function normalizePath(path) {
    return path.toLowerCase()
    // replace ".n." with "._arr[n]"
    .replace(/\.(\d)\./g, '._arr[$1].').split('.')
    // if you're not trying to get ".n"/"._count"/"._children", get "._sub"
    .map(function (part, i, arr) {
        return (/^(_arr|_count$|_children$)/.test(arr[i + 1] || '') ? part : part + '._sub'
        );
    }).join('.').split('.').slice(0, -1).concat('_value').join('.');
}

// converts a cmi path to a generic version so we can compare against the spec
// i.e. converts array indices to "n"
function genericizePath(path) {
    return path.toLowerCase()
    // replace ".n." with literal ".n."
    .replace(/\.(\d)\./g, '.n.');
}

var SCORM_2004 = {
    GENERAL_EXCEPTION: '101',
    GENERAL_ARGUMENT_ERROR: '201',
    GENERAL_GET_FAILURE: '301',
    GENERAL_SET_FAILURE: '351',
    UNDEFINED_DATA_MODEL_ELEMENT: '401',
    UNIMPLEMENTED_DATA_MODEL_ELEMENT: '402',
    DATA_MODEL_ELEMENT_VALUE_NOT_INITIALIZED: '403',
    DATA_MODEL_ELEMENT_IS_READ_ONLY: '404',
    DATA_MODEL_ELEMENT_IS_WRITE_ONLY: '405',
    DATA_MODEL_ELEMENT_TYPE_MISMATCH: '406',
    DATA_MODEL_ELEMENT_VALUE_OUT_OF_RANGE: '407',
    DATA_MODEL_DEPENDENCY_NOT_ESTABLISHED: '408'
};

var CHARACTERSTRING = 'CHARACTERSTRING';
var LOCALIZED_STRING_TYPE = 'LOCALIZED_STRING_TYPE';
var LANGUAGE_TYPE = 'LANGUAGE_TYPE';
var LONG_IDENTIFIER_TYPE = 'LONG_IDENTIFIER_TYPE';
var SHORT_IDENTIFIER_TYPE = 'SHORT_IDENTIFIER_TYPE';
var INTEGER = 'INTEGER';
var STATE = 'STATE';
var REAL = 'REAL';
var TIME = 'TIME';
var TIMEINTERVAL = 'TIMEINTERVAL';

// internal types
var ARRAY = 'ARRAY';
var COUNT = 'COUNT';
var CHILDREN = 'CHILDREN';
var INHERITED = 'INHERITED';
var OBJECT = 'OBJECT';

var TYPE = {
    CHARACTERSTRING: CHARACTERSTRING,
    LOCALIZED_STRING_TYPE: LOCALIZED_STRING_TYPE,
    LANGUAGE_TYPE: LANGUAGE_TYPE,
    LONG_IDENTIFIER_TYPE: LONG_IDENTIFIER_TYPE,
    SHORT_IDENTIFIER_TYPE: SHORT_IDENTIFIER_TYPE,
    INTEGER: INTEGER,
    STATE: STATE,
    REAL: REAL,
    TIME: TIME,
    TIMEINTERVAL: TIMEINTERVAL
};

var READ_ONLY = 'READ_ONLY';
var READ_WRITE = 'READ_WRITE';
var WRITE_ONLY = 'WRITE_ONLY';
var NO_ACCESS = '';

var PERM = { READ_ONLY: READ_ONLY, READ_WRITE: READ_WRITE, WRITE_ONLY: WRITE_ONLY };

var SCORM_2004$1 = {
    'cmi._version': {
        type: CHARACTERSTRING,
        perm: READ_ONLY
    },
    'cmi.comments_from_learner': {
        type: ARRAY,
        perm: NO_ACCESS
    },
    'cmi.comments_from_learner._count': {
        type: COUNT,
        perm: READ_ONLY
    },
    'cmi.comments_from_learner._children': {
        type: CHILDREN,
        data: ['comment', 'location', 'timestamp'],
        perm: READ_ONLY
    },
    'cmi.comments_from_learner.n.comment': {
        type: LOCALIZED_STRING_TYPE,
        spm: 4000,
        perm: READ_WRITE
    },
    'cmi.comments_from_learner.n.location': {
        type: CHARACTERSTRING,
        spm: 250,
        perm: READ_WRITE
    },
    'cmi.comments_from_learner.n.timestamp': {
        type: TIME,
        perm: READ_WRITE
    },
    'cmi.comments_from_lms': {
        type: ARRAY,
        perm: NO_ACCESS
    },
    'cmi.comments_from_lms._count': {
        type: COUNT,
        perm: READ_ONLY
    },
    'cmi.comments_from_lms._children': {
        type: CHILDREN,
        data: ['comment', 'location', 'timestamp'],
        perm: READ_ONLY
    },
    'cmi.comments_from_lms.n.comment': {
        type: LOCALIZED_STRING_TYPE,
        spm: 4000,
        perm: READ_ONLY
    },
    'cmi.comments_from_lms.n.location': {
        type: CHARACTERSTRING,
        spm: 250,
        perm: READ_ONLY
    },
    'cmi.comments_from_lms.n.timestamp': {
        type: TIME,
        perm: READ_ONLY
    },
    'cmi.completion_status': {
        type: STATE,
        data: [{
            type: CHARACTERSTRING,
            data: 'completed'
        }, {
            type: CHARACTERSTRING,
            data: 'incomplete'
        }, {
            type: CHARACTERSTRING,
            data: 'not attempted'
        }, {
            type: CHARACTERSTRING,
            data: 'unknown'
        }],
        perm: READ_WRITE
    },
    'cmi.completion_threshold': {
        type: REAL,
        data: [0, 1],
        perm: READ_ONLY
    },
    'cmi.credit': {
        type: STATE,
        data: [{
            type: CHARACTERSTRING,
            data: 'credit'
        }, {
            type: CHARACTERSTRING,
            data: 'no-credit'
        }],
        perm: READ_ONLY
    },
    'cmi.entry': {
        type: STATE,
        data: [{
            type: CHARACTERSTRING,
            data: 'ab-initio'
        }, {
            type: CHARACTERSTRING,
            data: 'resume'
        }, {
            type: CHARACTERSTRING,
            data: ''
        }],
        perm: READ_ONLY
    },
    'cmi.exit': {
        type: STATE,
        data: [{
            type: CHARACTERSTRING,
            data: 'time-out'
        }, {
            type: CHARACTERSTRING,
            data: 'suspend'
        }, {
            type: CHARACTERSTRING,
            data: 'logout'
        }, {
            type: CHARACTERSTRING,
            data: 'normal'
        }, {
            type: CHARACTERSTRING,
            data: ''
        }],
        perm: WRITE_ONLY
    },
    'cmi.interactions': {
        type: ARRAY,
        perm: NO_ACCESS
    },
    'cmi.interactions._count': {
        type: COUNT,
        perm: READ_ONLY
    },
    'cmi.interactions._children': {
        type: CHILDREN,
        data: ['id', 'type', 'objectives', 'timestamp', 'correct_responses', 'weighting', 'learner_response', 'result', 'latency', 'description'],
        perm: READ_ONLY
    },
    'cmi.interactions.n.id': {
        type: LONG_IDENTIFIER_TYPE,
        spm: 4000,
        perm: READ_WRITE
    },
    'cmi.interactions.n.type': {
        type: STATE,
        data: [{
            type: CHARACTERSTRING,
            data: 'true-false'
        }, {
            type: CHARACTERSTRING,
            data: 'choice'
        }, {
            type: CHARACTERSTRING,
            data: 'fill-in'
        }, {
            type: CHARACTERSTRING,
            data: 'long-fill-in'
        }, {
            type: CHARACTERSTRING,
            data: 'matching'
        }, {
            type: CHARACTERSTRING,
            data: 'performance'
        }, {
            type: CHARACTERSTRING,
            data: 'sequencing'
        }, {
            type: CHARACTERSTRING,
            data: 'likert'
        }, {
            type: CHARACTERSTRING,
            data: 'numeric'
        }, {
            type: CHARACTERSTRING,
            data: 'other'
        }],
        perm: READ_WRITE
    },
    'cmi.interactions.n.objectives': {
        type: ARRAY,
        perm: NO_ACCESS
    },
    'cmi.interactions.n.objectives._count': {
        type: COUNT,
        perm: READ_ONLY
    },
    'cmi.interactions.n.objectives._children': {
        type: CHILDREN,
        data: ['id'],
        perm: READ_ONLY
    },
    'cmi.interactions.n.objectives.n.id': {
        type: LONG_IDENTIFIER_TYPE,
        spm: 4000,
        perm: READ_WRITE
    },
    'cmi.interactions.n.timestamp': {
        type: TIME,
        perm: READ_WRITE
    },
    'cmi.interactions.n.correct_responses': {
        type: ARRAY,
        perm: NO_ACCESS
    },
    'cmi.interactions.n.correct_responses._count': {
        type: COUNT,
        perm: READ_ONLY
    },
    'cmi.interactions.n.correct_responses._children': {
        type: CHILDREN,
        data: ['pattern'],
        perm: READ_ONLY
    },
    'cmi.interactions.n.correct_responses.n.pattern': {
        type: INHERITED,
        perm: READ_WRITE
    },
    'cmi.interactions.n.weighting': {
        type: REAL,
        perm: READ_WRITE
    },
    'cmi.interactions.n.learner_response': {
        type: INHERITED,
        perm: READ_WRITE
    },
    'cmi.interactions.n.result': {
        type: STATE,
        data: [{
            type: CHARACTERSTRING,
            data: 'correct'
        }, {
            type: CHARACTERSTRING,
            data: 'incorrect'
        }, {
            type: CHARACTERSTRING,
            data: 'unanticipated'
        }, {
            type: CHARACTERSTRING,
            data: 'neutral'
        }, {
            type: REAL
        }],
        perm: READ_WRITE
    },
    'cmi.interactions.n.latency': {
        type: TIMEINTERVAL,
        perm: READ_WRITE
    },
    'cmi.interactions.n.description': {
        type: LOCALIZED_STRING_TYPE,
        spm: 250,
        perm: READ_WRITE
    },
    'cmi.launch_data': {
        type: CHARACTERSTRING,
        spm: 4000,
        perm: READ_ONLY
    },
    'cmi.learner_id': {
        type: LONG_IDENTIFIER_TYPE,
        spm: 4000,
        perm: READ_ONLY
    },
    'cmi.learner_name': {
        type: LOCALIZED_STRING_TYPE,
        perm: READ_ONLY
    },
    'cmi.learner_preference': {
        type: OBJECT,
        perm: NO_ACCESS
    },
    'cmi.learner_preference._children': {
        type: CHILDREN,
        data: ['audio_level', 'language', 'delivery_speed', 'audio_captioning'],
        perm: READ_ONLY
    },
    'cmi.learner_preference.audio_level': {
        type: REAL,
        data: [0, Infinity],
        perm: READ_WRITE
    },
    'cmi.learner_preference.language': {
        type: LANGUAGE_TYPE,
        spm: 250,
        perm: READ_WRITE
    },
    'cmi.learner_preference.delivery_speed': {
        type: REAL,
        data: [0, Infinity],
        perm: READ_WRITE
    },
    'cmi.learner_preference.audio_captioning': {
        type: STATE,
        data: [{
            type: CHARACTERSTRING,
            data: '-1'
        }, {
            type: CHARACTERSTRING,
            data: '0'
        }, {
            type: CHARACTERSTRING,
            data: '1'
        }],
        perm: READ_WRITE
    },
    'cmi.location': {
        type: CHARACTERSTRING,
        spm: 1000,
        perm: READ_WRITE
    },
    'cmi.max_time_allowed': {
        type: TIMEINTERVAL,
        perm: READ_ONLY
    },
    'cmi.mode': {
        type: STATE,
        data: [{
            type: CHARACTERSTRING,
            data: 'browse'
        }, {
            type: CHARACTERSTRING,
            data: 'normal'
        }, {
            type: CHARACTERSTRING,
            data: 'review'
        }],
        perm: READ_ONLY
    },
    'cmi.objectives': {
        type: ARRAY,
        perm: NO_ACCESS
    },
    'cmi.objectives._count': {
        type: COUNT,
        perm: READ_ONLY
    },
    'cmi.objectives._children': {
        type: CHILDREN,
        data: ['id', 'score', 'success_status', 'completion_status', 'description'],
        perm: READ_ONLY
    },
    'cmi.objectives.n.id': {
        type: LONG_IDENTIFIER_TYPE,
        spm: 4000,
        perm: READ_WRITE
    },
    'cmi.objectives.n.score': {
        type: OBJECT,
        perm: NO_ACCESS
    },
    'cmi.objectives.n.score._children': {
        type: CHILDREN,
        data: ['scaled', 'raw', 'min', 'max'],
        perm: READ_ONLY
    },
    'cmi.objectives.n.score.scaled': {
        type: REAL,
        data: [-1, 1],
        perm: READ_WRITE
    },
    'cmi.objectives.n.score.raw': {
        type: REAL,
        perm: READ_WRITE
    },
    'cmi.objectives.n.score.min': {
        type: REAL,
        perm: READ_WRITE
    },
    'cmi.objectives.n.score.max': {
        type: REAL,
        perm: READ_WRITE
    },
    'cmi.objectives.n.success_status': {
        type: STATE,
        data: [{
            type: CHARACTERSTRING,
            data: 'passed'
        }, {
            type: CHARACTERSTRING,
            data: 'failed'
        }, {
            type: CHARACTERSTRING,
            data: 'unknown'
        }],
        perm: READ_WRITE
    },
    'cmi.objectives.n.completion_status': {
        type: STATE,
        data: [{
            type: CHARACTERSTRING,
            data: 'completed'
        }, {
            type: CHARACTERSTRING,
            data: 'incomplete'
        }, {
            type: CHARACTERSTRING,
            data: 'not attempted'
        }, {
            type: CHARACTERSTRING,
            data: 'unknown'
        }],
        perm: READ_WRITE
    },
    'cmi.objectives.n.progress_measure': {
        type: REAL,
        data: [0, 1],
        perm: READ_WRITE
    },
    'cmi.objectives.n.description': {
        type: LOCALIZED_STRING_TYPE,
        spm: 250,
        perm: READ_WRITE
    },
    'cmi.progress_measure': {
        type: REAL,
        data: [0, 1],
        perm: READ_WRITE
    },
    'cmi.scaled_passing_score': {
        type: REAL,
        data: [-1, 1],
        perm: READ_ONLY
    },
    'cmi.score': {
        type: OBJECT,
        perm: NO_ACCESS
    },
    'cmi.score._children': {
        type: CHILDREN,
        data: ['scaled', 'raw', 'min', 'max'],
        perm: READ_ONLY
    },
    'cmi.score.scaled': {
        type: REAL,
        data: [-1, 1],
        perm: READ_WRITE
    },
    'cmi.score.raw': {
        type: REAL,
        perm: READ_WRITE
    },
    'cmi.score.min': {
        type: REAL,
        perm: READ_WRITE
    },
    'cmi.score.max': {
        type: REAL,
        perm: READ_WRITE
    },
    'cmi.session_time': {
        type: TIMEINTERVAL,
        perm: WRITE_ONLY
    },
    'cmi.success_status': {
        type: STATE,
        data: [{
            type: CHARACTERSTRING,
            data: 'passed'
        }, {
            type: CHARACTERSTRING,
            data: 'failed'
        }, {
            type: CHARACTERSTRING,
            data: 'unknown'
        }],
        perm: READ_WRITE
    },
    'cmi.suspend_data': {
        type: CHARACTERSTRING,
        spm: 64000,
        perm: READ_WRITE
    },
    'cmi.time_limit_action': {
        type: STATE,
        data: [{
            type: CHARACTERSTRING,
            data: 'exit,message'
        }, {
            type: CHARACTERSTRING,
            data: 'continue,message'
        }, {
            type: CHARACTERSTRING,
            data: 'exit,no message'
        }, {
            type: CHARACTERSTRING,
            data: 'continue,no message'
        }],
        perm: READ_ONLY
    },
    'cmi.total_time': {
        type: TIMEINTERVAL,
        perm: READ_ONLY
    }
};

var _VALIDATIONS;

// TODO: make validations legit
var VALIDATIONS = (_VALIDATIONS = {}, babelHelpers.defineProperty(_VALIDATIONS, TYPE.CHARACTERSTRING, function (value, data) {
    return value === data;
}), babelHelpers.defineProperty(_VALIDATIONS, TYPE.LOCALIZED_STRING_TYPE, function () {
    return true;
}), babelHelpers.defineProperty(_VALIDATIONS, TYPE.LANGUAGE_TYPE, function () {
    return true;
}), babelHelpers.defineProperty(_VALIDATIONS, TYPE.LONG_IDENTIFIER_TYPE, function (value) {
    return value.length > 0 && /\S/.test(value);
}), babelHelpers.defineProperty(_VALIDATIONS, TYPE.SHORT_IDENTIFIER_TYPE, function (value) {
    return value.length > 0 && /\S/.test(value);
}), babelHelpers.defineProperty(_VALIDATIONS, TYPE.INTEGER, function (value) {
    return !Number.isNaN(Number(value)) && Math.floor(Number(value)) === Number(value);
}), babelHelpers.defineProperty(_VALIDATIONS, TYPE.STATE, function (value) {
    var data = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
    return data.some(function (state) {
        return VALIDATIONS[state.type](value, state.data);
    });
}), babelHelpers.defineProperty(_VALIDATIONS, TYPE.REAL, function (value) {
    var _ref = arguments.length <= 1 || arguments[1] === undefined ? [-Infinity, Infinity] : arguments[1];

    var _ref2 = babelHelpers.slicedToArray(_ref, 2);

    var min = _ref2[0];
    var max = _ref2[1];
    return value > min && value < max;
}), babelHelpers.defineProperty(_VALIDATIONS, TYPE.TIME, function () {
    return true;
}), babelHelpers.defineProperty(_VALIDATIONS, TYPE.TIMEINTERVAL, function (value) {
    return (/^P.*/.test(value)
    );
}), _VALIDATIONS);

function pathExists(path) {
    if (/\._count$/.test(path)) {
        return pathExists(path.slice(0, -'._count'.length));
    }

    return !!SCORM_2004$1[path];
}

function hasPermissions(path, permission) {
    var perm = SCORM_2004$1[path].perm;

    return perm === PERM.READ_WRITE || perm === permission;
}

function isReadable(path) {
    return hasPermissions(path, PERM.READ_ONLY);
}

function isWritable(path) {
    return hasPermissions(path, PERM.WRITE_ONLY);
}

function isValidValue(path, value) {
    var _SCORM_DATA$path = SCORM_2004$1[path];
    var type = _SCORM_DATA$path.type;
    var _SCORM_DATA$path$data = _SCORM_DATA$path.data;
    var data = _SCORM_DATA$path$data === undefined ? null : _SCORM_DATA$path$data;

    // TODO: support inherited types, just return true for now

    if (!VALIDATIONS[type]) return true;

    return VALIDATIONS[type](value, data);
}

var ModelComponent = (function () {
    function ModelComponent() {
        var _ref = arguments.length <= 0 || arguments[0] === undefined ? { value: '', sub: {}, arr: [] } : arguments[0];

        var _ref$value = _ref.value;
        var value = _ref$value === undefined ? '' : _ref$value;
        var _ref$sub = _ref.sub;
        var sub = _ref$sub === undefined ? {} : _ref$sub;
        var _ref$arr = _ref.arr;
        var arr = _ref$arr === undefined ? [] : _ref$arr;
        babelHelpers.classCallCheck(this, ModelComponent);

        this._value = String(value);
        this._sub = sub;
        this._arr = arr;
    }

    babelHelpers.createClass(ModelComponent, [{
        key: 'toString',
        value: function toString() {
            var _this = this;

            var key = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

            if (!this._arr.length && !Object.keys(this._sub).length) return key + ' = "' + this._value + '"';

            var arr = this._arr.map(function (ar, i) {
                return ar.toString(key + '.' + i);
            });
            var sub = Object.keys(this._sub).map(function (obj) {
                return _this._sub[obj].toString(key + '.' + obj);
            });

            return arr.concat(sub).concat(arr.length ? key + '._count = ' + arr.length : [])
            // .concat(this.__children.length ? `${key}._children = ${this.__children.join(',')}` : [])
            .join('\n');
        }
    }, {
        key: '_count',
        get: function get() {
            return {
                _value: String(this._arr.length)
            };
        }
    }]);
    return ModelComponent;
})();

var Model = (function () {
    function Model() {
        babelHelpers.classCallCheck(this, Model);

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

    babelHelpers.createClass(Model, [{
        key: 'GetValue',
        value: function GetValue(element) {
            var genericPath = genericizePath(element);

            // catch ._children manually
            if (/\._children$/.test(element)) {
                return SCORM_2004$1[element].data.join(',');
            }

            if (!pathExists(genericPath)) {
                throw new Error(SCORM_2004.UNDEFINED_DATA_MODEL_ELEMENT);
            }

            if (!isReadable(genericPath)) {
                throw new Error(SCORM_2004.DATA_MODEL_ELEMENT_IS_READ_ONLY);
            }

            // catch ._version manually
            if (element === 'cmi._version') {
                return '1.0';
            }

            return this._GetValue(normalizePath(element));
        }

        // slurp the value out of the underlying data structure

    }, {
        key: '_GetValue',
        value: function _GetValue(path) {
            return _.get(this.data, path);
        }
    }, {
        key: 'SetValue',
        value: function SetValue(element, value) {
            var _this2 = this;

            var genericPath = genericizePath(element);

            if (!pathExists(genericPath)) {
                throw new Error(SCORM_2004.UNDEFINED_DATA_MODEL_ELEMENT);
            }

            if (!isWritable(genericPath) || /\._(children|count)$/.test(genericPath)) {
                throw new Error(SCORM_2004.DATA_MODEL_ELEMENT_IS_WRITE_ONLY);
            }

            if (!isValidValue(genericPath, value)) {
                throw new Error(SCORM_2004.DATA_MODEL_ELEMENT_TYPE_MISMATCH);
            }

            var path = normalizePath(element);

            path.split('.').slice(1).slice(0, -1).reduce(function (currPath, part) {
                var nextPath = currPath + '.' + part;

                var nextVal = _.get(_this2.data, nextPath);

                if (!nextVal && part !== '_sub') {
                    _.set(_this2.data, nextPath, new ModelComponent());
                }

                return nextPath;
            }, path.split('.')[0]);

            this._SetValue(path, value);
        }

        // slurp the value into the underlying data structure

    }, {
        key: '_SetValue',
        value: function _SetValue(path, value) {
            _.set(this.data, path, value);
        }

        // TODO: implement

    }, {
        key: 'Serialize',
        value: function Serialize() {}

        // TODO: implement

    }, {
        key: 'toString',

        // TODO: include children
        value: function toString() {
            var _this3 = this;

            return Object.keys(this.data).map(function (key) {
                return '' + _this3.data[key].toString(key);
            }).join('\n').split('\n').sort().join('\n');
        }
    }], [{
        key: 'Deserialize',
        value: function Deserialize(serialized) {
            return new Model();
        }
    }]);
    return Model;
})();

module.exports = Model;