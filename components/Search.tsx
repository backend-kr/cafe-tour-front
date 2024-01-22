import { KeyboardEvent, MouseEvent } from "react";
import Image from "next/image";
import { isEmpty } from "lodash";
import { useMap } from "../shared/contexts/Map";

interface ISearch {
  handlerSearch: (
    e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>
  ) => void;
  onKeyPressSearch: (e: KeyboardEvent<HTMLInputElement>) => void;
  locationList: string[];
  getMarkerData: any;
}

const Search = ({
  handlerSearch,
  onKeyPressSearch,
  locationList,
  getMarkerData,
}: ISearch) => {
  const { searchLocation, setSearchLocation } = useMap();

  return (
    <div className="w-80">
      <div className="w-full flex h-12 items-center bg-white box-border rounded-full shadow-[0px_0px_15px_0px_rgba(0,0,0,0.20)]">
        <button
          onClick={(e) => handlerSearch(e)}
          type="button"
          className="border-none bg-none px-4 shrink-0"
        >
          <Image width={24} height={24} src="svg/search.svg" alt="검색" />
        </button>
        <input
          type="search"
          onKeyDown={(e) => onKeyPressSearch(e)}
          onChange={(e) => setSearchLocation(e.target.value)}
          value={searchLocation}
          className="w-full outline-none mr-4 placeholder:text-neutral-300 text-base placeholder:text-sm"
          placeholder="지역 검색. 예) 서울특별시 종로구"
        />
      </div>
      {!isEmpty(locationList) && (
        <ul className="w-full bg-white mt-2 rounded-lg shadow-[0px_0px_15px_0px_rgba(0,0,0,0.20)] overflow-y-auto max-h-[120px] px-4 py-2">
          {locationList.map((location, index) => (
            <li
              key={index}
              className="py-3 border-b border-neutral-200 px-2 last:border-b-0"
            >
              <button
                onClick={() => {
                  getMarkerData(location);
                }}
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
