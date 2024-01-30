import { useRouter } from "next/router";
import Image from "next/image";

import { IMarkerResp } from "../shared/types";

interface ICard {
  data: IMarkerResp;
  onClick: () => void;
}

const Card = ({ data, onClick }: ICard) => {
  const location = useRouter();

  return (
    <article className="flex w-full min-h-[192px] h-auto p-4 shadow-[0px_0px_30px_rgba(0,0,0,0.10)] box-border rounded-xl overflow-hidden">
      <div className="relative w-2/3 pr-4 box-border">
        <h3
          dangerouslySetInnerHTML={{ __html: data.title }}
          className="font-semibold text-lg"
        ></h3>
        <div className="flex items-center mt-[2px]">
          {[1, 2, 3, 4, 5].map((v) => (
            <Image
              key={v}
              src="svg/star.svg"
              alt="별점"
              width={12}
              height={12}
            />
          ))}
          <p className="ml-2 text-neutral-400 text-xs">
            리뷰 {Number(data.reviewCount) >= 999 ? "999+" : data.reviewCount}
          </p>
        </div>
        <div className="bg-neutral-100 mb-12 w-full mt-2 px-2 py-1 rounded-md">
          <h4 className="font-semibold text-sm text-main">영업시간</h4>
          <div className="overflow-hidden mt-1">
            <p className="truncate text-sm">
              {data.businessHoursStart} ~ {data.businessHoursEnd}
            </p>
          </div>
        </div>
        {data.save ? (
          <button
            onClick={onClick}
            className="absolute bottom-0 border border-main py-[6px] px-6 rounded-full text-main text-sm"
          >
            {location.asPath.includes("myTour") ? "삭제" : "여행 경로에서 삭제"}
          </button>
        ) : (
          <button
            onClick={onClick}
            className="absolute bottom-0 bg-main py-[6px] px-6 rounded-full text-white text-sm"
          >
            여행 경로에 담기
          </button>
        )}
      </div>
      <div className="w-1/3 rounded-lg overflow-hidden">
        <img
          src={data.thumbnails[0].url}
          className="w-full min-h-[160px] h-full object-cover"
          alt="가게 썸네일"
        />
      </div>
    </article>
  );
};

export default Card;
