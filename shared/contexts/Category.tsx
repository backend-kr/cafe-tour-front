import { createContext } from "react";

import { IList } from "../hooks/useActive";

interface ICategory {
  result: IList[] | null;
  setState: (value: string) => void;
  currentActive: IList | undefined;
}

export const CategoryContext = createContext<ICategory>({
  result: null,
  setState: () => {},
  currentActive: undefined,
});
