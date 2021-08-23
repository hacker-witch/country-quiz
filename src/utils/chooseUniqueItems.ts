import { chooseItem } from "./chooseItem";

export const chooseUniqueItems = <T>(array: T[], quantity: number) => {
  const chosenItems: T[] = [];

  while (chosenItems.length < quantity) {
    const item = chooseItem(array);
    if (!chosenItems.includes(item)) {
      chosenItems.push(item);
    }
  }

  return chosenItems;
};
