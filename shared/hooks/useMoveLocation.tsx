import { KeyboardEvent, MouseEvent, useState } from "react";

import { useMap } from "../contexts/Map";
import { locationList } from "../../mock/location";
import { useCurLocation } from "../contexts/Location";

export const useMoveLocation = () => {
  const mapRef = useMap();
  const { locationValue } = useCurLocation();
  const [filterLocationList, setFilterLocationList] = useState<string[]>([]);

  const handlerFilterLocation = (
    e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    const result = locationList.filter((v) => v.includes(locationValue));
    setFilterLocationList(result);
  };

  const goToLocation = (
    e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();

    // TODO:
    // if (mapRef.map && locationValue !== "") {
      // const cur = geo.features.find((v) =>
      //   v.properties.SIG_KOR_NM.includes(locationInput)
      // );
      // if (cur) {
      //   [cur].forEach((geojson: any) => {
      //     console.log(geojson);
      //     mapRef.map?.current!.data.addGeoJson(geojson, true);
      //   });
      //   const sw = new naver.maps.LatLng(
      //     Number(cur.geometry.coordinates[0][0][1]),
      //     Number(cur.geometry.coordinates[0][0][0])
      //   );
      //   const ne = new naver.maps.LatLng(
      //     Number(
      //       cur.geometry.coordinates[0].at(
      //         cur.geometry.coordinates[0].length / 2 - 1
      //       )![1]
      //     ),
      //     Number(
      //       cur.geometry.coordinates[0].at(
      //         cur.geometry.coordinates[0].length / 2 - 1
      //       )![0]
      //     )
      //   );
      //   const move = new naver.maps.LatLngBounds(sw, ne);
      //   mapRef.map!.current!.panToBounds(move);
      // }
    // }
  };

  return {
    goToLocation,
    handlerFilterLocation,
    filterLocationList,
    setFilterLocationList,
  };
};
