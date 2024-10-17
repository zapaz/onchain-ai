import { createReadContract } from "wagmi-svelte";
import { createOnchainAI } from "../runes/contract.svelte";

const createOnchainAIRead = (functionName: string) => {
  const { chainId, address, abi } = $derived.by(createOnchainAI);

  let value = $state();

  const readContract = $derived.by(
    createReadContract(() => ({
      address,
      abi,
      functionName,
      chainId
    }))
  );

  $effect(() => {
    console.log("<Read $effect ~ reRead");
    value = readContract?.data;
  });

  return {
    get value() {
      return value;
    }
  };
};

export { createOnchainAIRead };
