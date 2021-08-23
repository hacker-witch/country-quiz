import { chooseIndex } from "./chooseIndex";

export const chooseUniqueItems = <T>(array: T[], quantity: number) => {
  const chosenItems: T[] = [];

  while (chosenItems.length < quantity) {
    const index = chooseIndex(array);
    const item = array[index];
    if (!chosenItems.includes(item)) {
      chosenItems.push(item);
    }
  }

  return chosenItems;
};
