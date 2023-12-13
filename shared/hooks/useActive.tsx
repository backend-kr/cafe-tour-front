import { useState } from "react";

export interface IList {
  [key: string]: string | number | boolean;
}

export const useActive = (list: IList[], isRequired: boolean = false) => {
  const [result, setResult] = useState<IList[]>(list);

  const changeActive = (id: string) => {
    const isActive = result.map((item) =>
      item.id === id
        ? { ...item, isActive: isRequired ? true : !item.isActive }
        : { ...item, isActive: false }
    );
    setResult(isActive);
  };

  return { changeActive, result };
};
