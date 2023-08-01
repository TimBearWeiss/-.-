import style from "./string.module.css";
import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";

type TArray = {
  value: string;
  color: ElementStates;
};

export const StringComponent: React.FC = () => {
  const [input, setInput] = useState("");
  const [stringArr, setString] = useState<Array<TArray>>([]);
  const [loader, setLoader] = useState(false);
  const onChangeInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInput(evt.target.value);
  };

  const swap = (arr: string[], startPosition: number, endPosition: number) => {
    const temp = arr[startPosition];

    arr[startPosition] = arr[endPosition];
    arr[endPosition] = temp;

    return arr;
  };

  const convertString = async (arr: any) => {
    setLoader(true);
    const mid = Math.ceil(arr.length / 2);

    for (let i = 0; i < mid; i++) {
      let j = arr.length - 1 - i;

      if (i !== j) {
        arr[i].color = ElementStates.Changing;
        arr[j].color = ElementStates.Changing;
        setString([...arr]);

        await new Promise((resolve) => setTimeout(resolve, DELAY_IN_MS));
      }

      swap(arr, i, j);

      arr[i].color = ElementStates.Modified;
      arr[j].color = ElementStates.Modified;

      setString([...arr]);
    }

    setLoader(false);
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newArr = input
      .split("")
      .map((value) => ({ value, color: ElementStates.Default }));

    convertString(newArr);
  };

  return (
    <SolutionLayout title="Строка">
      <div>
        <form className={style.form} onSubmit={submit}>
          <Input
            maxLength={11}
            isLimitText={true}
            value={input}
            onChange={onChangeInput}
          />
          <Button type="submit" text="Развернуть" isLoader={loader} />
        </form>
        <div className={style.letterList}>
          {stringArr?.map((item, index) => (
            <li key={index}>
              <Circle letter={item.value} state={item.color} />
            </li>
          ))}
        </div>
      </div>
    </SolutionLayout>
  );
};
