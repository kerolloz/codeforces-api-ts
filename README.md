# Codeforces-API-TS <a target="_blank" href="https://kounter.kerolloz.dev"><img align="right" src="https://kounter.kerolloz.dev/badge/kerolloz.codeforces-api-ts?style=for-the-badge&cntSuffix=%20Views&color=555&label=" /></a>

[![npm version](https://badge.fury.io/js/codeforces-api-ts.svg)](https://www.npmjs.com/package/codeforces-api-ts)
[![npm downloads](https://img.shields.io/npm/dw/codeforces-api-ts)](https://www.npmjs.com/package/codeforces-api-ts)
![Contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)

Codeforces-API-TS is a NodeJS Client Library for [Codeforces API](http://codeforces.com/apiHelp) with Typescript support 💙

> **Note**  
> Source code in this repo is heavily inspired by [ahmed-dinar/codeforces-api-node](https://github.com/ahmed-dinar/codeforces-api-node).

## Install

```sh
npm install codeforces-api-ts
```

## Usage

```typescript
import { CodeforcesAPI } from "codeforces-api-ts";

(async () => {
  CodeforcesAPI.setCredentials({
    API_KEY: "your-api-key",
    API_SECRET: "your-api-secret",
  });

  // all methods return a promise
  await CodeforcesAPI.call("blogEntry.comments", { blogEntryId: 79 });
  await CodeforcesAPI.call("blogEntry.view", { blogEntryId: 79 });
  await CodeforcesAPI.call("contest.hacks", { contestId: 566 });
  await CodeforcesAPI.call("contest.list", {});
  await CodeforcesAPI.call("contest.ratingChanges", { contestId: 566 });
  await CodeforcesAPI.call("contest.standings", { contestId: 566 });
  await CodeforcesAPI.call("contest.status", { contestId: 566 });
  await CodeforcesAPI.call("problemset.problems", {});
  await CodeforcesAPI.call("problemset.recentStatus", { count: 10 });
  await CodeforcesAPI.call("recentActions", { maxCount: 10 });
  await CodeforcesAPI.call("user.blogEntries", { handle: "kerolloz" });
  await CodeforcesAPI.call("user.friends", {}); // requires authorization
  await CodeforcesAPI.call("user.info", { handles: "kerolloz" });
  await CodeforcesAPI.call("user.ratedList", {});
  await CodeforcesAPI.call("user.rating", { handle: "kerolloz" });
  await CodeforcesAPI.call("user.status", { handle: "kerolloz" });
})();

```

## API

The source code is well documented. I tried to make it as simple as possible and followed the same conventions as the official API. You can simply hover over the method name to see the description of the method and its parameters.

You can find function defentions and types in [src/types.ts](src/types.ts)

### Methods & Parameters

>Full description of the API can be found on <http://codeforces.com/apiHelp>.

| Method                                                                                   | Parameters                                                   |  
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| [blogEntry.comments](http://codeforces.com/apiHelp/methods#blogEntry.comments)           | **\*blogEntryId**                                            |
| [blogEntry.view](http://codeforces.com/apiHelp/methods#blogEntry.view)                   | **\*blogEntryId**                                            |
| [contest.hacks](http://codeforces.com/apiHelp/methods#contest.hacks)                     | **\*contestId**                                              |
| [contest.list](http://codeforces.com/apiHelp/methods#contest.list)                       | gym                                                          |
| [contest.ratingChanges](http://codeforces.com/apiHelp/methods#contest.ratingChanges)     | **\*contestId**                                              |
| [contest.standings](http://codeforces.com/apiHelp/methods#contest.standings)             | **\*contestId**, from, count, handles,  room, showUnofficial |
| [contest.status](http://codeforces.com/apiHelp/methods#contest.status)                   | **\*contestId**, handle, from, count                         |
| [problemset.problems](http://codeforces.com/apiHelp/methods#problemset.problems)         | tags, problemsetName                                         |
| [problemset.recentStatus](http://codeforces.com/apiHelp/methods#problemset.recentStatus) | **\*count**, problemsetName                                  |
| [recentActions](http://codeforces.com/apiHelp/methods#recentActions)                     | **\*maxCount**                                               |
| [user.blogEntries](http://codeforces.com/apiHelp/methods#user.blogEntries)               | **\*handle**                                                 |
| [user.friends](http://codeforces.com/apiHelp/methods#user.friends)                       | onlyOnline                                                   |
| [user.info](http://codeforces.com/apiHelp/methods#user.info)                             | **\*handles**                                                |
| [user.ratedList](http://codeforces.com/apiHelp/methods#user.ratedList)                   | activeOnly, includeRetired, contestId                        |
| [user.rating](http://codeforces.com/apiHelp/methods#user.rating)                         | **\*handle**                                                 |
| [user.status](http://codeforces.com/apiHelp/methods#user.status)                         | **\*handle**, from, count                                    |
>*required parameters

### Authorization

The only method that requires authorization is `user.friends`. To authorize your requests you need to set your API_KEY and API_SECRET using the `setCredentials` method.

You can get your API key from <http://codeforces.com/settings/api>.

### Return Data

Data is returned in JSON format. For full description of data format visit <http://codeforces.com/apiHelp/objects>.
