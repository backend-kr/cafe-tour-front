import {
  Dispatch,
  SetStateAction,
  createContext,
  useState,
  useContext,
  useEffect,
  useRef,
  MutableRefObject,
  useMemo,
} from "react";
import { IList, useActive } from "../hooks/useActive";
import { categories } from "../../mock/categories";

interface IMap {
  mapRef: MutableRefObject<naver.maps.Map | null> | null;
  searchLocation: string;
  setSearchLocation: Dispatch<SetStateAction<string>>;
  curViewLocation: string;
  setCurViewLocation: Dispatch<SetStateAction<string>>;
  categories: IList[] | null;
  setCategories: (value: string) => void;
  searchCategory: IList | undefined;
}

interface IMapProvider {
  children: JSX.Element | JSX.Element[];
}

const MapContext = createContext<IMap>({
  mapRef: null,
  searchLocation: "",
  setSearchLocation: () => "",
  curViewLocation: "",
  setCurViewLocation: () => "",
  categories: null,
  setCategories: () => {},
  searchCategory: undefined,
});

type NaverMap = naver.maps.Map;

const MapProvider = ({ children }: IMapProvider) => {
  const [locationValue, setLocationValue] = useState<string>("");
  const mapRef = useRef<NaverMap | null>(null);
  const { changeActive: changeCategoryActive, result: categoryList } =
    useActive(categories);
  const [curViewLocation, setCurViewLocation] = useState<string>("");

  const isCategoryActive = useMemo(
    () => categoryList?.find((v) => v.isActive),
    [categoryList]
  );

  useEffect(() => {
    if (typeof window !== undefined) {
      const mapOptions = {
        center: new naver.maps.LatLng(37.3595704, 127.105399),
        zoom: 13,
      };

      const map = new naver.maps.Map("map", mapOptions);

      map.data.setStyle(function (feature) {
        var styleOptions = {
          fillColor: "#ff0000",
          fillOpacity: 0.0001,
          strokeColor: "#ff0000",
          strokeWeight: 2,
          strokeOpacity: 0.4,
        };

        if (feature.getProperty("focus")) {
          styleOptions.fillOpacity = 0.6;
          styleOptions.fillColor = "#0f0";
          styleOptions.strokeColor = "#0f0";
          styleOptions.strokeWeight = 4;
          styleOptions.strokeOpacity = 1;
        }

        return styleOptions;
      });

      mapRef.current = map;
    }
  }, []);

  return (
    <MapContext.Provider
      value={{
        mapRef: mapRef,
        searchLocation: locationValue,
        setSearchLocation: setLocationValue,
        curViewLocation: curViewLocation,
        setCurViewLocation: setCurViewLocation,
        categories: categoryList,
        setCategories: changeCategoryActive,
        searchCategory: isCategoryActive,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export default MapProvider;
export const useMap = () => useContext(MapContext);
