import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Search from "../components/Search";
import { categories } from "../mock/categories";

import Category from "../components/Category";

import "../styles/globals.css";
import Card from "../components/Card";
import { IMarkerResp, requestMarkerList } from "../shared/api";

type NaverMap = naver.maps.Map;

export default function Home() {
  const mapRef = useRef<NaverMap | null>(null);
  const [data, setData] = useState<IMarkerResp[]>();

  const fetchMarkerList = useCallback(async () => {
    const data = await requestMarkerList();
    setData(data);
  }, []);

  useEffect(() => {
    if (typeof window !== undefined) {
      const mapOptions = {
        center: new naver.maps.LatLng(37.3595704, 127.105399),
        zoom: 10,
      };

      const map = new naver.maps.Map("map", mapOptions);
      mapRef.current = map;
    }
  }, []);

  useEffect(() => {
    if (typeof window !== undefined) {
      void fetchMarkerList();
    }
  }, [fetchMarkerList]);

  return (
    <div className="relative">
      <header className="absolute top-0 left-0 z-10 mt-6 ml-6">
        <div className="flex items-center">
          <Search />
          <div className="inline-flex ml-2 px-6 bg-white h-12 font-semibold rounded-full items-center box-border text-lg shadow-[0px_0px_15px_0px_rgba(0,0,0,0.20)]">
            대흥동
          </div>
        </div>
        <div className="flex items-center gap-1 mt-3">
          {categories.map((category) => (
            <Category key={category.id} category={category} />
          ))}
        </div>
      </header>
      <main>
        <div id="map" className="w-screen h-screen"></div>
      </main>
      <div className="absolute top-0 right-0">
        <div className="flex">
          <button className="bg-main mt-6 mr-6 w-16 h-16 rounded-full flex items-center justify-center shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)]">
            <Image
              src="svg/user_pin.svg"
              width={36}
              height={36}
              alt="나의 즐겨찾기"
            />
          </button>
          <aside className="bg-white h-screen w-[420px] grid shadow-[-5px_0px_10px_0px_rgba(0,0,0,0.05)] overflow-hidden">
            <div className="pt-11 px-8 pb-4">
              <h1 className="text-darkMain text-2xl leading-tight font-semibold">
                현재 대흥동 지역에서
                <br />
                가장 인기 있는 음식점이에요!
              </h1>
            </div>
            <div className="overflow-y-auto px-8 pt-4 pb-8">
              {data?.map((item) => (
                <div key={item.CafeId} className="mb-5 last:mb-0">
                  <Card data={item} />
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
