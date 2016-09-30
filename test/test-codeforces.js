import { expect } from 'chai';
import Codeforces from '../src/codeforces';

describe('Codeforces', () => {
    describe('#add', () => {

        it('returns 3', () => {
            let result = Codeforces.add(1,2);
            expect(result).to.equal(3);
        });

        it('returns same api key', () => {
            Codeforces.setApiKey('ab','cd');
            let result = Codeforces.getApiKey();
            expect(result).to.equal('ab');
        });

    });
});