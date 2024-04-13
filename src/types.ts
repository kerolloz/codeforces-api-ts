//  ------- PARAMS TYPES -------
// https://codeforces.com/apiHelp/methods

export type BlogEntryCommentsParams = {
  /**
   * Id of the blog entry. It can be seen in blog entry URL. For example: /blog/entry/79
   */
  blogEntryId: number;
};

export type BlogEntryViewParams = {
  /**
   * Id of the blog entry. It can be seen in blog entry URL. For example: /blog/entry/79
   */
  blogEntryId: number;
};

export type ContestHacksParams = {
  /**
   * Id of the contest.
   * It is not the round number. It can be seen in contest URL. For example: /contest/566/status
   */
  contestId: number;
};

export type ContestListParams = {
  /**
   * Boolean. If true — than gym contests are returned. Otherwide, regular contests are returned.
   */
  gym?: boolean;
};

export type ContestRatingChangesParams = {
  /**
   * Id of the contest.
   * It is not the round number. It can be seen in contest URL. For example: /contest/566/status
   */
  contestId: number;
};

export type ContestStandingsParams = {
  /**
   * Id of the contest.
   * It is not the round number. It can be seen in contest URL. For example: /contest/566/status
   */
  contestId: number;

  /**
   * 1-based index of the standings row to start the ranklist.
   */
  from?: number;

  /**
   * Number of standings rows to return.
   */
  count?: number;

  /**
   * Semicolon-separated list of handles. No more than 10000 handles is accepted.
   */
  handles?: string;

  /**
   * If specified, than only participants from this room will be shown in the result. If not — all the participants will be shown.
   */
  room?: number;

  /**
   * If true than all participants (virtual, out of competition) are shown. Otherwise, only official contestants are shown.
   */
  showUnofficial?: boolean;
};

export type ContestStatusParams = {
  /**
   * Id of the contest.
   * It is not the round number. It can be seen in contest URL. For example: /contest/566/status
   */
  contestId: number;

  /**
   * Codeforces user handle.
   */
  handle?: string;

  /**
   * 1-based index of the submission to start the page.
   */
  from?: number;

  /**
   * Number of submissions to return.
   */
  count?: number;
};

export type ProblemsetProblemsParams = {
  /**
   * Semicilon-separated list of tags.
   */
  tags?: string;

  /**
   * Custom problemset's short name, like 'acmsguru'
   */
  problemsetName?: string;
};

export type ProblemsetRecentStatusParams = {
  /**
   * Number of submissions to return. Can be up to 1000.
   */
  count: number;

  /**
   * Custom problemset's short name, like 'acmsguru'
   */
  problemsetName?: string;
};

export type RecentActionsParams = {
  /**
   * Number of recent actions to return. Can be up to 100.
   */
  maxCount: number;
};

export type UserBlogEntriesParams = {
  /**
   * Codeforces user handle.
   */
  handle: string;
};

export type UserFriendsParams = {
  /**
   * Boolean. If true — only online friends are returned. Otherwise, all friends are returned.
   */
  onlyOnline?: boolean;
};

export type UserInfoParams = {
  /**
   * Semicolon-separated list of handles. No more than 10000 handles is accepted.
   */
  handles: string;
};

export type UserRatedListParams = {
  /**
   * Boolean. If true then only users, who participated in rated contest during the last month are returned. Otherwise, all users with at least one rated contest are returned.
   */
  activeOnly?: boolean;

  /**
   * Boolean. If true, the method returns all rated users, otherwise the method returns only users, that were online at last month.
   */
  includeRetired?: boolean;

  /**
   * Id of the contest. It is not the round number. It can be seen in contest URL. For example: /contest/566/status
   */
  contestId?: number;
};

export type UserRatingParams = {
  /**
   * Codeforces user handle.
   */
  handle: string;
};

export type UserStatusParams = {
  /**
   * Codeforces user handle.
   */
  handle: string;

  /**
   * 1-based index of the first submission to return.
   */
  from?: number;

  /**
   * Number of returned submissions.
   */
  count?: number;
};

