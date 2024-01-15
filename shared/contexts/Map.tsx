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
    <MapContext.Provider value={{ map: mapRef }}>
      {children}
    </MapContext.Provider>
  );
};

export default MapProvider;
export const useMap = () => useContext(MapContext);
