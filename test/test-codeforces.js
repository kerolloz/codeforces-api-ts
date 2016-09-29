import { expect } from 'chai';
import { Codeforces } from '../src/codeforces';

describe('Codeforces', () => {
    describe('#add', () => {

        let cf;

        beforeEach(() => {
            cf = new Codeforces();
        });

        it('returns 3', () => {
            let result = cf.add(1,2);
            expect(result).to.equal(3);
        });

    });
});