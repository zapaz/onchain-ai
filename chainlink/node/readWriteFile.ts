import fs from "fs-extra";
import jsonConfig from "../config.json";
import { readConfig } from "../lib/readConfig";

type ConfigChain = typeof jsonConfig;
type ChainKey = keyof ConfigChain;
type ChainValue = ConfigChain[ChainKey];
type ChainValueKey = keyof ChainValue;

const readJavascript = (name = "OnChainAI.js"): string => {
  return fs.readFileSync(`${__dirname}/../source/${name}`, "utf-8");
};

const writeConfig = (
  chainId: number | string,
  key: ChainValueKey,
  value: string | number,
) => {
  const chainIds = Object.keys(jsonConfig);
  const chainKey = String(chainId) as ChainKey;

  if (!chainIds.includes(chainKey)) throw Error("No config for this network!");

  jsonConfig[chainKey][key] = value as never;
  fs.writeJsonSync(`${__dirname}/../config.json`, jsonConfig, { spaces: 2 });
};

export { readJavascript, readConfig, writeConfig };
