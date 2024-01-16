import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface ILocation {
  locationValue: string;
  setLocationValue: Dispatch<SetStateAction<string>>;
}

interface ILocationProvider {
  children: JSX.Element | JSX.Element[];
}

const LocationContext = createContext<ILocation>({
  locationValue: "",
  setLocationValue: () => "",
});

const LocationProvider = ({ children }: ILocationProvider) => {
  const [locationValue, setLocationValue] = useState<string>("");

  return (
    <LocationContext.Provider
      value={{
        locationValue: locationValue,
        setLocationValue: setLocationValue,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;
export const useCurLocation = () => useContext(LocationContext);
