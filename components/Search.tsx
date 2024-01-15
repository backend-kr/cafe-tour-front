import Image from "next/image";
import { isEmpty } from "lodash";
import { Dispatch, KeyboardEvent, MouseEvent, SetStateAction } from "react";

interface ISearch {
  handlerSearch: (
    e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>,
    location: string
  ) => void;
  onKeyPressSearch: (
    e: KeyboardEvent<HTMLInputElement>,
    location: string
  ) => void;
  onChangeInput: (location: string) => void;
  searchValue: string;
  locationList: string[];
  getData: any;
}

const Search = ({
  handlerSearch,
  onKeyPressSearch,
  onChangeInput,
  searchValue,
  locationList,
  getData,
}: ISearch) => {
  return (
    <div className="w-80">
      <div className="w-full flex h-12 items-center bg-white box-border rounded-full shadow-[0px_0px_15px_0px_rgba(0,0,0,0.20)]">
        <button
          onClick={(e) => handlerSearch(e, searchValue)}
          type="button"
          className="border-none bg-none px-4 shrink-0"
        >
          <Image width={24} height={24} src="svg/search.svg" alt="검색" />
        </button>
        <input
          type="search"
          onKeyDown={(e) => onKeyPressSearch(e, searchValue)}
          onChange={(e) => onChangeInput(e.target.value)}
          value={searchValue}
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
                  getData(location);
                }}
                type="button"
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
