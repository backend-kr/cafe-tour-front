import { useCallback, useState } from "react";

import { useMap } from "../contexts/Map";
import { IMarkerResp } from "../types";

type NaverMap = naver.maps.Map;

export const usePin = () => {
  const mapRef = useMap();
  const [pinList, setPinList] = useState<naver.maps.Marker[] | null>(null);

  const fetchPin = (data: IMarkerResp[] | null) => {
    let pin: naver.maps.Marker[] = [];

    if (data) {
      data.forEach((mark) => {
        pin.push(
          new naver.maps.Marker({
            position: new naver.maps.LatLng(
              Number(mark.latitude),
              Number(mark.longitude)
            ),
            map: mapRef.map!.current as NaverMap,
          })
        );
      });

      const mapCenter = new naver.maps.LatLng(
        Number(data[0]?.latitude),
        Number(data[0]?.longitude)
      );
      mapRef.map!.current!.setCenter(mapCenter);

      setPinList(pin);
    }
  };

  const resetPinList = useCallback(() => {
    setPinList(null);
    pinList?.forEach((v) => {
      v.setMap(null);
    });
  }, [pinList]);

  return {
    pinList,
    setPinList,
    fetchPin,
    resetPinList,
  };
};
