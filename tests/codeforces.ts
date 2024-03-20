import { expect } from "chai";
import { CodeForcesAPI } from "../src/codeforces";

let apiKey = process.env.CFK;
let apiSecret = process.env.CFS;

let TEST_TIMEOUT = process.env.CFT_TIMEOUT || 60000; //1 minute

// neccessary informations for testing
let confg = {
  blogEntry: {
    validId: 79,
    invalidId: 1500,
  },
  contest: {
    validId: 566,
    invalidId: 25000,
  },
};

describe("Codeforces", function () {
  describe("#callApi", function () {
    // describe("[With API key]", function () {
    //   this.timeout(TEST_TIMEOUT);

    //   it("should not return error when API key exists", function (done) {
    //     CodeForcesAPI.problemset.recentStatus({ count: 1 }, function (err, data) {
    //       expect(err).to.be.null;
    //       done();
    //     });
    //   });
    // });

    // describe("[Without API key]", function () {
    //   before(function () {
    //     CodeForcesAPI.("", "");
    //   });

    //   after(function () {
    //     CodeForcesAPI.setApis(apiKey, apiSecret);
    //   });

    //   it("should throw error when no parameter exists", function (done) {
    //     expect(function () {
    //       CodeForcesAPI.blogEntry.comments();
    //     }).to.throw(Error);
    //     done();
    //   });

    //   it("should throw error when parameter not an object", function (done) {
    //     expect(function () {
    //       CodeForcesAPI.blogEntry.comments(callback);
    //     }).to.throw(Error);
    //     done();
    //   });

    //   it("should match error when no parameter exists", function (done) {
    //     expect(function () {
    //       CodeForcesAPI.blogEntry.comments();
    //     }).to.throw("undefined is not a valid parameters object.");
    //     done();
    //   });

    //   it("should match error when parameter not an object", function (done) {
    //     expect(function () {
    //       CodeForcesAPI.blogEntry.comments(callback);
    //     }).to.throw("valid parameters object required.");
    //     done();
    //   });

    //   it("should throw error when API key is empty and callback not exists", function (done) {
    //     expect(function () {
    //       CodeForcesAPI.blogEntry.comments({});
    //     }).to.throw(Error);
    //     done();
    //   });

    //   it("should not throw error when API key is empty and callback exists", function (done) {
    //     expect(function () {
    //       CodeForcesAPI.blogEntry.comments({}, callback);
    //     }).to.not.throw(Error);
    //     done();
    //   });

    //   it("should return error when API key is empty and callback exists", function (done) {
    //     CodeForcesAPI.blogEntry.comments({}, function (err, data) {
    //       expect(err).to.not.null;
    //       expect(err).to.not.undefined;
    //       done();
    //     });
    //   });
    // });

    describe("#blogEntry", function () {
      describe(".comments", function () {
        this.timeout(TEST_TIMEOUT);

        it("should return a BlogEntry when blogEntryId is empty", async function (done) {
          // @ts-expect-error
          const response = await CodeForcesAPI.blogEntry.comments({});
          expect(response).to.be.an("object").with.property("comments");
        });

        it("should failed when blogEntryId is invalid", function (done) {
          CodeForcesAPI.blogEntry.comments({
            blogEntryId: confg.blogEntry.invalidId,
          });
        });

        it("should successfully return json when blogEntryId is valid", function (done) {
          CodeForcesAPI.blogEntry.comments({
            blogEntryId: confg.blogEntry.validId,
          });
        });
      });
      describe(".view", function () {
        this.timeout(TEST_TIMEOUT);

        it("should return error when blogEntryId is empty", function (done) {
          // @ts-expect-error
          CodeForcesAPI.blogEntry.view({});
        });

        it("should failed when blogEntryId is invalid", function (done) {
          CodeForcesAPI.blogEntry.view({
            blogEntryId: confg.blogEntry.invalidId,
          });
        });

        it("should successfully return json", function (done) {
          CodeForcesAPI.blogEntry.view({
            blogEntryId: confg.blogEntry.validId,
          });
        });
      });
    });

    describe("#contest", function () {
      describe(".hacks", function () {
        this.timeout(TEST_TIMEOUT);

        it("should return error when contestId is empty", function (done) {
          // @ts-expect-error
          CodeForcesAPI.contest.hacks({});
        });

        it("should failed when contestID is invalid", function (done) {
          CodeForcesAPI.contest.hacks({ contestId: confg.contest.invalidId });
        });

        it("should successfully return json when contestId is valid", function (done) {
          CodeForcesAPI.contest.hacks({ contestId: 1 });
        });
      });

      describe(".list", function () {
        this.timeout(TEST_TIMEOUT);

        it("should successfully return json", function (done) {
          CodeForcesAPI.contest.list({ gym: false });
        });
      });

      describe(".ratingChanges", function () {
        this.timeout(TEST_TIMEOUT);

        it("should return error when contestId is empty", function (done) {
          // @ts-expect-error
          CodeForcesAPI.contest.ratingChanges({});
        });

        it("should failed when contestId is invalid", function (done) {
          CodeForcesAPI.contest.ratingChanges({
            contestId: confg.contest.invalidId,
          });
        });

        it("should successfully return json", function (done) {
          CodeForcesAPI.contest.ratingChanges({ contestId: 1 });
        });
      });

      describe(".standings", function () {
        this.timeout(TEST_TIMEOUT);

        it("should return error when contestId empty", function (done) {
          // @ts-expect-error
          CodeForcesAPI.contest.standings({});
        });

        it("should successfully return json without handles", function (done) {
          CodeForcesAPI.contest.standings({
            contestId: 1,
            from: 1,
            count: 1,
            showUnofficial: true,
          });
        });

        it("should successfully return json without handles and with room", function (done) {
          CodeForcesAPI.contest.standings({
            contestId: 1,
            from: 1,
            count: 1,
            showUnofficial: true,
            room: 3,
          });
        });

        it("should successfully return json with single handles", function (done) {
          CodeForcesAPI.contest.standings({
            contestId: 1,
            handles: "Gullesnuffs",
            from: 1,
            count: 2,
            showUnofficial: true,
          });
        });

        it("should successfully return json with array of handles", function (done) {
          CodeForcesAPI.contest.standings({
            contestId: 1,
            handles: ["Gullesnuffs", "uwi"].join(','),
            from: 1,
            count: 2,
            showUnofficial: true,
          });
        });
      });

      describe(".status", function () {
        this.timeout(TEST_TIMEOUT);

        it("should return error when contestId empty", function (done) {
          // @ts-expect-error
          CodeForcesAPI.contest.status({});
        });

        it("should successfully return json without handle", function (done) {
          CodeForcesAPI.contest.status({ contestId: 566, from: 1, count: 1 });
        });

        it("should successfully return json with handle", function (done) {
          CodeForcesAPI.contest.status({
            contestId: 566,
            from: 1,
            count: 1,
            handle: "tapioca",
          });
        });
      });
    });

    describe("#problemset", function () {
      describe(".problems", function () {
        this.timeout(TEST_TIMEOUT);

        it("should successfully return json without tag", function (done) {
          CodeForcesAPI.problemset.problems({});
        });

        it("should successfully return json with single tag", function (done) {
          CodeForcesAPI.problemset.problems({ tags: "probabilities" });
        });

        it("should successfully return json with array of tags", function (done) {
          CodeForcesAPI.problemset.problems({
            tags: ["probabilities", "two pointers"].join(','),
          });
        });
      });

      describe(".recentStatus", function () {
        this.timeout(TEST_TIMEOUT);

        it("should return error when count is empty", function (done) {
          // @ts-expect-error
          CodeForcesAPI.problemset.recentStatus({});
        });

        it("should successfully return json", function (done) {
          CodeForcesAPI.problemset.recentStatus({ count: 2 });
        });
      });
    });

    describe("#recentActions", function () {
      this.timeout(TEST_TIMEOUT);

      it("should return error when maxCount  is empty", function (done) {
        // @ts-expect-error
        CodeForcesAPI.recentActions({});
      });

      it("should successfully return json", function (done) {
        CodeForcesAPI.recentActions({ maxCount: 1 });
      });
    });

    describe("#user", function () {
      describe(".blogEntries", function () {
        this.timeout(TEST_TIMEOUT);

        it("should return error when handle is empty", function (done) {
          // @ts-expect-error
          CodeForcesAPI.user.blogEntries({});
        });

        it("should successfully return json", function (done) {
          CodeForcesAPI.user.blogEntries({ handle: "llgyc" });
        });
      });

      describe(".friends", function () {
        this.timeout(TEST_TIMEOUT);

        it("should successfully return json with onlyOnline", function (done) {
          CodeForcesAPI.user.friends({ onlyOnline: true });
        });

        it("should successfully return json without onlyOnline", function (done) {
          CodeForcesAPI.user.friends({});
        });
      });

      describe(".info", function () {
        this.timeout(TEST_TIMEOUT);

        it("should return error when handles is empty");
      });

      it("should successfully return json when single handle passed", function (done) {
        CodeForcesAPI.user.info({ handles: "Fefer_Ivan" });
      });

      it("should successfully return json when array of handles passed", function (done) {
        CodeForcesAPI.user.info({ handles: ["Fefer_Ivan", "DmitriyH"].join(',') });
      });
    });

    /* //data is huge
             describe('.ratedList', function() {

             this.timeout(TEST_TIMEOUT);

             it('should successfully return json', function(done) {
             CodeForcesAPI.user.ratedList({ activeOnly: true },function (err,result) {
             expect(err).to.not.be.null;
             expect(err).to.not.be.undefined;
             done();
             });
             });

             });*/

    describe(".rating", function () {
      this.timeout(TEST_TIMEOUT);

      it("should return error when handle is empty", function (done) {
        // @ts-expect-error
        CodeForcesAPI.user.rating({});
      });

      it("should successfully return json", function (done) {
        CodeForcesAPI.user.rating({ handle: "Fefer_Ivan" });
      });

      describe(".status", function () {
        this.timeout(TEST_TIMEOUT);

        it("should return error when handle is empty", function (done) {
          // @ts-expect-error
          CodeForcesAPI.user.status({});
        });

        it("should successfully return json", function (done) {
          CodeForcesAPI.user.status({
            handle: "Fefer_Ivan",
            from: 1,
            count: 2,
          });
        });
      });
    });
  });
});
