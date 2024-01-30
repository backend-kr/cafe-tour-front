import { useCallback } from "react";

import { useMap } from "../contexts/Map";
import { IMarkerResp } from "../types";
import { usePin } from "../contexts/Pin";

type NaverMap = naver.maps.Map;

export const useFetchPin = () => {
  const { mapRef } = useMap();
  const { pinList, setPinList } = usePin();

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
            map: mapRef!.current as NaverMap,
          })
        );
      });

      const mapCenter = new naver.maps.LatLng(
        Number(data[0]?.latitude),
        Number(data[0]?.longitude)
      );
      mapRef!.current!.setCenter(mapCenter);

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
    fetchPin,
    resetPinList,
  };
};
