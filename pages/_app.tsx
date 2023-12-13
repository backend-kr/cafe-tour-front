import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

import Search from "../components/Search";
import { categories } from "../mock/categories";
import Category from "../components/Category";
import Card from "../components/Card";
import { IMarkerResp, requestMarkerList } from "../shared/api";
import { filters } from "../mock/filters";
import { useActive } from "../shared/hooks/useActive";

import "../styles/globals.css";

type NaverMap = naver.maps.Map;

export default function Home() {
  const mapRef = useRef<NaverMap | null>(null);
  const [data, setData] = useState<IMarkerResp[]>();

  const { changeActive: changeFilterActive, result: filterList } = useActive(
    filters,
    true
  );
  const { changeActive: changeCategoryActive, result: categoryList } =
    useActive(categories);

  const isAllFilter = useMemo(
    () => filterList.find((filter) => filter.isActive)?.id,
    [filterList]
  );

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
          <div className="inline-flex ml-2 px-6 bg-white h-12 font-semibold rounded-full items-center box-border shadow-[0px_0px_15px_0px_rgba(0,0,0,0.20)]">
            대흥동
          </div>
        </div>
        <div className="flex items-center gap-1 mt-3">
          {categoryList.map((category) => (
            <Category
              onClick={() => {
                changeCategoryActive(category.id as string);
              }}
              key={category.id as string}
              category={category}
            />
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
            <div className="pt-6 px-8 pb-4">
              <div className="flex items-center justify-between min-h-[25px]">
                <div className="flex items-center gap-1">
                  {filterList.map((filter) => (
                    <button
                      onClick={() => changeFilterActive(filter.id as string)}
                      key={filter.id as string}
                      className={`text-neutral-400 bg-neutral-200 border text-xs font-medium rounded-full w-[80px] py-[2px] ${
                        filter.isActive
                          ? "border-neutral-400"
                          : "border-transparent"
                      }`}
                    >
                      {filter.name}
                    </button>
                  ))}
                </div>
                {isAllFilter === "all" && (
                  <div className="flex items-center gap-3">
                    <button className="text-sm text-neutral-400 hover:text-neutral-800">
                      &#60;
                    </button>
                    {[1, 2, 3, 4, 5].map((num, index) => (
                      <button
                        key={index}
                        className="text-sm text-neutral-400 hover:text-neutral-800"
                      >
                        {num}
                      </button>
                    ))}
                    <button className="text-sm text-neutral-400 hover:text-neutral-800">
                      &#62;
                    </button>
                  </div>
                )}
              </div>
              <h1 className="text-darkMain mt-3 text-2xl leading-tight font-semibold">
                현재 대흥동 지역에서
                <br />
                가장 인기 있는 음식점이에요!
              </h1>
            </div>
            <div className="overflow-y-auto px-8 pt-6 pb-8">
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
