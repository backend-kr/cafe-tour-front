import type { AppProps } from "next/app";
import AuthProvider from "../shared/contexts/Auth";
import { CategoryContext } from "../shared/contexts/Category";
import { useActive } from "../shared/hooks/useActive";
import { categories } from "../mock/categories";
import MapLayout from "../shared/layout/MapLayout";
import MapProvider from "../shared/contexts/Map";

import "../styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
  const { changeActive: changeCategoryActive, result: categoryList } =
    useActive(categories);

  return (
    <CategoryContext.Provider
      value={{ setState: changeCategoryActive, result: categoryList }}
    >
      <AuthProvider>
        <MapProvider>
          <MapLayout>
            <Component {...pageProps} />
          </MapLayout>
        </MapProvider>
      </AuthProvider>
    </CategoryContext.Provider>
  );
};

export default App;
