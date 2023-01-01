# Codeforces-API-TS

Codeforces-API-TS is a NodeJS Client Library for [Codeforces API](http://codeforces.com/api/help) with Typescript support 💙

> **Note**
> Source code in this repo is highly inspired by [Ahmed Dinar's codeforces-api-node](https://github.com/ahmed-dinar/codeforces-api-node)

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

>Full description of the API can be found on : [Official API Doc](http://codeforces.com/api/help)

| Method                   | Parameters                                                   |  Description |
| -----------------------  | ------------------------------------------------------------ |:-------------------------------------------------------------------:|
| blogEntry.comments       | *blogEntryId                                                 |  [More](http://codeforces.com/api/help/methods#blogEntry.comments)  |
| blogEntry.view           | *blogEntryId                                                 |  [More](http://codeforces.com/api/help/methods#blogEntry.view)  |
| contest.hacks            | contestId                                                    |  [More](http://codeforces.com/api/help/methods#contest.hacks)  |
| contest.list             | gym                                                          |  [More](http://codeforces.com/api/help/methods#contest.list)  |
| contest.ratingChanges    | *contestId                                                   |  [More](http://codeforces.com/api/help/methods#contest.ratingChanges)  |
| contest.standings        | *contestId , from , count , handles ,  room , showUnofficial |  [More](http://codeforces.com/api/help/methods#contest.standings)  |
| contest.status           | *contestId , handle , from , count                           |  [More](http://codeforces.com/api/help/methods#contest.status)  |
| problemset.problems      | tags                                                         |  [More](http://codeforces.com/api/help/methods#problemset.problems )  |
| problemset.recentStatus  | *count                                                       |  [More](http://codeforces.com/api/help/methods#problemset.recentStatus)  |
| recentActions            | *maxCount                                                    |  [More](http://codeforces.com/api/help/methods#recentActions)  |
| user.blogEntries         | *handle                                                      |  [More](http://codeforces.com/api/help/methods#user.blogEntries)  |
| user.friends             | onlyOnline                                                   |  [More](http://codeforces.com/api/help/methods#user.friends)  |
| user.info                | *handles                                                     |  [More](http://codeforces.com/api/help/methods#user.info)  |
| user.ratedList           | activeOnly                                                   |  [More](http://codeforces.com/api/help/methods#user.ratedList)  |
| user.rating              | *handle                                                      |  [More](http://codeforces.com/api/help/methods#user.rating)  |
| user.status              | *handle , from , count                                       |  [More](http://codeforces.com/api/help/methods#user.status)  |
>*required parameters


### Authorization

The only method that requires authorization is `user.friends`. To authorize your requests you need to set your API_KEY and API_SECRET using the `setCredentials` method.

You can get your API key from [codeforces.com/settings/api](http://codeforces.com/settings/api).

### Return Data

All data return in JSON format. For full description of data format visit: [Return Objects](http://codeforces.com/api/help/objects)
