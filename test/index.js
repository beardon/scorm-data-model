/* global describe, it */

import { expect } from 'chai';

import { normalizePath, genericizePath } from '../src/utils';
import Model from '../src/index';

describe('SCORM Data', () => {
    describe('Util', () => {
        describe('normalizePath', () => {
            it('should add _value to the end of any path', () => {
                expect(normalizePath('cmi')).to.equal('cmi._value');
            });

            it('should add _sub to sub objects in the path', () => {
                expect(normalizePath('cmi.interactions')).to.equal('cmi._sub.interactions._value');
            });

            it('should convert array indices to array notation', () => {
                expect(normalizePath('cmi.interactions.0.id')).to.equal('cmi._sub.interactions._arr[0]._sub.id._value');
            });

            it('should convert array indices to array notation more than once if required', () => {
                expect(normalizePath('cmi.interactions.0.correct_responses.0.pattern')).to.equal('cmi._sub.interactions._arr[0]._sub.correct_responses._arr[0]._sub.pattern._value');
            });

            it('should correctly handle _count', () => {
                expect(normalizePath('cmi.interactions._count')).to.equal('cmi._sub.interactions._arr.length');
            });

            it('should correctly handle _children', () => {
                expect(normalizePath('cmi.interactions._children')).to.equal('cmi._sub.interactions._children._value');
            });
        });

        describe('genericizePath', () => {
            it('should not alter paths without array indices', () => {
                expect(genericizePath('cmi')).to.equal('cmi');
                expect(genericizePath('cmi.interactions')).to.equal('cmi.interactions');
                expect(genericizePath('cmi.interactions._count')).to.equal('cmi.interactions._count');
                expect(genericizePath('cmi.interactions._children')).to.equal('cmi.interactions._children');
            });

            it('should convert indices to generic "n"s', () => {
                expect(genericizePath('cmi.interactions.0.id')).to.equal('cmi.interactions.n.id');
                expect(genericizePath('cmi.interactions.0.correct_responses.0.pattern')).to.equal('cmi.interactions.n.correct_responses.n.pattern');
            });
        });
    });

    describe('Model', () => {
        const m = new Model();

        it('should return "1.0" as its version', () => {
            expect(m.GetValue('cmi._version')).to.equal('1.0');
        });

        it('should allow setting and getting basic data', () => {
            m.SetValue('cmi.suspend_data', 'test');
            expect(m.GetValue('cmi.suspend_data')).to.equal('test');
        });

        it('should allow overwriting data', () => {
            m.SetValue('cmi.suspend_data', 'test2');
            expect(m.GetValue('cmi.suspend_data')).to.equal('test2');
        });

        describe('Children', () => {
            // to make it easy to compare to the output
            const sort = (str) => str.split(',').sort().join(',');

            it('should be correct according to the SCORM 2004 4th Edition Specification', () => {
                expect(sort(m.GetValue('cmi.comments_from_learner._children'))).to.equal('comment,location,timestamp');
                expect(sort(m.GetValue('cmi.comments_from_lms._children'))).to.equal('comment,location,timestamp');
                expect(sort(m.GetValue('cmi.interactions._children'))).to.equal('correct_responses,description,id,latency,learner_response,objectives,result,timestamp,type,weighting');
                expect(sort(m.GetValue('cmi.learner_preference._children'))).to.equal('audio_captioning,audio_level,delivery_speed,language');
                expect(sort(m.GetValue('cmi.objectives._children'))).to.equal('completion_status,description,id,score,success_status');
                expect(sort(m.GetValue('cmi.objectives.n.score._children'))).to.equal('max,min,raw,scaled');
                expect(sort(m.GetValue('cmi.score._children'))).to.equal('max,min,raw,scaled');
            });
        });

        describe('Array', () => {
            it('should initially have a _count of 0', () => {
                expect(m.GetValue('cmi.interactions._count')).to.equal('0');
            });

            it('should initially have a _count of 1', () => {
                m.SetValue('cmi.interactions.0.id', '1');
                expect(m.GetValue('cmi.interactions._count')).to.equal('1');
            });
        });

        describe('Serialization', () => {
            it('should work', () => {
                expect(m.Serialize()).to.equal(Model.Deserialize(m.Serialize()).Serialize());
            });
        });
    });
});
