import {
  createContext,
  useContext,
  useEffect,
  useRef,
  MutableRefObject,
} from "react";

interface IMap {
  map: MutableRefObject<naver.maps.Map | null> | null;
}

interface IMapProvider {
  children: JSX.Element | JSX.Element[];
}

const MapContext = createContext<IMap>({
  map: null,
});

type NaverMap = naver.maps.Map;

const MapProvider = ({ children }: IMapProvider) => {
  const mapRef = useRef<NaverMap | null>(null);

  useEffect(() => {
    if (typeof window !== undefined) {
      const mapOptions = {
        center: new naver.maps.LatLng(37.3595704, 127.105399),
        zoom: 13,
      };

      const map = new naver.maps.Map("map", mapOptions);
      mapRef.current = map;
    }
  }, []);

  return (
    <MapContext.Provider value={{ map: mapRef }}>
      {children}
    </MapContext.Provider>
  );
};

export default MapProvider;
export const useMap = () => useContext(MapContext);
