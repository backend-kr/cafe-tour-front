import { createContext } from "react";

interface ILocation {
  location: string;
}

export const LocationContext = createContext<ILocation>({
  location: "",
});
