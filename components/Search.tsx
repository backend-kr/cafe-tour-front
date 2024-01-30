import Image from "next/image";
import { KeyboardEvent, MutableRefObject, RefObject } from "react";
import { isEmpty, isUndefined } from "lodash";

import { useMap } from "../shared/contexts/Map";

interface ISearch {
  handlerSearch: (search: string) => void;
  onKeyPressSearch: (e: KeyboardEvent<HTMLInputElement>) => void;
  locationList: string[];
  getMarkerData: any;
  refList: MutableRefObject<HTMLElement[]>;
  searchRef: RefObject<HTMLDivElement>;
  hasClickOutside: boolean;
  setHasClickOutside: (props: boolean) => void;
}

const Search = ({
  handlerSearch,
  onKeyPressSearch,
  locationList,
  getMarkerData,
  refList,
  searchRef,
  hasClickOutside,
  setHasClickOutside,
}: ISearch) => {
  const { searchLocation, setSearchLocation, searchCategory } = useMap();

  return (
    <div className="w-80" ref={searchRef}>
      <div className="w-full flex h-12 items-center bg-white box-border rounded-full shadow-[0px_0px_15px_0px_rgba(0,0,0,0.20)]">
        <button
          onClick={() => {
            handlerSearch(searchLocation);
          }}
          type="button"
          className="border-none bg-none px-4 shrink-0"
        >
          <Image width={24} height={24} src="svg/search.svg" alt="검색" />
        </button>
        <input
          type="search"
          onKeyDown={(e) => onKeyPressSearch(e)}
          onChange={(e) => {
            setSearchLocation(e.target.value);
            handlerSearch(e.target.value);
          }}
          value={searchLocation}
          onFocus={() => setHasClickOutside(true)}
          className="w-full outline-none mr-4 placeholder:text-neutral-300 text-base placeholder:text-sm"
          placeholder="지역 검색. 예) 서울특별시 종로구"
        />
      </div>
      {!isEmpty(locationList) && hasClickOutside && (
        <ul className="w-full bg-white mt-2 rounded-lg shadow-[0px_0px_15px_0px_rgba(0,0,0,0.20)] overflow-y-auto max-h-[120px]">
          {locationList.map((location, index) => (
            <li
              key={index}
              ref={(el) => ((refList.current as any)[index] = el)}
              className="py-4 border-b border-neutral-200 px-6 last:border-b-0"
            >
              <button
                onClick={() =>
                  getMarkerData(
                    location,
                    isUndefined(searchCategory)
                      ? "0"
                      : String(searchCategory.id)
                  )
                }
                type="button"
                className="block w-full text-left"
              >
                {location}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
