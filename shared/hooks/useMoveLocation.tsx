import { KeyboardEvent, MouseEvent, useState } from "react";

import { useMap } from "../contexts/Map";
import { locationList } from "../../mock/location";

export const useMoveLocation = () => {
  const mapRef = useMap();
  const [locationInput, setLocationInput] = useState<string>("");
  const [filterLocationList, setFilterLocationList] = useState<string[]>([]);

  const onChangeLocation = (location: string) => {
    setLocationInput(location);
  };

  const handlerFilterLocation = (
    e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>,
    location: string
  ) => {
    e.preventDefault();
    const result = locationList.filter((v) => v.includes(location));
    setFilterLocationList(result);
  };

  const goToLocation = (
    e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();

    if (mapRef.map && locationInput !== "") {
      // console.log(geo);
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
    }
  };

  return {
    onChangeLocation,
    goToLocation,
    locationInput,
    handlerFilterLocation,
    filterLocationList,
    setFilterLocationList,
  };
};
