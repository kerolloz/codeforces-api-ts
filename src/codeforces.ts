import axios from "axios";
import crypto from "crypto";
import _ from "lodash";
import qs from "qs";
import "./types";

/**
 * Main API class
 */
export abstract class CodeForcesAPI {
  private static options = {
    API_URL: "http://codeforces.com/api",
    API_KEY: "",
    API_SECRET: "",
    DEFAULT_TIMEOUT: 60000, //1 minute
  };

  /**
   *  blogEntry methods
   */
  static blogEntry = {
    /**
     * Returns a list of comments to the specified blog entry.
     * @param params
     * @returns Codeforces A list of Comment objects.
     */
    comments: (params: BlogEntryCommentsParams) =>
      this.callApi<CodeforcesBlogComment[]>("blogEntry.comments", params),

    /**
     * Returns blog entry.
     * @param params
     * @returns Returns a BlogEntry object in full version.
     */
    view: (params: BlogEntryViewParams) =>
      this.callApi<BlogEntry>("blogEntry.view", params),
  };

  /**
   * contest methods
   */
  static contest = {
    /**
     * Returns list of hacks in the specified contests. Full information about hacks is available only after some time after the contest end. During the contest user can see only own hacks.
     * @param params
     * @returns Returns a list of Hack objects.
     */
    hacks: (params: ContestHacksParams) =>
      this.callApi<Hack[]>("contest.hacks", params),

    /**
     * Returns information about all available contests.
     * @param params
     * @returns Returns a list of Contest objects. If this method is called not anonymously, then all available contests for a calling user will be returned too, including mashups and private gyms.
     */
    list: (params: ContestListParams = {}) =>
      this.callApi<Contest[]>("contest.list", params),
    /**
     * Returns rating changes after the contest.
     * @param params
     * @returns Returns a list of RatingChange objects.
     */
    ratingChanges: (params: ContestRatingChangesParams) =>
      this.callApi<RatingChange[]>("contest.ratingChanges", params),

    /**
     * Returns the description of the contest and the requested part of the standings.
     * @param params
     * @returns Returns object with three fields: "contest", "problems" and "rows". Field "contest" contains a Contest object. Field "problems" contains a list of Problem objects. Field "rows" contains a list of RanklistRow objects
     */
    standings: (params: ContestStandingsParams) =>
      this.callApi<{
        contest: Contest;
        problems: Problem[];
        rows: RanklistRow[];
      }>("contest.standings", params),

    /**
     * Returns submissions for specified contest. Optionally can return submissions of specified user.
     * @param params
     * @returns Returns a list of Submission objects, sorted in decreasing order of submission id.
     */
    status: (params: ContestStatusParams) =>
      this.callApi<Submission[]>("contest.status", params),
  };

  /**
   * problemset methods
   */
  static problemset = {
    /**
     * Returns all problems from problemset. Problems can be filtered by tags.
     * @param params
     * @returns Returns two lists. List of Problem objects and list of ProblemStatistics objects.
     */
    problems: (params: ProblemsetProblemsParams = {}) =>
      this.callApi<{
        problems: Problem[];
        problemStatistics: ProblemStatistics[];
      }>("problemset.problems", params),

    /**
     * Returns recent submissions.
     * @param params
     * @returns Returns a list of Submission objects, sorted in decreasing order of submission id.
     */
    recentStatus: (params: ProblemsetRecentStatusParams) =>
      this.callApi<Submission[]>("problemset.recentStatus", params),
  };

  /**
   * Returns recent actions.
   * @param params
   * @returns Returns a list of RecentAction objects.
   */
  static recentActions = (params: RecentActionsParams) =>
    this.callApi<RecentAction[]>("recentActions", params);

  /**
   * user methods
   */
  static user = {
    /**
     * Returns a list of all user's blog entries.
     * @param params
     * @returns A list of BlogEntry objects in short form.
     */
    blogEntries: (params: UserBlogEntriesParams) =>
      this.callApi<BlogEntry[]>("user.blogEntries", params),

    /**
     * Returns authorized user's friends. Using this method requires authorization.
     * @param params
     * @returns Returns a list of strings — users' handles.
     */
    friends: (params: UserFriendsParams = {}) =>
      this.callApi<string[]>("user.friends", params),

    /**
     * Returns information about one or several users.
     * @param params
     * @returns Returns a list of User objects for requested handles.
     */
    info: (params: UserInfoParams) => this.callApi<User[]>("user.info", params),

    /**
     * Returns the list users who have participated in at least one rated contest.
     * @param params
     * @returns Returns a list of User objects, sorted in decreasing order of rating.
     */
    ratedList: (params: UserRatedListParams = {}) =>
      this.callApi<User[]>("user.ratedList", params),

    /**
     * Returns rating history of the specified user.
     * @param params
     * @returns Returns a list of RatingChange objects for requested user.
     */
    rating: (params: UserRatingParams) =>
      this.callApi<RatingChange[]>("user.rating", params),

    /**
     * Returns submissions of specified user.
     * @param params
     * @returns Returns a list of Submission objects, sorted in decreasing order of submission id.
     */
    status: (params: UserStatusParams) =>
      this.callApi<Submission[]>("user.status", params),
  };

  static setCredentials({ API_KEY, API_SECRET }: APICreds): void {
    this.options.API_KEY = API_KEY;
    this.options.API_SECRET = API_SECRET;
  }

  /**
   * Send request to api
   *
   * @param {string} method - method of API request.
   * @param {object} parameters - API url parameters
   */
  private static async callApi<T>(
    method: string,
    parameters: any
  ): Promise<CodeforcesResponse<T>> {
    if (typeof parameters === "undefined") {
      throw new Error("undefined is not a valid parameters object.");
    }

    if (typeof parameters !== "object") {
      throw new Error("valid parameters object required.");
    }

    const opts = { ...this.options, method };

    const noApiKey =
      typeof opts.API_KEY !== "string" ||
      opts.API_KEY.length === 0 ||
      typeof opts.API_SECRET !== "string" ||
      opts.API_SECRET.length === 0;

    if (noApiKey && method == "user.friends") {
      throw new Error(
        "API key and API secret are required to call 'user.friends' method."
      );
    }

    const url = makeApiUrl(opts, parameters);

    const timeout = +(process.env.CF_TIMEOUT || opts.DEFAULT_TIMEOUT);

    return (await axios.get(url, { timeout })).data;
  }
}

/**
 * Generate API url according to CF API rules
 *
 * @param options - main class options
 * @param parameters - API url parameters [see doc]
 * @returns {string} - final url
 */
function makeApiUrl(options: any, parameters: any): string {
  let query = parameters;

  const curTime = Math.floor(Date.now() / 1000);
  // generate a 6 character random string
  const randomToken = Math.random().toString(32).substring(2, 8);

  query.time = curTime;
  query.apiKey = options.API_KEY;

  // Sort parameters according to codeforces API rules
  query = _.chain(query)
    .map((value, key) => {
      return { key, value };
    })
    .orderBy(["key", "value"], ["desc", "desc"])
    .reverse()
    .keyBy("key")
    .mapValues("value")
    .value();

  let qsFy = qs.stringify(query, { encode: false });
  let apiSig = `${randomToken}/${options.method}?${qsFy}#${options.API_SECRET}`;

  apiSig = crypto.createHash("sha512").update(apiSig).digest("hex");
  query.apiSig = randomToken + apiSig;
  qsFy = qs.stringify(query, { encode: false });

  const url = `${options.API_URL}/${options.method}?${qsFy}`;

  return url;
}
