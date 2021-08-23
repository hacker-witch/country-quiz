import { chooseIndex } from "./chooseIndex";

export const chooseItem = <T>(array: T[]) => array[chooseIndex(array)];