// ------- RESPONSE (Return Objects) TYPES -------
// https://codeforces.com/apiHelp/objects

/**
 * Represents a Codeforces user.
 * @field {handle}	String. Codeforces user handle.
 * @field {email}	String. Shown only if user allowed to share his contact info.
 * @field {vkId}	String. User id for VK social network. Shown only if user allowed to share his contact info.
 * @field {openId}	String. Shown only if user allowed to share his contact info.
 * @field {firstName}	String. Localized. Can be absent.
 * @field {lastName}	String. Localized. Can be absent.
 * @field {country}	String. Localized. Can be absent.
 * @field {city}	String. Localized. Can be absent.
 * @field {organization}	String. Localized. Can be absent.
 * @field {contribution}	Integer. User contribution.
 * @field {rank}	String. Localized.
 * @field {rating}	Integer.
 * @field {maxRank}	String. Localized.
 * @field {maxRating}	Integer.
 * @field {lastOnlineTimeSeconds}	Integer. Time, when user was last seen online, in unix format.
 * @field {registrationTimeSeconds}	Integer. Time, when user was registered, in unix format.
 * @field {friendOfCount}	Integer. Amount of users who have this user in friends.
 * @field {avatar}	String. User's avatar URL.
 * @field {titlePhoto}	String. User's title photo URL.
 */
export type User = {
  handle: string;
  email?: string;
  vkId?: string;
  openId?: string;
  firstName?: string;
  lastName?: string;
  country?: string;
  city?: string;
  organization?: string;
  contribution: number;
  rank: string;
  rating: number;
  maxRank: string;
  maxRating: number;
  lastOnlineTimeSeconds: number;
  registrationTimeSeconds: number;
  friendOfCount: number;
  avatar: string;
  titlePhoto: string;
};

/**
 * Represents a Codeforces blog entry. May be in either short or full version.
 * @field {id}	Integer.
 * @field {originalLocale}	String. Original locale of the blog entry.
 * @field {creationTimeSeconds}	Integer. Time, when blog entry was created, in unix format.
 * @field {authorHandle}	String. Author user handle.
 * @field {title}	String. Localized.
 * @field {content}	String. Localized. Not included in short version.
 * @field {locale}	String.
 * @field {modificationTimeSeconds}	Integer. Time, when blog entry has been updated, in unix format.
 * @field {allowViewHistory}	Boolean. If true, you can view any specific revision of the blog entry.
 * @field {tags}	String list.
 */
export type BlogEntry = {
  id: number;
  originalLocale: string;
  creationTimeSeconds: number;
  authorHandle: string;
  title: string;
  content?: string;
  locale: string;
  modificationTimeSeconds: number;
  allowViewHistory: boolean;
  tags: string[];
  rating: number;
};

/**
 * Represents a blog comment.
 * @field {id}	Integer.
 * @field {creationTimeSeconds}	Integer. Time, when comment was created, in unix format.
 * @field {commentatorHandle}	String.
 * @field {locale}	String.
 * @field {text}	String.
 * @field {parentCommentId}	Integer. Can be absent.
 * @field {rating}	Integer.
 */
export type CodeforcesBlogComment = {
  id: number;
  creationTimeSeconds: number;
  commentatorHandle: string;
  locale: string;
  text: string;
  parentCommentId?: number;
  rating: number;
};

/**
 * Represents a recent action.

  * @field {timeSeconds}	Integer. Action time, in unix format.
  * @field {blogEntry}	BlogEntry object in short form. Can be absent.
  * @field {comment}	CodeforcesBlogComment object. Can be absent.
  */
export type RecentAction = {
  timeSeconds: number;
  blogEntry?: BlogEntry;
  comment?: CodeforcesBlogComment;
};

/**
 * RatingChange object.
 * Represents a participation of user in rated contest.
 * @field {contestId}	Integer.
 * @field {contestName}	String. Localized.
 * @field {handle}	String. Codeforces user handle.
 * @field {rank}	Integer. Place of the user in the contest. This field contains user rank on the moment of rating update. If afterwards rank changes (e.g. someone get disqualified), this field will not be update and will contain old rank.
 * @field {ratingUpdateTimeSeconds}	Integer. Time, when rating for the contest was update, in unix-format.
 * @field {oldRating}	Integer. User rating before the contest.
 * @field {newRating}	Integer. User rating after the contest.
 */
