import type { AxiosError } from "axios";
import { expect } from "chai";
import { CodeforcesAPI } from "../src/codeforces";

// necessary information for testing
const config = {
  blogEntry: {
    validId: 79,
    invalidId: 1500,
  },
  contest: {
    validId: 566,
    invalidId: 25000,
  },
};

describe("Codeforces", () => {
  describe("#blogEntry", () => {
    describe("comments", () => {
      it("should return a BlogEntry when blogEntryId is empty", async () => {
        const response = await CodeforcesAPI.call("blogEntry.comments", {
          blogEntryId: config.blogEntry.validId,
        });
        expect(response).to.be.an("object").with.property("status").eq("OK");
        expect(response)
          .to.have.property("result")
          .is.an("array")
          .length.is.greaterThan(1);
      });

      it("should fail when blogEntryId is invalid", () => {
        CodeforcesAPI.call("blogEntry.comments", {
          blogEntryId: config.blogEntry.invalidId,
        }).catch((error: AxiosError) => {
          expect(error.response?.data)
            .to.be.an("object")
            .with.property("status")
            .eq("FAILED");
        });
      });

      it("should successfully return json when blogEntryId is valid", async () => {
        const response = await CodeforcesAPI.call("blogEntry.comments", {
          blogEntryId: config.blogEntry.validId,
        });
        expect(response).to.be.an("object").with.property("status").eq("OK");
        expect(response)
          .to.have.property("result")
          .is.an("array")
          .length.is.greaterThan(1);
      });
    });
    describe("view", () => {
      it("should return error when blogEntryId is empty", () => {
        // @ts-expect-error
        CodeforcesAPI.call("blogEntry.view", {}).catch((error: AxiosError) => {
          expect(error.response?.data)
            .to.be.an("object")
            .with.property("status")
            .eq("FAILED");
        });
      });

      it("should fail when blogEntryId is invalid", () => {
        CodeforcesAPI.call("blogEntry.view", {
          blogEntryId: config.blogEntry.invalidId,
        }).catch((error: AxiosError) => {
          expect(error.response?.data)
            .to.be.an("object")
            .with.property("status")
            .eq("FAILED");
        });
      });

      it("should successfully return json", () => {
        CodeforcesAPI.call("blogEntry.view", {
          blogEntryId: config.blogEntry.validId,
        });
      });
    });
  });

  describe("#contest", () => {
    describe("hacks", () => {
      it("should return error when contestId is empty", () => {
        // @ts-expect-error
        CodeforcesAPI.call("contest.hacks", {});
      });

      it("should failed when contestID is invalid", () => {
        CodeforcesAPI.call("contest.hacks", {
          contestId: config.contest.invalidId,
        });
      });

      it("should successfully return json when contestId is valid", () => {
        CodeforcesAPI.call("contest.hacks", { contestId: 1 });
      });
    });

    describe("list", () => {
      it("should successfully return json", () => {
        CodeforcesAPI.call("contest.list", { gym: false });
      });
    });

    describe("ratingChanges", () => {
      it("should return error when contestId is empty", () => {
        // @ts-expect-error
        CodeforcesAPI.call("contest.ratingChanges", {});
      });

      it("should failed when contestId is invalid", () => {
        CodeforcesAPI.call("contest.ratingChanges", {
          contestId: config.contest.invalidId,
        });
      });

      it("should successfully return json", () => {
        CodeforcesAPI.call("contest.ratingChanges", { contestId: 1 });
      });
    });

    describe("standings", () => {
      it("should return error when contestId empty", () => {
        // @ts-expect-error
        CodeforcesAPI.call("contest.standings", {});
      });

      it("should successfully return json without handles", () => {
        CodeforcesAPI.call("contest.standings", {
          contestId: 1,
          from: 1,
          count: 1,
          showUnofficial: true,
        });
      });

      it("should successfully return json without handles and with room", () => {
        CodeforcesAPI.call("contest.standings", {
          contestId: 1,
          from: 1,
          count: 1,
          showUnofficial: true,
          room: 3,
        });
      });

      it("should successfully return json with single handles", () => {
        CodeforcesAPI.call("contest.standings", {
          contestId: 1,
          handles: "Gullesnuffs",
          from: 1,
          count: 2,
          showUnofficial: true,
        });
      });

      it("should successfully return json with array of handles", () => {
        CodeforcesAPI.call("contest.standings", {
          contestId: 1,
          handles: ["Gullesnuffs", "uwi"].join(";"),
          from: 1,
          count: 2,
          showUnofficial: true,
        });
      });
    });

    describe("status", () => {
      it("should return error when contestId empty", () => {
        // @ts-expect-error
        CodeforcesAPI.call("contest.status", {});
      });

      it("should successfully return json without handle", () => {
        CodeforcesAPI.call("contest.status", {
          contestId: 566,
          from: 1,
          count: 1,
        });
      });

      it("should successfully return json with handle", () => {
        CodeforcesAPI.call("contest.status", {
          contestId: 566,
          from: 1,
          count: 1,
          handle: "tapioca",
        });
      });
    });
  });

  describe("#problemset", () => {
    describe("problems", () => {
      it("should successfully return json without tag", () => {
        CodeforcesAPI.call("problemset.problems", {});
      });

      it("should successfully return json with single tag", () => {
        CodeforcesAPI.call("problemset.problems", { tags: "probabilities" });
      });

      it("should successfully return json with array of tags", () => {
        CodeforcesAPI.call("problemset.problems", {
          tags: ["probabilities", "two pointers"].join(";"),
        });
      });
    });

    describe("recentStatus", () => {
      it("should return error when count is empty", () => {
        // @ts-expect-error
        CodeforcesAPI.call("problemset.recentStatus", {});
      });

      it("should successfully return json", () => {
        CodeforcesAPI.call("problemset.recentStatus", { count: 2 });
      });
    });
  });

  describe("#recentActions", () => {
    it("should return error when maxCount  is empty", () => {
      // @ts-expect-error
      CodeforcesAPI.call("recentActions", {});
    });

    it("should successfully return json", () => {
      CodeforcesAPI.call("recentActions", { maxCount: 1 });
    });
  });

  describe("#user", () => {
    describe("blogEntries", () => {
      it("should return error when handle is empty", () => {
        // @ts-expect-error
        CodeforcesAPI.call("user.blogEntries", {});
      });

      it("should successfully return json", () => {
        CodeforcesAPI.call("user.blogEntries", { handle: "llgyc" });
      });
    });

    describe("friends", () => {
      it("should successfully return json with onlyOnline", async () => {
        await CodeforcesAPI.call("user.friends", {
          onlyOnline: true,
        }).catch((e) => e);
      });

      it("should successfully return json without onlyOnline", () => {
        CodeforcesAPI.call("user.friends", {});
      });
    });

    describe("info", () => {
      it("should return error when handles is empty");
    });

    it("should successfully return json when single handle passed", () => {
      CodeforcesAPI.call("user.info", { handles: "Fefer_Ivan" });
    });

    it("should successfully return json when array of handles passed", () => {
      CodeforcesAPI.call("user.info", {
        handles: ["Fefer_Ivan", "DmitriyH"].join(";"),
      });
    });
  });

  describe("rating", () => {
    it("should return error when handle is empty", () => {
      // @ts-expect-error
      CodeforcesAPI.call("user.rating", {});
    });

    it("should successfully return json", () => {
      CodeforcesAPI.call("user.rating", { handle: "Fefer_Ivan" });
    });

    describe("status", () => {
      it("should return error when handle is empty", () => {
        // @ts-expect-error
        CodeforcesAPI.call("user.status", {});
      });

      it("should successfully return json", () => {
        CodeforcesAPI.call("user.status", {
          handle: "Fefer_Ivan",
          from: 1,
          count: 2,
        });
      });
    });
  });
});
