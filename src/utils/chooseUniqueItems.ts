import { chooseIndex } from "./chooseIndex";

export const chooseUniqueItems = (array: any[], quantity: number) => {
  const chosenItems: any[] = [];

  while (chosenItems.length < quantity) {
    const index = chooseIndex(array);
    const country = array[index];
    if (!chosenItems.includes(country)) {
      chosenItems.push(country);
    }
  }

  return chosenItems;
};
