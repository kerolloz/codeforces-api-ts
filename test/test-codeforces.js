import { expect } from 'chai';
import Codeforces from '../src/codeforces';
import fs from 'fs';

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

let callback =  function () {};

describe('Codeforces', function() {
    describe('#callApi', function() {

        describe('[With API key]', function() {

            this.timeout(TEST_TIMEOUT);

            it('should not return error when API key exists', function(done) {
                Codeforces.problemset.recentStatus({ count: 1 }, function (err,data) {
                    expect(err).to.be.null;
                    done();
                });
            });

        });

        describe('[Without API key]', function() {

            before(function() {
                Codeforces.setApis('', '');
            });

            after(function() {
                Codeforces.setApis(apiKey, apiSecret);
            });

            it('should throw error when no parameter exists', function(done) {
                expect(function () {
                    Codeforces.blogEntry.comments();
                }).to.throw(Error);
                done();
            });

            it('should throw error when parameter not an object', function(done) {
                expect(function () {
                    Codeforces.blogEntry.comments(callback);
                }).to.throw(Error);
                done();
            });

            it('should match error when no parameter exists', function(done) {
                expect(function () {
                    Codeforces.blogEntry.comments();
                }).to.throw('undefined is not a valid parameters object.');
                done();
            });

            it('should match error when parameter not an object', function(done) {
                expect(function () {
                    Codeforces.blogEntry.comments(callback);
                }).to.throw('valid parameters object required.');
                done();
            });

            it('should throw error when API key is empty and callback not exists', function(done) {
                expect(function () {
                    Codeforces.blogEntry.comments({});
                }).to.throw(Error);
                done();
            });

            it('should not throw error when API key is empty and callback exists', function(done) {
                expect(function () {
                    Codeforces.blogEntry.comments({},callback);
                }).to.not.throw(Error);
                done();
            });

            it('should return error when API key is empty and callback exists', function(done) {
                Codeforces.blogEntry.comments({}, function (err,data) {
                    expect(err).to.not.null;
                    expect(err).to.not.undefined;
                    done();
                });
            });

        });

        describe('#blogEntry', function() {
            describe('.comments', function() {

                this.timeout(TEST_TIMEOUT);

                it('should return error when blogEntryId is empty', function(done) {
                    Codeforces.blogEntry.comments({},function (err,result) {
                        expect(err).to.not.be.null;
                        expect(err).to.not.be.undefined;
                        done();
                    });
                });


                it('should failed when blogEntryId is invalid', function(done) {
                    Codeforces.blogEntry.comments({  blogEntryId: confg.blogEntry.invalidId },function (err,result) {
                        expect(err).to.not.be.null;
                        expect(err).to.not.be.undefined;
                        done();
                    });
                });

                it('should successfully return json when blogEntryId is valid', function(done) {
                    Codeforces.blogEntry.comments({ blogEntryId: confg.blogEntry.validId },function (err,result) {
                        expect(err).to.be.null;
                        done();
                    });
                });

            });
            describe('.view', function() {

                this.timeout(TEST_TIMEOUT);

                it('should return error when blogEntryId is empty', function(done) {
                    Codeforces.blogEntry.view({},function (err,result) {
                        expect(err).to.not.be.null;
                        expect(err).to.not.be.undefined;
                        done();
                    });
                });

                it('should failed when blogEntryId is invalid', function(done) {
                    Codeforces.blogEntry.view({ blogEntryId: confg.blogEntry.invalidId },function (err,result) {
                        expect(err).to.not.be.null;
                        expect(err).to.not.be.undefined;
                        done();
                    });
                });

                it('should successfully return json', function(done) {
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

                it('should return error when contestId is empty', function(done) {
                    Codeforces.contest.hacks({},function (err,result) {
                        expect(err).to.not.be.null;
                        expect(err).to.not.be.undefined;
                        done();
                    });
                });

                it('should failed when contestID is invalid', function(done) {
                    Codeforces.contest.hacks({ contestId : confg.contest.invalidId },function (err,result) {
                        expect(err).to.not.be.null;
                        expect(err).to.not.be.undefined;
                        done();
                    });
                });

                it('should successfully return json when contestId is valid', function(done) {
                    Codeforces.contest.hacks({ contestId : 1 },function (err,result) {
                        expect(err).to.be.null;
                        done();
                    });
                });

            });

            describe('.list', function() {

                this.timeout(TEST_TIMEOUT);

                it('should successfully return json', function(done) {
                    Codeforces.contest.list({ gym : false },function (err,result) {
                        expect(err).to.be.null;
                        done();
                    });
                });
            });

            describe('.ratingChanges', function() {

                this.timeout(TEST_TIMEOUT);

                it('should return error when contestId is empty', function(done) {
                    Codeforces.contest.ratingChanges({},function (err,result) {
                        expect(err).to.not.be.null;
                        expect(err).to.not.be.undefined;
                        done();
                    });
                });

                it('should failed when contestId is invalid', function(done) {
                    Codeforces.contest.ratingChanges({ contestId: confg.contest.invalidId },function (err,result) {
                        expect(err).to.not.be.null;
                        expect(err).to.not.be.undefined;
                        done();
                    });
                });

                it('should successfully return json', function(done) {
                    Codeforces.contest.ratingChanges({ contestId: 1 },function (err,result) {
                        expect(err).to.be.null;
                        done();
                    });
                });
            });

            describe('.standings', function() {

                this.timeout(TEST_TIMEOUT);

                it('should return error when contestId empty', function(done) {
                    Codeforces.contest.standings({},function (err,result) {
                        expect(err).to.not.be.null;
                        expect(err).to.not.be.undefined;
                        done();
                    });
                });

                it('should successfully return json without handles', function(done) {
                    Codeforces.contest.standings({ contestId: 1, from:1, count:1, showUnofficial:true },function (err,result) {
                        expect(err).to.be.null;
                        done();
                    });
                });

                it('should successfully return json without handles and with room', function(done) {
                    Codeforces.contest.standings({ contestId: 1, from:1, count:1, showUnofficial:true, room: 3 },function (err,result) {
                        expect(err).to.be.null;
                        done();
                    });
                });

                it('should successfully return json with single handles', function(done) {
                    Codeforces.contest.standings({ contestId: 1, handles: 'Gullesnuffs', from:1, count:2, showUnofficial:true },function (err,result) {
                        expect(err).to.be.null;
                        done();
                    });
                });

                it('should successfully return json with array of handles', function(done) {
                    Codeforces.contest.standings({ contestId: 1, handles: ['Gullesnuffs','uwi'], from:1, count:2, showUnofficial:true },function (err,result) {
                        expect(err).to.be.null;
                        done();
                    });
                });

            });

            describe('.status', function() {

                this.timeout(TEST_TIMEOUT);

                it('should return error when contestId empty', function(done) {
                    Codeforces.contest.status({},function (err,result) {
                        expect(err).to.not.be.null;
                        expect(err).to.not.be.undefined;
                        done();
                    });
                });

                it('should successfully return json without handle', function(done) {
                    Codeforces.contest.status({ contestId: 566, from:1, count:1 },function (err,result) {
                        expect(err).to.be.null;
                        done();
                    });
                });

                it('should successfully return json with handle', function(done) {
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

                it('should successfully return json without tag', function(done) {
                    Codeforces.problemset.problems({},function (err,result) {
                        expect(err).to.be.null;
                        done();
                    });
                });

                it('should successfully return json with single tag', function(done) {
                    Codeforces.problemset.problems({ tags: 'probabilities' },function (err,result) {
                        expect(err).to.be.null;
                        done();
                    });
                });

                it('should successfully return json with array of tags', function(done) {
                    Codeforces.problemset.problems({ tags: ['probabilities','two pointers'] },function (err,result) {
                        expect(err).to.be.null;
                        done();
                    });
                });

            });

            describe('.recentStatus', function() {

                this.timeout(TEST_TIMEOUT);

                it('should return error when count is empty', function(done) {
                    Codeforces.problemset.recentStatus({},function (err,result) {
                        expect(err).to.not.be.null;
                        expect(err).to.not.be.undefined;
                        done();
                    });
                });

                it('should successfully return json', function(done) {
                    Codeforces.problemset.recentStatus({ count: 2 },function (err,result) {
                        expect(err).to.be.null;
                        done();
                    });
                });

            });
        });

        describe('#recentActions', function() {

            this.timeout(TEST_TIMEOUT);

            it('should return error when maxCount  is empty', function(done) {
                Codeforces.recentActions({},function (err,result) {
                    expect(err).to.not.be.null;
                    expect(err).to.not.be.undefined;
                    done();
                });
            });

            it('should successfully return json', function(done) {
                Codeforces.recentActions({ maxCount: 1 },function (err,result) {
                    expect(err).to.be.null;
                    done();
                });
            });
        });

        describe('#user', function() {

            describe('.blogEntries', function () {

                this.timeout(TEST_TIMEOUT);

                it('should return error when handle is empty', function (done) {
                    Codeforces.user.blogEntries({}, function (err, result) {
                        expect(err).to.not.be.null;
                        expect(err).to.not.be.undefined;
                        done();
                    });
                });

                it('should successfully return json', function (done) {
                    Codeforces.user.blogEntries({handle: 'llgyc'}, function (err, result) {
                        expect(err).to.be.null;
                        done();
                    });
                });
            });

            describe('.friends', function () {

                this.timeout(TEST_TIMEOUT);

                it('should successfully return json with onlyOnline', function (done) {
                    Codeforces.user.friends({onlyOnline: true}, function (err, result) {
                        expect(err).to.be.null;
                        done();
                    });
                });

                it('should successfully return json without onlyOnline', function (done) {
                    Codeforces.user.friends({}, function (err, result) {
                        expect(err).to.be.null;
                        done();
                    });
                });
            });

            describe('.info', function () {

                this.timeout(TEST_TIMEOUT);

                it('should return error when handles is empty', function (done) {
                    Codeforces.user.info({}, function (err, result) {
                        expect(err).to.not.be.null;
                        expect(err).to.not.be.undefined;
                        done();
                    });
                });


                it('should successfully return json when single handle passed', function (done) {
                    Codeforces.user.info({handles: 'Fefer_Ivan'}, function (err, result) {
                        expect(err).to.be.null;
                        done();
                    });
                });


                it('should successfully return json when array of handles passed', function (done) {
                    Codeforces.user.info({handles: ['Fefer_Ivan', 'DmitriyH']}, function (err, result) {
                        expect(err).to.be.null;
                        done();
                    });
                });
            });

            /* //data is huge
             describe('.ratedList', function() {

             this.timeout(TEST_TIMEOUT);

             it('should successfully return json', function(done) {
             Codeforces.user.ratedList({ activeOnly: true },function (err,result) {
             expect(err).to.not.be.null;
             expect(err).to.not.be.undefined;
             done();
             });
             });

             });*/

            describe('.rating', function () {

                this.timeout(TEST_TIMEOUT);

                it('should return error when handle is empty', function (done) {
                    Codeforces.user.rating({}, function (err, result) {
                        expect(err).to.not.be.null;
                        expect(err).to.not.be.undefined;
                        done();
                    });
                });

                it('should successfully return json', function (done) {
                    Codeforces.user.rating({handle: 'Fefer_Ivan'}, function (err, result) {
                        expect(err).to.be.null;
                        done();
                    });
                });

            });

            describe('.status', function () {

                this.timeout(TEST_TIMEOUT);

                it('should return error when handle is empty', function (done) {
                    Codeforces.user.status({}, function (err, result) {
                        expect(err).to.not.be.null;
                        expect(err).to.not.be.undefined;
                        done();
                    });
                });

                it('should successfully return json', function (done) {
                    Codeforces.user.status({handle: 'Fefer_Ivan', from: 1, count: 2}, function (err, result) {
                        expect(err).to.be.null;
                        done();
                    });
                });

            });
        });
    });
});