export type RatingChange = {
  contestId: number;
  contestName: string;
  handle: string;
  rank: number;
  ratingUpdateTimeSeconds: number;
  oldRating: number;
  newRating: number;
};

/**
 *  Contest
 * Represents a contest on Codeforces.
 * @field {id}	Integer.
 * @field {name}	String. Localized.
 * @field {type}	Enum: CF, IOI, ICPC. Scoring system used for the contest.
 * @field {phase}	Enum: BEFORE, CODING, PENDING_SYSTEM_TEST, SYSTEM_TEST, FINISHED.
 * @field {frozen}	Boolean. If true, then the ranklist for the contest is frozen and shows only submissions, created before freeze.
 * @field {durationSeconds}	Integer. Duration of the contest in seconds.
 * @field {startTimeSeconds}	Integer. Can be absent. Contest start time in unix format.
 * @field {relativeTimeSeconds}	Integer. Can be absent. Number of seconds, passed after the start of the contest. Can be negative.
 * @field {preparedBy}	String. Can be absent. Handle of the user, how created the contest.
 * @field {websiteUrl}	String. Can be absent. URL for contest-related website.
 * @field {description}	String. Localized. Can be absent.
 * @field {difficulty}	Integer. Can be absent. From 1 to 5. Larger number means more difficult problems.
 * @field {kind}	String. Localized. Can be absent. Human-readable type of the contest from the following categories: Official ICPC Contest, Official School Contest, Opencup Contest, School/University/City/Region Championship, Training Camp Contest, Official International Personal Contest, Training Contest.
 * @field {icpcRegion}	String. Localized. Can be absent. Name of the Region for official ICPC contests.
 * @field {country}	String. Localized. Can be absent.
 * @field {city}	String. Localized. Can be absent.
 * @field {season}	String. Can be absent.
 */
export type Contest = {
  id: number;
  name: string;
  type: "CF" | "IOI" | "ICPC";
  phase:
  | "BEFORE"
  | "CODING"
  | "PENDING_SYSTEM_TEST"
  | "SYSTEM_TEST"
  | "FINISHED";
  frozen: boolean;
  durationSeconds: number;
  startTimeSeconds?: number;
  relativeTimeSeconds?: number;
  preparedBy?: string;
  websiteUrl?: string;
  description?: string;
  difficulty?: number;
  kind?: string;
  icpcRegion?: string;
  country?: string;
  city?: string;
  season?: string;
};

/**
 * Represents a party, participating in a contest.
 * @field {contestId}	Integer. Can be absent. Id of the contest, in which party is participating.
 * @field {members}	List of Member objects. Members of the party.
 * @field {participantType}	Enum: CONTESTANT, PRACTICE, VIRTUAL, MANAGER, OUT_OF_COMPETITION.
 * @field {teamId}	Integer. Can be absent. If party is a team, then it is a unique team id. Otherwise, this field is absent.
 * @field {teamName}	String. Localized. Can be absent. If party is a team or ghost, then it is a localized name of the team. Otherwise, it is absent.
 * @field {ghost}	Boolean. If true then this party is a ghost. It participated in the contest, but not on Codeforces. For example, Andrew Stankevich Contests in Gym has ghosts of the participants from Petrozavodsk Training Camp.
 * @field {room}	Integer. Can be absent. Room of the party. If absent, then the party has no room.
 * @field {startTimeSeconds}	Integer. Can be absent. Time, when this party started a contest.
 */
export type Party = {
  contestId?: number;
  members: Member[];
  participantType:
  | "CONTESTANT"
  | "PRACTICE"
  | "VIRTUAL"
  | "MANAGER"
  | "OUT_OF_COMPETITION";
  teamId?: number;
  teamName?: string;
  ghost: boolean;
  room?: number;
  startTimeSeconds?: number;
};

