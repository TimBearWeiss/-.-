import { ElementStates } from "../../types/element-states";

// рандомный массив
const randomInteger = (min: number, max: number) => {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

export const makeRandomArr = () => {
  const array = [];
  const length = randomInteger(3, 17);
  for (let i = 0; i < length; i++) {
    array.push({
      value: Math.round(Math.random() * 100),
      color: ElementStates.Default,
    });
  }
  return array;
};
