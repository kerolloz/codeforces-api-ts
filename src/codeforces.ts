import crypto from "node:crypto";
import _ from "lodash";
import qs from "qs";
import type {
  CodeforcesMethod,
  CodeforcesMethodResult,
  CodeforcesMethodsParams,
} from "./types";

const sha512Hex = (data: string) =>
  crypto.createHash("sha512").update(data).digest("hex");

const AUTHORIZED_METHODS: CodeforcesMethod[] = ["user.friends"];

let credentials: { API_KEY: string; API_SECRET: string };

/**
 * Codeforces API
 */
export const CodeforcesAPI = {
  setCredentials: (value: typeof credentials) => {
    credentials = value;
  },

  call: async <T extends CodeforcesMethod>(
    method: T,
    params: CodeforcesMethodsParams[T],
  ) => {
    if (!credentials && AUTHORIZED_METHODS.includes(method)) {
      throw new Error("Credentials are not set");
    }

    const data = {
      ...params,
      apiKey: credentials?.API_KEY,
      time: Math.floor(Date.now() / 1000),
    };

    // Generate a 6 character random string
    const rand = Math.random().toString(32).substring(2, 8);
    const sortedData = _.fromPairs(_.toPairs(data).sort());
    const queryString = qs.stringify(sortedData, { encode: false });
    const payload = `${rand}/${method}?${queryString}#${credentials?.API_SECRET}`;
    const query = qs.stringify({ ...data, apiSig: rand + sha512Hex(payload) });
    const response = await fetch(
      `https://codeforces.com/api/${method}?${query}`,
    );
    return (await response.json()) as CodeforcesMethodResult<T>;
  },
};
