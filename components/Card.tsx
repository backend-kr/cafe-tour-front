import Image from "next/image";
import { IMarkerResp } from "../shared/api";

interface ICard {
  data: IMarkerResp;
  onClick: () => void;
}

const Card = ({ data, onClick }: ICard) => {
  return (
    <article className="flex items-center w-full h-48 p-4 shadow-[0px_0px_30px_rgba(0,0,0,0.10)] box-border rounded-xl overflow-hidden">
      <div className="flex flex-col items-start w-2/3 pr-4 box-border h-full">
        <h3 className="font-semibold text-lg">{data.title}</h3>
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
            리뷰 {Number(data.review_count) >= 999 ? "999+" : data.review_count}
          </p>
        </div>
        <div className="bg-neutral-100 w-full mt-2 px-2 py-1 rounded-md">
          <h4 className="font-semibold text-sm text-main">메뉴</h4>
          <div className="overflow-hidden mt-1">
            <p className="truncate text-sm">{data.menu_info}</p>
          </div>
        </div>
        {data.save ? (
          <button
            onClick={onClick}
            className="mt-auto border border-main py-[6px] px-6 rounded-full text-main text-sm"
          >
            여행 경로에서 삭제
          </button>
        ) : (
          <button
            onClick={onClick}
            className="mt-auto bg-main py-[6px] px-6 rounded-full text-white text-sm"
          >
            여행 경로에 담기
          </button>
        )}
      </div>
      <div
        className="w-1/3 h-full bg-cover bg-no-repeat bg-center rounded-lg overflow-hidden"
        style={{ backgroundImage: `url(${data.thumUrls[0]})` }}
      ></div>
    </article>
  );
};

export default Card;