/**
 * Represents a member of a party.
 * @field {handle}	String. Codeforces user handle.
 * @field {name}	String. Can be absent. User's name if available.
 */
export type Member = {
  handle: string;
  name?: string;
};

/**
 * Represents a problem.
 * @field {contestId}	Integer. Can be absent. Id of the contest, containing the problem.
 * @field {problemsetName}	String. Can be absent. Short name of the problemset the problem belongs to.
 * @field {index}	String. Usually, a letter or letter with digit(s) indicating the problem index in a contest.
 * @field {name}	String. Localized.
 * @field {type}	Enum: PROGRAMMING, QUESTION.
 * @field {points}	Floating point number. Can be absent. Maximum amount of points for the problem.
 * @field {rating}	Integer. Can be absent. Problem rating (difficulty).
 * @field {tags}	String list. Problem tags.
 */
export type Problem = {
  contestId?: number;
  problemsetName?: string;
  index: string;
  name: string;
  type: "PROGRAMMING" | "QUESTION";
  points?: number;
  rating?: number;
  tags: string[];
};

/**
 * Represents a statistic data about a problem.
 * @field {contestId}	Integer. Can be absent. Id of the contest, containing the problem.
 * @field {index}	String. Usually, a letter or letter with digit(s) indicating the problem index in a contest.
 * @field {solvedCount}	Integer. Number of users, who solved the problem.
 */
export type ProblemStatistics = {
  contestId?: number;
  index: string;
  solvedCount: number;
};

/**
 * Represents a submission.
 * @file {id}	Integer.
 * @file {contestId}	Integer. Can be absent.
 * @file {creationTimeSeconds}	Integer. Time, when submission was created, in unix-format.
 * @file {relativeTimeSeconds}	Integer. Number of seconds, passed after the start of the contest (or a virtual start for virtual parties), before the submission.
 * @file {problem}	Problem object.
 * @file {author}	Party object.
 * @file {programmingLanguage}	String.
 * @file {verdict}	Enum: FAILED, OK, PARTIAL, COMPILATION_ERROR, RUNTIME_ERROR, WRONG_ANSWER, PRESENTATION_ERROR, TIME_LIMIT_EXCEEDED, MEMORY_LIMIT_EXCEEDED, IDLENESS_LIMIT_EXCEEDED, SECURITY_VIOLATED, CRASHED, INPUT_PREPARATION_CRASHED, CHALLENGED, SKIPPED, TESTING, REJECTED. Can be absent.
 * @file {testset}	Enum: SAMPLES, PRETESTS, TESTS, CHALLENGES, TESTS1, ..., TESTS10. Testset used for judging the submission.
 * @file {passedTestCount}	Integer. Number of passed tests.
 * @file {timeConsumedMillis}	Integer. Maximum time in milliseconds, consumed by solution for one test.
 * @file {memoryConsumedBytes}	Integer. Maximum memory in bytes, consumed by solution for one test.
 * @file {points}	Floating point number. Can be absent. Number of scored points for IOI-like contests.
 */
export type Submission = {
  id: number;
  contestId?: number;
  creationTimeSeconds: number;
  relativeTimeSeconds: number;
  problem: Problem;
  author: Party;
  programmingLanguage: string;
  verdict?:
  | "FAILED"
  | "OK"
  | "PARTIAL"
  | "COMPILATION_ERROR"
  | "RUNTIME_ERROR"
  | "WRONG_ANSWER"
  | "PRESENTATION_ERROR"
  | "TIME_LIMIT_EXCEEDED"
  | "MEMORY_LIMIT_EXCEEDED"
  | "IDLENESS_LIMIT_EXCEEDED"
  | "SECURITY_VIOLATED"
  | "CRASHED"
  | "INPUT_PREPARATION_CRASHED"
  | "CHALLENGED"
  | "SKIPPED"
  | "TESTING"
  | "REJECTED";
  testset:
  | "SAMPLES"
  | "PRETESTS"
  | "TESTS"
  | "CHALLENGES"
  | "TESTS1"
  | "TESTS2"
  | "TESTS3"
  | "TESTS4"
  | "TESTS5"
  | "TESTS6"
  | "TESTS7"
  | "TESTS8"
  | "TESTS9"
  | "TESTS10";
  passedTestCount: number;
  timeConsumedMillis: number;
  memoryConsumedBytes: number;
  points?: number;
};

