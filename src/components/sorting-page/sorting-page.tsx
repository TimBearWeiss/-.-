import style from "./sorting-page.module.css";
import React, { useState, useEffect } from "react";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";
import { Direction } from "../../types/direction";
import { makeRandomArr } from "./sorting";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

type TArray = {
  value: number;
  color: ElementStates;
};

export const SortingPage: React.FC = () => {
  const [Array, setArray] = useState<TArray[]>([]);
  const [sortWay, setSortWay] = useState("choose");

  const [isDisabledButton, setIsDisabledButton] = useState(false);
  const [isLoadAsc, setIsLoadAsc] = useState(false);
  const [isLoadDesc, setIsLoadDesc] = useState(false);

  const getNewArr = () => {
    setArray([...makeRandomArr()]);
  };

  useEffect(() => {
    getNewArr();
  }, []);

  const onChangeSortWay = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSortWay(evt.target.value);
  };

  const handleClick = (direction: Direction) => {
    if (sortWay === "bubble") {
      bubbleSort(Array, direction);
    }
    if (sortWay === "choose") {
      selectionSort(Array, direction);
    }
  };

  const bubbleSort = async (array: TArray[], direction: Direction) => {
    direction === Direction.Descending
      ? setIsLoadDesc(true)
      : setIsLoadAsc(true);
    setIsDisabledButton(true);
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        array[j].color = ElementStates.Changing;
        array[j + 1].color = ElementStates.Changing;
        setArray([...array]);
        await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
        if (direction === Direction.Descending) {
          if (array[j].value < array[j + 1].value) {
            [array[j].value, array[j + 1].value] = [
              array[j + 1].value,
              array[j].value,
            ];
          }
        } else if (direction === Direction.Ascending) {
          if (array[j].value > array[j + 1].value) {
            [array[j].value, array[j + 1].value] = [
              array[j + 1].value,
              array[j].value,
            ];
          }
        }
        array[j].color = ElementStates.Default;
      }
      array[array.length - i - 1].color = ElementStates.Modified;
    }
    setIsDisabledButton(false);
    direction === Direction.Descending
      ? setIsLoadDesc(false)
      : setIsLoadAsc(false);
  };

  const selectionSort = async (array: TArray[], direction: Direction) => {
    direction === Direction.Descending
      ? setIsLoadDesc(true)
      : setIsLoadAsc(true);
    setIsDisabledButton(true);
    for (let i = 0; i < array.length - 1; i++) {
      let ind = i;
      for (let j = i + 1; j < array.length; j++) {
        array[i].color = ElementStates.Changing;
        array[j].color = ElementStates.Changing;
        setArray([...array]);
        await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
        if (direction === Direction.Descending) {
          if (array[j].value > array[ind].value) {
            ind = j;
          }
        } else if (direction === Direction.Ascending) {
          if (array[j].value < array[ind].value) {
            ind = j;
          }
        }
        array[j].color = ElementStates.Default;
        setArray([...array]);
      }
      [array[i].value, array[ind].value] = [array[ind].value, array[i].value];
      array[i].color = ElementStates.Modified;
    }
    array[array.length - 1].color = ElementStates.Modified;
    setIsDisabledButton(false);
    direction === Direction.Descending
      ? setIsLoadDesc(false)
      : setIsLoadAsc(false);
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={style.main}>
        <form className={style.form}>
          <div className={style.radioBox}>
            <RadioInput
              label="Выбор"
              value="choose"
              checked={sortWay === "choose"}
              onChange={onChangeSortWay}
              disabled={isDisabledButton}
            />
            <RadioInput
              label="Пузырёк"
              value="bubble"
              checked={sortWay === "bubble"}
              onChange={onChangeSortWay}
              disabled={isDisabledButton}
            />
          </div>
          <div className={style.buttonBox}>
            <Button
              text="По возрастанию"
              linkedList="big"
              disabled={isLoadDesc}
              onClick={() => handleClick(Direction.Ascending)}
              isLoader={isLoadAsc}
              sorting={Direction.Ascending}
            />
            <Button
              text="По убыванию"
              linkedList="big"
              disabled={isLoadAsc}
              onClick={() => handleClick(Direction.Descending)}
              isLoader={isLoadDesc}
              sorting={Direction.Descending}
            />
          </div>
          <div className={style.separate}>
            <Button
              text="Новый массив"
              linkedList="big"
              disabled={isLoadAsc || isLoadDesc}
              onClick={getNewArr}
            />
          </div>
        </form>
        <ul className={style.columnsBox}>
          {Array.map((item, index) => (
            <li key={index}>
              <Column index={item.value} state={item.color} />
            </li>
          ))}
        </ul>
      </div>
    </SolutionLayout>
  );
};
