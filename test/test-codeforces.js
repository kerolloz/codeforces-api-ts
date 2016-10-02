import { expect } from 'chai';
import Codeforces from '../src/codeforces';

let apiKey = process.env.CFK;
let apiSecret = process.env.CFS;

Codeforces.setApis(apiKey, apiSecret);

let TEST_TIMEOUT = process.env.CFT_TIMEOUT || 60000; //1 minute

//neccessary informations for testing
let confg = {
    blogEntry: {
        validId: 79,
        invalidId: 1500
    },
    contest:{
        validId: 566,
        invalidId: 25000,
    }
};

describe('Codeforces', function() {
    describe('#blogEntry', function() {
        describe('.comments', function() {

            this.timeout(TEST_TIMEOUT);

            it('should return error when blogEntryId is empty', (done) => {
                Codeforces.blogEntry.comments({},function (err,result) {
                    expect(err).to.not.be.null;
                    expect(err).to.not.be.undefined;
                    done();
                });
            });


            it('should failed when blogEntryId is invalid', (done) => {
                Codeforces.blogEntry.comments({  blogEntryId: confg.blogEntry.invalidId },function (err,result) {
                    expect(err).to.not.be.null;
                    expect(err).to.not.be.undefined;
                    done();
                });
            });

            it('should successfully return json when blogEntryId is valid', (done) => {
                Codeforces.blogEntry.comments({ blogEntryId: confg.blogEntry.validId },function (err,result) {
                    expect(err).to.be.null;
                    done();
                });
            });

        });
        describe('.view', function() {

            this.timeout(TEST_TIMEOUT);

            it('should return error when blogEntryId is empty', (done) => {
                Codeforces.blogEntry.view({},function (err,result) {
                    expect(err).to.not.be.null;
                    expect(err).to.not.be.undefined;
                    done();
                });
            });

            it('should failed when blogEntryId is invalid', (done) => {
                Codeforces.blogEntry.view({ blogEntryId: confg.blogEntry.invalidId },function (err,result) {
                    expect(err).to.not.be.null;
                    expect(err).to.not.be.undefined;
                    done();
                });
            });

            it('should successfully return json', (done) => {
                Codeforces.blogEntry.view({ blogEntryId: confg.blogEntry.validId },function (err,result) {
                    expect(err).to.be.null;
                    done();
                });
            });

        });

    });


    describe('#contest', function() {
        describe('.hacks', function() {

            this.timeout(TEST_TIMEOUT);

            it('should return error when contestId is empty', (done) => {
                Codeforces.contest.hacks({},function (err,result) {
                    expect(err).to.not.be.null;
                    expect(err).to.not.be.undefined;
                    done();
                });
            });

            it('should failed when contestID is invalid', (done) => {
                Codeforces.contest.hacks({ contestId : confg.contest.invalidId },function (err,result) {
                    expect(err).to.not.be.null;
                    expect(err).to.not.be.undefined;
                    done();
                });
            });

            it('should successfully return json when contestId is valid', (done) => {
                Codeforces.contest.hacks({ contestId : 1 },function (err,result) {
                    expect(err).to.be.null;
                    done();
                });
            });

        });

        describe('.list', function() {

            this.timeout(TEST_TIMEOUT);

            it('should successfully return json', (done) => {
                Codeforces.contest.list({ gym : false },function (err,result) {
                    expect(err).to.be.null;
                    done();
                });
            });
        });

        describe('.ratingChanges', function() {

            this.timeout(TEST_TIMEOUT);

            it('should return error when contestId is empty', (done) => {
                Codeforces.contest.ratingChanges({},function (err,result) {
                    expect(err).to.not.be.null;
                    expect(err).to.not.be.undefined;
                    done();
                });
            });

            it('should failed when contestId is invalid', (done) => {
                Codeforces.contest.ratingChanges({ contestId: confg.contest.invalidId },function (err,result) {
                    expect(err).to.not.be.null;
                    expect(err).to.not.be.undefined;
                    done();
                });
            });

            it('should successfully return json', (done) => {
                Codeforces.contest.ratingChanges({ contestId: 1 },function (err,result) {
                    expect(err).to.be.null;
                    done();
                });
            });
        });

        describe('.standings', function() {

            this.timeout(TEST_TIMEOUT);

            it('should return error when contestId empty', (done) => {
                Codeforces.contest.standings({},function (err,result) {
                    expect(err).to.not.be.null;
                    expect(err).to.not.be.undefined;
                    done();
                });
            });

            it('should successfully return json without handles', (done) => {
                Codeforces.contest.standings({ contestId: 1, from:1, count:1, showUnofficial:true },function (err,result) {
                    expect(err).to.be.null;
                    done();
                });
            });

            it('should successfully return json without handles and with room', (done) => {
                Codeforces.contest.standings({ contestId: 1, from:1, count:1, showUnofficial:true, room: 3 },function (err,result) {
                    expect(err).to.be.null;
                    done();
                });
            });

            it('should successfully return json with single handles', (done) => {
                Codeforces.contest.standings({ contestId: 1, handles: 'Gullesnuffs', from:1, count:2, showUnofficial:true },function (err,result) {
                    expect(err).to.be.null;
                    done();
                });
            });

            it('should successfully return json with array of handles', (done) => {
                Codeforces.contest.standings({ contestId: 1, handles: ['Gullesnuffs','uwi'], from:1, count:2, showUnofficial:true },function (err,result) {
                    expect(err).to.be.null;
                    done();
                });
            });

        });

        describe('.status', function() {

            this.timeout(TEST_TIMEOUT);

            it('should return error when contestId empty', (done) => {
                Codeforces.contest.status({},function (err,result) {
                    expect(err).to.not.be.null;
                    expect(err).to.not.be.undefined;
                    done();
                });
            });

            it('should successfully return json without handle', (done) => {
                Codeforces.contest.status({ contestId: 566, from:1, count:1 },function (err,result) {
                    expect(err).to.be.null;
                    done();
                });
            });

            it('should successfully return json with handle', (done) => {
                Codeforces.contest.status({ contestId: 566, from:1, count:1, handle: 'tapioca' },function (err,result) {
                    expect(err).to.be.null;
                    done();
                });
            });

        });

    });

    describe('#problemset', function() {

        describe('.problems', function() {

            this.timeout(TEST_TIMEOUT);

            it('should successfully return json without tag', (done) => {
                Codeforces.problemset.problems({},function (err,result) {
                    expect(err).to.be.null;
                    done();
                });
            });

            it('should successfully return json with single tag', (done) => {
                Codeforces.problemset.problems({ tags: 'probabilities' },function (err,result) {
                    expect(err).to.be.null;
                    done();
                });
            });

            it('should successfully return json with array of tags', (done) => {
                Codeforces.problemset.problems({ tags: ['probabilities','two pointers'] },function (err,result) {
                    expect(err).to.be.null;
                    done();
                });
            });

        });

        describe('.recentStatus', function() {

            this.timeout(TEST_TIMEOUT);

            it('should return error when count is empty', (done) => {
                Codeforces.problemset.recentStatus({},function (err,result) {
                    expect(err).to.not.be.null;
                    expect(err).to.not.be.undefined;
                    done();
                });
            });

            it('should successfully return json', (done) => {
                Codeforces.problemset.recentStatus({ count: 2 },function (err,result) {
                    expect(err).to.be.null;
                    done();
                });
            });

        });

    });

    describe('#recentActions', function() {

        this.timeout(TEST_TIMEOUT);

        it('should return error when maxCount  is empty', (done) => {
            Codeforces.recentActions({},function (err,result) {
                expect(err).to.not.be.null;
                expect(err).to.not.be.undefined;
                done();
            });
        });

        it('should successfully return json', (done) => {
            Codeforces.recentActions({ maxCount: 1 },function (err,result) {
                expect(err).to.be.null;
                done();
            });
        });

    });

    describe('#user', function() {

        describe('.blogEntries', function() {

            this.timeout(TEST_TIMEOUT);

            it('should return error when handle is empty', (done) => {
                Codeforces.user.blogEntries({},function (err,result) {
                    expect(err).to.not.be.null;
                    expect(err).to.not.be.undefined;
                    done();
                });
            });

            it('should successfully return json', (done) => {
                Codeforces.user.blogEntries({ handle : 'llgyc' },function (err,result) {
                    expect(err).to.be.null;
                    done();
                });
            });

        });

        describe('.friends', function() {

            this.timeout(TEST_TIMEOUT);

            it('should successfully return json with onlyOnline', (done) => {
                Codeforces.user.friends({ onlyOnline : true },function (err,result) {
                    expect(err).to.be.null;
                    done();
                });
            });

            it('should successfully return json without onlyOnline', (done) => {
                Codeforces.user.friends({ },function (err,result) {
                    expect(err).to.be.null;
                    done();
                });
            });

        });

        describe('.info', function() {

            this.timeout(TEST_TIMEOUT);

            it('should return error when handles is empty', (done) => {
                Codeforces.user.info({},function (err,result) {
                    expect(err).to.not.be.null;
                    expect(err).to.not.be.undefined;
                    done();
                });
            });


            it('should successfully return json when single handle passed', (done) => {
                Codeforces.user.info({ handles: 'Fefer_Ivan' },function (err,result) {
                    expect(err).to.be.null;
                    done();
                });
            });


            it('should successfully return json when array of handles passed', (done) => {
                Codeforces.user.info({ handles: ['Fefer_Ivan','DmitriyH'] },function (err,result) {
                    expect(err).to.be.null;
                    done();
                });
            });

        });

        /* //data is huge
        describe('.ratedList', function() {

            this.timeout(TEST_TIMEOUT);

            it('should successfully return json', (done) => {
                Codeforces.user.ratedList({ activeOnly: true },function (err,result) {
                    expect(err).to.not.be.null;
                    expect(err).to.not.be.undefined;
                    done();
                });
            });

        });*/

        describe('.rating', function() {

            this.timeout(TEST_TIMEOUT);

            it('should return error when handle is empty', (done) => {
                Codeforces.user.rating({},function (err,result) {
                    expect(err).to.not.be.null;
                    expect(err).to.not.be.undefined;
                    done();
                });
            });

            it('should successfully return json', (done) => {
                Codeforces.user.rating({ handle: 'Fefer_Ivan' },function (err,result) {
                    expect(err).to.be.null;
                    done();
                });
            });

        });

        describe('.status', function() {

            this.timeout(TEST_TIMEOUT);

            it('should return error when handle is empty', (done) => {
                Codeforces.user.status({},function (err,result) {
                    expect(err).to.not.be.null;
                    expect(err).to.not.be.undefined;
                    done();
                });
            });

            it('should successfully return json', (done) => {
                Codeforces.user.status({ handle: 'Fefer_Ivan', from: 1, count: 2 },function (err,result) {
                    expect(err).to.be.null;
                    done();
                });
            });

        });
    });
});