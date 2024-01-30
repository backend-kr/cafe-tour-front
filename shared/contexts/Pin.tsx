import {
  Dispatch,
  SetStateAction,
  createContext,
  useState,
  useContext,
} from "react";

import { IMarkerResp } from "../types";

interface IPin {
  pinList: naver.maps.Marker[] | null;
  setPinList: Dispatch<SetStateAction<naver.maps.Marker[] | null>>;
  cards: IMarkerResp[] | null;
  setCards: Dispatch<SetStateAction<IMarkerResp[] | null>>;
}

interface IPinProvider {
  children: JSX.Element | JSX.Element[];
}

const PinContext = createContext<IPin>({
  pinList: null,
  setPinList: () => [],
  cards: null,
  setCards: () => [],
});

const PinProvider = ({ children }: IPinProvider) => {
  const [pinList, setPinList] = useState<naver.maps.Marker[] | null>(null);
  const [cards, setCards] = useState<IMarkerResp[] | null>(null);

  return (
    <PinContext.Provider
      value={{
        pinList,
        setPinList,
        cards,
        setCards,
      }}
    >
      {children}
    </PinContext.Provider>
  );
};

export default PinProvider;
export const usePin = () => useContext(PinContext);
