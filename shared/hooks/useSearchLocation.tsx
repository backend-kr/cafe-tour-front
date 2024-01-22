import { KeyboardEvent, MouseEvent, useState, useDeferredValue } from "react";
import { isEmpty } from "lodash";

import { locationList } from "../../mock/location";

export const useSearchLocation = () => {
  const [filterLocationList, setFilterLocationList] = useState<string[]>([]);
  const resultLocationList = useDeferredValue(filterLocationList);

  const handlerFilterLocation = (search: string) => {
    const result = locationList.filter((v) => v.includes(search));
    setFilterLocationList(result);
    if (search === "" || isEmpty(result)) setFilterLocationList([]);
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
    filterLocationList: resultLocationList,
    setFilterLocationList,
  };
};
