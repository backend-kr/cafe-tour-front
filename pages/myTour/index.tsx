import { useCallback, useState, useEffect } from "react";

import { useMap } from "../../shared/contexts/Map";
import { IMarkerResp, requestMyTourList } from "../../shared/api";
import Card from "../../components/Card";

type NaverMap = naver.maps.Map;

const MyTour = () => {
  const mapRef = useMap();

  const [data, setData] = useState<IMarkerResp[] | null>(null);
  const [marker, setMarker] = useState<naver.maps.Marker[] | null>(null);

  const fetchMyData = useCallback(async () => {
    if (mapRef.map) {
      const data = await requestMyTourList();
      let markerList: naver.maps.Marker[] = [];

      data.forEach((mark) => {
        markerList.push(
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

      setMarker(markerList);
      setData(data);
    }
  }, [mapRef]);

  useEffect(() => {
    if (typeof window !== undefined) {
      void fetchMyData();
    }
  }, []);

  return (
    <>
      <aside className="bg-white h-screen w-[420px] grid shadow-[-5px_0px_10px_0px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="pt-6 px-8 pb-4">
          <div className="flex items-center justify-between min-h-[25px]">
            <h1 className="text-darkMain text-2xl leading-tight font-semibold">
              나의 여행 목록
            </h1>
            <button className="bg-main rounded-full px-3 py-1 text-base font-semibold text-white">
              여행 경로
            </button>
          </div>
        </div>
        <div className="overflow-y-auto px-8 pt-6 pb-8">
          {data?.map((item) => (
            <div key={item.CafeId} className="mb-5 last:mb-0">
              <Card data={item} onClick={() => console.log("")} />
            </div>
          ))}
        </div>
      </aside>
    </>
  );
};

export default MyTour;
