import Image from "next/image";

const Search = () => {
  return (
    <div className="w-96 bg-white h-12 rounded-full flex items-center box-border shadow-[0px_0px_15px_0px_rgba(0,0,0,0.20)]">
      <button className="border-none bg-none px-4 shrink-0">
        <Image width={24} height={24} src="svg/search.svg" alt="검색" />
      </button>
      <input className="w-full outline-none mr-4 placeholder:text-neutral-300 text-base" placeholder="여행 지역을 입력해주세요." />
    </div>
  );
};

export default Search;
