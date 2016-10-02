import { expect } from 'chai';
import Codeforces from '../src/codeforces';

let apiKey = process.env.CFK;
let apiSecret = process.env.CFS;

Codeforces.setApis(apiKey, apiSecret);

let TEST_TIMEOUT = process.env.CFT_TIMEOUT || 50000;

describe('Codeforces', function() {

    describe('#blogEntry', function() {
        describe('.comments', function() {

            this.timeout(TEST_TIMEOUT);

            it('should return error when blogEntryId empty', (done) => {
                Codeforces.blogEntry.comments({},function (err,result) {
                    expect(err).to.not.be.null;
                    expect(err).to.not.be.undefined;
                    done();
                });
            });

            it('should successfully return json', (done) => {
                Codeforces.blogEntry.comments({ blogEntryId: 79 },function (err,result) {
                    expect(err).to.be.null;
                    done();
                });
            });

        });
        describe('.view', function() {

            this.timeout(TEST_TIMEOUT);

            it('should return error when blogEntryId empty', (done) => {
                Codeforces.blogEntry.view({},function (err,result) {
                    expect(err).to.not.be.null;
                    expect(err).to.not.be.undefined;
                    done();
                });
            });

            it('should successfully return json', (done) => {
                Codeforces.blogEntry.view({ blogEntryId: 79 },function (err,result) {
                    expect(err).to.be.null;
                    done();
                });
            });

        });

    });


    describe('#contest', function() {
        describe('.hacks', function() {

            this.timeout(TEST_TIMEOUT);

            it('should return error when contestId empty', (done) => {
                Codeforces.contest.hacks({},function (err,result) {
                    expect(err).to.not.be.null;
                    expect(err).to.not.be.undefined;
                    done();
                });
            });

            it('should successfully return json', (done) => {
                Codeforces.contest.hacks({ contestId : 700 },function (err,result) {
                    expect(err).to.be.null;
                    done();
                });
            });

        });
        describe('.ratingChanges', function() {

            this.timeout(TEST_TIMEOUT);

            it('should return error when contestId empty', (done) => {
                Codeforces.contest.ratingChanges({},function (err,result) {
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

            it('should successfully return json', (done) => {
                Codeforces.contest.standings({ contestId: 1, from:1, count:1, showUnofficial:true },function (err,result) {
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

            it('should successfully return json', (done) => {
                Codeforces.contest.status({ contestId: 1, from:1, count:1, handle: 'tapioca' },function (err,result) {
                    expect(err).to.be.null;
                    done();
                });
            });

        });

    });

    describe('#problemset', function() {

        describe('.problems', function() {

            this.timeout(TEST_TIMEOUT);

            it('should successfully return json', (done) => {
                Codeforces.problemset.problems({ tags: 'probabilities' },function (err,result) {
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

            it('should successfully return json', (done) => {
                Codeforces.user.friends({ onlyOnline : true },function (err,result) {
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

/*
            it('should successfully return json when array of handles passed', (done) => {
                Codeforces.user.info({ handles: ['Fefer_Ivan','DmitriyH'] },function (err,result) {
                    expect(err).to.be.null;
                    done();
                });
            });*/

        });

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