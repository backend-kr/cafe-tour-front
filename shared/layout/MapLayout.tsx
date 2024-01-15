import { ReactNode, useContext, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import Category from "../../components/Category";
import Search from "../../components/Search";
import { CategoryContext } from "../contexts/Category";
import { useAuth } from "../contexts/Auth";

interface IMapLayout {
  children: ReactNode;
}

const MapLayout = ({ children }: IMapLayout) => {
  const router = useRouter();
  const [categoryOpen, setCategoryOpen] = useState(false);

  const { result, setState } = useContext(CategoryContext);
  const { isSign } = useAuth();

  return (
    <div className="relative">
      <header className="absolute top-0 left-0 z-20 mt-6 ml-6">
        <div className="flex items-start">
          <Search />

          <div className="ml-2 min-w-[80px]">
            <button
              onClick={() => setCategoryOpen((prev) => !prev)}
              className="bg-white h-12 w-full rounded-full shadow-[0px_0px_15px_0px_rgba(0,0,0,0.20)] font-semibold text-sm"
            >
              {(result && result.find((v) => v.isActive === true)?.name) ??
                "주변"}
            </button>
            {categoryOpen && (
              <ul className="flex flex-col py-2 bg-white mt-2 shadow-[0px_0px_15px_0px_rgba(0,0,0,0.20)] rounded-lg">
                {result?.map((category) => (
                  <li key={category.id as string}>
                    <Category
                      onClick={() => {
                        setState(category.id as string);
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
