import { chooseIndex } from "./chooseIndex";

export const chooseUniqueItems = <T>(array: T[], quantity: number) => {
  const chosenItems: T[] = [];

  while (chosenItems.length < quantity) {
    const index = chooseIndex(array);
    const country = array[index];
    if (!chosenItems.includes(country)) {
      chosenItems.push(country);
    }
  }

  return chosenItems;
};
