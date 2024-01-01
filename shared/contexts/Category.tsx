import { createContext, Dispatch, SetStateAction } from "react";
import { IList } from "../hooks/useActive";

interface ICategory {
  result: IList[] | null;
  setState: (value: string) => void;
}

export const CategoryContext = createContext<ICategory>({
  result: null,
  setState: () => {},
});
