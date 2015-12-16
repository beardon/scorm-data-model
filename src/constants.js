const CHARACTERSTRING = 'CHARACTERSTRING';
const LOCALIZED_STRING_TYPE = 'LOCALIZED_STRING_TYPE';
const LANGUAGE_TYPE = 'LANGUAGE_TYPE';
const LONG_IDENTIFIER_TYPE = 'LONG_IDENTIFIER_TYPE';
const SHORT_IDENTIFIER_TYPE = 'SHORT_IDENTIFIER_TYPE';
const INTEGER = 'INTEGER';
const STATE = 'STATE';
const REAL = 'REAL';
const TIME = 'TIME';
const TIMEINTERVAL = 'TIMEINTERVAL';

// internal types
const ARRAY = 'ARRAY';
const COUNT = 'COUNT';
const CHILDREN = 'CHILDREN';
const INHERITED = 'INHERITED';
const OBJECT = 'OBJECT';

export const TYPE = {
    CHARACTERSTRING,
    LOCALIZED_STRING_TYPE,
    LANGUAGE_TYPE,
    LONG_IDENTIFIER_TYPE,
    SHORT_IDENTIFIER_TYPE,
    INTEGER,
    STATE,
    REAL,
    TIME,
    TIMEINTERVAL
};

const READ_ONLY = 'READ_ONLY';
const READ_WRITE = 'READ_WRITE';
const WRITE_ONLY = 'WRITE_ONLY';
const NO_ACCESS = '';

export const PERM = { READ_ONLY, READ_WRITE, WRITE_ONLY };

export const SCORM_2004 = {
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
        },
        {
            type: CHARACTERSTRING,
            data: 'incomplete'
        },
        {
            type: CHARACTERSTRING,
            data: 'not attempted'
        },
        {
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
        },
        {
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
        },
        {
            type: CHARACTERSTRING,
            data: 'resume'
        },
        {
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
        },
        {
            type: CHARACTERSTRING,
            data: 'suspend'
        },
        {
            type: CHARACTERSTRING,
            data: 'logout'
        },
        {
            type: CHARACTERSTRING,
            data: 'normal'
        },
        {
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
        data: [
            'id',
            'type',
            'objectives',
            'timestamp',
            'correct_responses',
            'weighting',
            'learner_response',
            'result',
            'latency',
            'description'
        ],
        perm: READ_ONLY
    },
    'cmi.interactions.n.id': {
        type: LONG_IDENTIFIER_TYPE,
        spm: 4000,
        perm: READ_WRITE
    },
    'cmi.interactions.n.type': {
        type: STATE,
        data: [
        {
            type: CHARACTERSTRING,
            data: 'true-false'
        },
        {
            type: CHARACTERSTRING,
            data: 'choice'
        },
        {
            type: CHARACTERSTRING,
            data: 'fill-in'
        },
        {
            type: CHARACTERSTRING,
            data: 'long-fill-in'
        },
        {
            type: CHARACTERSTRING,
            data: 'matching'
        },
        {
            type: CHARACTERSTRING,
            data: 'performance'
        },
        {
            type: CHARACTERSTRING,
            data: 'sequencing'
        },
        {
            type: CHARACTERSTRING,
            data: 'likert'
        },
        {
            type: CHARACTERSTRING,
            data: 'numeric'
        },
        {
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
        },
        {
            type: CHARACTERSTRING,
            data: 'incorrect'
        },
        {
            type: CHARACTERSTRING,
            data: 'unanticipated'
        },
        {
            type: CHARACTERSTRING,
            data: 'neutral'
        },
        {
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
        data: [
            'audio_level',
            'language',
            'delivery_speed',
            'audio_captioning'
        ],
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
        },
        {
            type: CHARACTERSTRING,
            data: '0'
        },
        {
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
        },
        {
            type: CHARACTERSTRING,
            data: 'normal'
        },
        {
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
        data: [
            'id',
            'score',
            'success_status',
            'completion_status',
            'description'
        ],
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
        data: [
            'scaled',
            'raw',
            'min',
            'max'
        ],
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
        },
        {
            type: CHARACTERSTRING,
            data: 'failed'
        },
        {
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
        },
        {
            type: CHARACTERSTRING,
            data: 'incomplete'
        },
        {
            type: CHARACTERSTRING,
            data: 'not attempted'
        },
        {
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
        data: [
            'scaled',
            'raw',
            'min',
            'max'
        ],
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
        },
        {
            type: CHARACTERSTRING,
            data: 'failed'
        },
        {
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
        },
        {
            type: CHARACTERSTRING,
            data: 'continue,message'
        },
        {
            type: CHARACTERSTRING,
            data: 'exit,no message'
        },
        {
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