/**
 * Represents a hack, made during Codeforces Round.
 * @field {id}	Integer.
 * @field {creationTimeSeconds}	Integer. Hack creation time in unix format.
 * @field {hacker}	Party object.
 * @field {defender}	Party object.
 * @field {verdict}	Enum: HACK_SUCCESSFUL, HACK_UNSUCCESSFUL, INVALID_INPUT, GENERATOR_INCOMPILABLE, GENERATOR_CRASHED, IGNORED, TESTING, OTHER. Can be absent.
 * @field {problem}	Problem object. Hacked problem.
 * @field {test}	String. Can be absent.
 * @field {judgeProtocol}	Object with three fields: "manual", "protocol" and "verdict". Field manual can have values "true" and "false". If manual is "true" then test for the hack was entered manually. Fields "protocol" and "verdict" contain human-readable description of judge protocol and hack verdict. Localized. Can be absent.
 */
export type Hack = {
  id: number;
  creationTimeSeconds: number;
  hacker: Party;
  defender: Party;
  verdict?:
  | "HACK_SUCCESSFUL"
  | "HACK_UNSUCCESSFUL"
  | "INVALID_INPUT"
  | "GENERATOR_INCOMPILABLE"
  | "GENERATOR_CRASHED"
  | "IGNORED"
  | "TESTING"
  | "OTHER";
  problem: Problem;
  test?: string;
  judgeProtocol?: {
    manual: "true" | "false";
    protocol?: string;
    verdict?: string;
  };
};

/**
 * Represents a ranklist row.
 * @field {party}	Party object. Party that took a corresponding place in the contest.
 * @field {rank}	Integer. Party place in the contest.
 * @field {points}	Floating point number. Total amount of points, scored by the party.
 * @field {penalty}	Integer. Total penalty (in ICPC meaning) of the party.
 * @field {successfulHackCount}	Integer.
 * @field {unsuccessfulHackCount}	Integer.
 * @field {problemResults}	List of ProblemResult objects. Party results for each problem. Order of the problems is the same as in "problems" field of the returned object.
 * @field {lastSubmissionTimeSeconds}	Integer. For IOI contests only. Time in seconds from the start of the contest to the last submission that added some points to the total score of the party. Can be absent.
 */
export type RanklistRow = {
  party: Party;
  rank: number;
  points: number;
  penalty: number;
  successfulHackCount: number;
  unsuccessfulHackCount: number;
  problemResults: ProblemResult[];
  lastSubmissionTimeSeconds?: number;
};

/**
 * Represents a submissions results of a party for a problem.
 * @field {points}	Floating point number.
 * @field {penalty}	Integer. Penalty (in ICPC meaning) of the party for this problem. Can be absent.
 * @field {rejectedAttemptCount}	Integer. Number of incorrect submissions.
 * @field {type}	Enum: PRELIMINARY, FINAL. If type is PRELIMINARY then points can decrease (if, for example, solution will fail during system test). Otherwise, party can only increase points for this problem by submitting better solutions.
 * @field {bestSubmissionTimeSeconds}	Integer. Number of seconds after the start of the contest before the submission, that brought maximal amount of points for this problem. Can be absent.
 */
export type ProblemResult = {
  points: number;
  penalty?: number;
  rejectedAttemptCount: number;
  type: "PRELIMINARY" | "FINAL";
  bestSubmissionTimeSeconds?: number;
};

// ------ CODEFORCES API RESPONSE TYPES ------

export type CodeforcesResponse<T> = { status: "OK"; result: T } | { status: "FAILED", comment: string };

// ------ Custom types ------

export type APICreds = {
  API_KEY: string;
  API_SECRET: string;
};
