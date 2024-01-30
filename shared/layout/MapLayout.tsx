import {
  KeyboardEvent,
  ReactNode,
  useCallback,
  useState,
  useRef,
  useEffect,
} from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import _ from "lodash";

import Category from "../../components/Category";
import Search from "../../components/Search";
import { useAuth } from "../contexts/Auth";
import { useSearchLocation } from "../hooks/useSearchLocation";
import { requestMarkerList } from "../api";
import { usePin } from "../hooks/usePin";
import { useMap } from "../contexts/Map";
import { useClickOutside } from "../hooks/useClickOutside";
import { IMarkerResp } from "../types";

interface IMapLayout {
  children: ReactNode;
}

const MapLayout = ({ children }: IMapLayout) => {
  const router = useRouter();
  const refList = useRef<HTMLElement[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  const [categoryOpen, setCategoryOpen] = useState(false);
  const [listIndex, setListIndex] = useState<number>(-1);

  const { hasClickOutside, setHasClickOutside } = useClickOutside(searchRef);
  const { isSign } = useAuth();
  const { fetchPin } = usePin();
  const {
    searchLocation,
    setSearchLocation,
    categories,
    setCategories,
    searchCategory,
  } = useMap();
  const { handlerFilterLocation, filterLocationList, setFilterLocationList } =
    useSearchLocation();

  const onKeyPressSearch = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      const result = _.compact(refList.current);

      if (filterLocationList.length > 0) {
        switch (e.key) {
          case "ArrowDown":
            setListIndex(listIndex + 1);
            if (result.length === listIndex + 1) setListIndex(0);
            break;
          case "ArrowUp":
            setListIndex(listIndex - 1);
            if (listIndex <= 0) {
              setListIndex(-1);
            }
            break;

          case "Enter":
            getMarkerData(result[listIndex].textContent as string);
            setListIndex(-1);
            break;
        }
      }
    },
    [filterLocationList, listIndex, refList]
  );

  const getMarkerData = async (location: string) => {
    setFilterLocationList([]);
    setSearchLocation(location);
    setHasClickOutside(false);

    let data: IMarkerResp[] = [];

    if (_.isUndefined(searchCategory?.id)) {
      setCategories("0");
      data = await requestMarkerList(isSign, "0", location);
    } else {
      data = await requestMarkerList(
        isSign,
        String(searchCategory.id),
        location
      );
    }

    if (!_.isEmpty(data)) {
      fetchPin(data);
    }
  };

  useEffect(() => {
    const result = _.compact(refList.current);
    if (result) {
      result[listIndex]?.classList.add("bg-neutral-100");

      if (result[listIndex - 1]?.className.includes("bg-neutral-100")) {
        result[listIndex - 1]?.classList.remove("bg-neutral-100");
      }
      if (result[listIndex + 1]?.className.includes("bg-neutral-100")) {
        result[listIndex + 1]?.classList.remove("bg-neutral-100");
      }

      result[listIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [listIndex, refList]);

  return (
    <div className="relative">
      <header className="absolute top-0 left-0 z-20 mt-6 ml-6">
        <div className="flex items-start">
          <Search
            handlerSearch={handlerFilterLocation}
            onKeyPressSearch={onKeyPressSearch}
            getMarkerData={getMarkerData}
            locationList={filterLocationList}
            refList={refList}
            searchRef={searchRef}
            hasClickOutside={hasClickOutside}
            setHasClickOutside={setHasClickOutside}
          />
          <div className="ml-2 min-w-[80px]">
            <button
              onClick={() => setCategoryOpen((prev) => !prev)}
              className="bg-white h-12 w-full rounded-full shadow-[0px_0px_15px_0px_rgba(0,0,0,0.20)] font-semibold text-sm"
            >
              {(categories &&
                categories.find((v) => v.isActive === true)?.name) ??
                "주변"}
            </button>
            {categoryOpen && (
              <ul className="flex flex-col py-2 bg-white mt-2 shadow-[0px_0px_15px_0px_rgba(0,0,0,0.20)] rounded-lg">
                {categories?.map((category) => (
                  <li key={category.id as string}>
                    <Category
                      onClick={() => {
                        setCategories(category.id as string);
                        setCategoryOpen(false);
                      }}
                      category={category}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </header>
      <main className="z-10">
        <div id="map" className="w-screen h-screen"></div>
      </main>
      <div className="absolute top-0 right-0">
        <div className="flex">
          {isSign && (
            <button
              onClick={() =>
                void router.push("/myTour", undefined, { shallow: true })
              }
              className="bg-main mt-6 mr-6 w-16 h-16 rounded-full z-20 flex items-center justify-center shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)]"
            >
              <Image
                src="svg/user_pin.svg"
                width={36}
                height={36}
                alt="나의 즐겨찾기"
              />
            </button>
          )}
          {!router.asPath.includes("/directions") && <>{children}</>}
        </div>
      </div>
      {router.asPath.includes("/directions") && <>{children}</>}
    </div>
  );
};

export default MapLayout;
