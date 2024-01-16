import { useContext, useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { isEmpty } from "lodash";

import Card from "../components/Card";
import { filters } from "../mock/filters";
import { useActive } from "../shared/hooks/useActive";
import { useAuth } from "../shared/contexts/Auth";
import { useMyTourToggle } from "../shared/hooks/useMyTourToggle";
import { CategoryContext } from "../shared/contexts/Category";
import { useMap } from "../shared/contexts/Map";
import { useMarkerList } from "../shared/queries/useMarkerList";
import { IMarkerResp } from "../shared/types";
import { useCurLocation } from "../shared/contexts/Location";
import { usePin } from "../shared/hooks/usePin";

export default function Home() {
  const router = useRouter();
  const { isSign } = useAuth();
  const mapRef = useMap();
  const { locationValue } = useCurLocation();

  const [data, setData] = useState<IMarkerResp[] | null>(null);
  const { fetchPin, resetPinList } = usePin();

  const { buttonToggle } = useMyTourToggle();
  const { currentActive } = useContext(CategoryContext);
  const { changeActive: changeFilterActive, result: filterList } = useActive(
    filters,
    true
  );

  const isAllFilter = useMemo(
    () => filterList.some((filter) => filter.isActive && filter.id === "all"),
    [filterList]
  );

  const { data: markerData, refetch: getMarkerData } = useMarkerList(
    isSign,
    String(currentActive?.id),
    locationValue
  );

  const fetchMarkerList = useCallback(async () => {
    if (mapRef.map) {
      getMarkerData();
      if (markerData) {
        fetchPin(markerData)
        setData(markerData);
      }
    }
  }, [mapRef, markerData]);

  const onClickSave = (id: string | null) => {
    if (isSign && id) {
      buttonToggle(id, data, setData);
    } else {
      void router.push("/signIn");
    }
  };

  useEffect(() => {
    if (typeof window !== undefined) {
      if (currentActive) {
        void fetchMarkerList();
      } else {
        void resetPinList();
        setData(null);
      }
    }
  }, [currentActive]);

  return (
    <>
      {!isEmpty(currentActive) && (
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
              {isAllFilter && (
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
            {!isAllFilter && (
              <h1 className="text-darkMain mt-3 text-2xl leading-tight font-semibold">
                현재 대흥동 지역에서
                <br />
                가장 인기 있는 음식점이에요!
              </h1>
            )}
          </div>
          <div className="overflow-y-auto px-8 pt-6 pb-8">
            {data?.map((item) => (
              <div key={item.cafeId} className="mb-5 last:mb-0">
                <Card data={item} onClick={() => onClickSave(item.cafeId)} />
              </div>
            ))}
          </div>
        </aside>
      )}
    </>
  );
}
