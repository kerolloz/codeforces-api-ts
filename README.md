# Codeforces-API-TS <a target="_blank" href="https://kounter.tk"><img align="right" src="https://t.ly/EoLB" /></a>

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
import { CodeForcesAPI } from "codeforces-api-ts";

(async () => {
  CodeForcesAPI.setCredentials({
    API_KEY: "YOUR_API_KEY",
    API_SECRET: "YOUR_API_SECRET",
  });

  // all methods return a promise
  await CodeForcesAPI.blogEntry.comments({ blogEntryId: 79 });
  await CodeForcesAPI.blogEntry.view({ blogEntryId: 79 });
  await CodeForcesAPI.contest.hacks({ contestId: 566 });
  await CodeForcesAPI.contest.list();
  await CodeForcesAPI.contest.ratingChanges({ contestId: 566 });
  await CodeForcesAPI.contest.standings({ contestId: 566 });
  await CodeForcesAPI.contest.status({ contestId: 566 });
  await CodeForcesAPI.problemset.problems();
  await CodeForcesAPI.problemset.recentStatus({ count: 10 });
  await CodeForcesAPI.recentActions({ maxCount: 10 });
  await CodeForcesAPI.user.blogEntries({ handle: "kerolloz" });
  await CodeForcesAPI.user.friends(); // requires authorization
  await CodeForcesAPI.user.info({ handles: "kerolloz" });
  await CodeForcesAPI.user.ratedList();
  await CodeForcesAPI.user.rating({ handle: "kerolloz" });
  await CodeForcesAPI.user.status({ handle: "kerolloz" });
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
