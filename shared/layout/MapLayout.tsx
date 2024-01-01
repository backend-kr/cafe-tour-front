import { ReactNode, useContext } from "react";

import Category from "../../components/Category";
import Search from "../../components/Search";
import { CategoryContext } from "../contexts/Category";

interface IMapLayout {
  children: ReactNode;
}

const MapLayout = ({ children }: IMapLayout) => {
  const { result, setState } = useContext(CategoryContext);

  return (
    <div className="relative">
      <header className="absolute top-0 left-0 z-20 mt-6 ml-6">
        <div className="flex items-center">
          <Search />
          <div className="inline-flex ml-2 px-6 bg-white h-12 font-semibold rounded-full items-center box-border shadow-[0px_0px_15px_0px_rgba(0,0,0,0.20)]">
            대흥동
          </div>
        </div>
        <div className="flex items-center gap-1 mt-3">
          {result?.map((category) => (
            <Category
              onClick={() => {
                setState(category.id as string);
              }}
              key={category.id as string}
              category={category}
            />
          ))}
        </div>
      </header>
      <main className="z-10">
        <div id="map" className="w-screen h-screen"></div>
      </main>
      {children}
    </div>
  );
};

export default MapLayout;
