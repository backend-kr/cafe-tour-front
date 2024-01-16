import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";
import { useCallback, useState, useEffect } from "react";

import { useMap } from "../../shared/contexts/Map";
import { requestMyTourList } from "../../shared/api";
import { IMarkerResp } from "../../shared/types";
import Card from "../../components/Card";

type NaverMap = naver.maps.Map;

const MyTour = () => {
  const router = useRouter();
  const mapRef = useMap();

  const [isOpenPanel, setOpenPanel] = useState(false);
  const [data, setData] = useState<IMarkerResp[] | null>(null);
  const [marker, setMarker] = useState<naver.maps.Marker[] | null>(null);
  const [elCount, setElCount] = useState<number>(0);
  const [elArr, setAddEl] = useState<string[]>([]);

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
    <aside className="flex flex-row-reverse">
      <div className="bg-white h-screen w-[420px] shadow-[-5px_0px_10px_0px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="pt-6 px-8 pb-4">
          <div className="flex items-center justify-between min-h-[25px]">
            <h1 className="text-darkMain text-2xl leading-tight font-semibold">
              나의 여행 목록
            </h1>
            <button
              onClick={() => setOpenPanel((prev) => !prev)}
              className="bg-main rounded-full px-3 py-1 text-base font-semibold text-white"
            >
              여행 경로
            </button>
          </div>
        </div>
        <div className="overflow-y-auto px-8 pt-6 pb-8">
          {data?.map((item) => (
            <div key={item.cafeId} className="mb-5 last:mb-0">
              <Card data={item} onClick={() => console.log("")} />
            </div>
          ))}
        </div>
      </div>
      {isOpenPanel && (
        <div className="bg-white h-screen flex flex-col w-[420px] shadow-[-5px_0px_10px_0px_rgba(0,0,0,0.05)] overflow-hidden">
          <div className="pt-6 px-8 pb-4 min-h-[25px]">
            <h1 className="text-darkMain text-2xl leading-tight font-semibold">
              나의 여행 경로
            </h1>
          </div>
          <div className="overflow-y-auto px-8 pt-6 pb-8">
            <div className="space-y-3">
              <input
                type="text"
                readOnly
                className="w-full bg-neutral-100 px-4 placeholder:text-neutral-400 placeholder:text-sm py-3 cursor-pointer outline-none rounded-md"
                placeholder="출발지 선택"
              />
              {elArr.map((inputEl) => (
                <div
                  key={inputEl}
                  className="flex items-center w-full bg-neutral-100 px-4 py-3 cursor-pointer rounded-md"
                >
                  <input
                    type="text"
                    readOnly
                    className="w-full outline-none placeholder:text-neutral-400 cursor-pointer placeholder:text-sm bg-transparent"
                    placeholder="경유지 선택"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setAddEl(elArr.filter((v) => v !== inputEl));
                    }}
                  >
                    <Image
                      src="svg/minus.svg"
                      width={24}
                      height={24}
                      alt="삭제"
                    />
                  </button>
                </div>
              ))}
              <input
                type="text"
                readOnly
                className="w-full bg-neutral-100 px-4 placeholder:text-neutral-400 placeholder:text-sm py-3 cursor-pointer outline-none rounded-md"
                placeholder="도착지 선택"
              />
            </div>
            <button
              type="button"
              onClick={() => {
                setElCount(elCount + 1);
                setAddEl([...elArr, `el-${elCount}`]);
              }}
              className="border border-main rounded-full px-3 py-2 text-sm text-main mt-4"
            >
              경로 추가
            </button>
          </div>
          <div className="mt-auto px-8 py-4">
            <button
              onClick={() => {
                void router.push("/directions", undefined, { shallow: true });
              }}
              className="bg-main text-white w-full rounded-full py-3 font-semibold"
            >
              경로 계산하기
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};

export default MyTour;
