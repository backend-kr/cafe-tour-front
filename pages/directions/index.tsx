import Image from "next/image";

import { useCallback, useEffect, useState } from "react";
import { requestDirections } from "../../shared/api";

const Directions = () => {
  const [summaryData, setSummaryData] = useState<any>();

  const fetchDirections = useCallback(async () => {
    const result = await requestDirections();
    setSummaryData(result.summary);
  }, []);

  useEffect(() => {
    void fetchDirections();
  }, []);

  return (
    <>
      <div className="bg-white h-2/5 w-full absolute z-20 left-0 bottom-0 shadow-[0px_0px_15px_0px_rgba(0,0,0,0.25)]">
        <button className="text-main absolute text-lg font-bold w-12 -top-4 bg-white left-1/2 -ml-6">
          ^
        </button>
        <div className="py-8 h-full flex flex-col items-center justify-center w-full">
          <div className="overflow-y-auto w-full px-60">
            <h1 className="self-start text-main text-lg font-semibold">
              최적의 여행 경로{" "}
              <span className="text-3xl">
                총 {Math.floor(summaryData?.duration / 60)}분
              </span>{" "}
              소요
            </h1>
            <ul className="grid grid-cols-[repeat(auto-fill,_minmax(25%,_auto))] relative items-center justify-between w-full mt-12 after:block after:w-[calc(100%_-_20%)] after:left-[50%] after:translate-y-[-15px] after:translate-x-[-50%] after:border-dashed after:h-1 after:border-t after:z-[-1] after:border-neutral-300 after:absolute">
              {summaryData?.ways.map((v: any, index: number) => (
                <li key={index} className="w-full flex">
                  <div className="w-full flex flex-col justify-center items-center">
                    <div className="w-20 h-20 bg-neutral-300 rounded-full flex-shrink-0"></div>
                    <p className="mt-3 text-center">{v.name}</p>
                  </div>
                  {summaryData.ways.length !== index + 1 && (
                    <div className="self-end shrink-0">
                      <Image
                        src="/svg/person-walking.svg"
                        width={24}
                        height={24}
                        alt="아이콘"
                      />
                      <span className="text-sm text-main">10분</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Directions;
