import { QueryClient, QueryClientProvider } from "react-query";
import { useMemo } from "react";
import type { AppProps } from "next/app";

import AuthProvider from "../shared/contexts/Auth";
import { CategoryContext } from "../shared/contexts/Category";
import { useActive } from "../shared/hooks/useActive";
import { categories } from "../mock/categories";
import MapLayout from "../shared/layout/MapLayout";
import MapProvider from "../shared/contexts/Map";
import LocationProvider from "../shared/contexts/Location";

import "../styles/globals.css";

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  const { changeActive: changeCategoryActive, result: categoryList } =
    useActive(categories);

  const isCategoryActive = useMemo(
    () => categoryList?.find((v) => v.isActive),
    [categoryList]
  );

  return (
    <QueryClientProvider client={queryClient}>
      <LocationProvider>
        <CategoryContext.Provider
          value={{
            setState: changeCategoryActive,
            result: categoryList,
            currentActive: isCategoryActive,
          }}
        >
          <AuthProvider>
            <MapProvider>
              <MapLayout>
                <Component {...pageProps} />
              </MapLayout>
            </MapProvider>
          </AuthProvider>
        </CategoryContext.Provider>
      </LocationProvider>
    </QueryClientProvider>
  );
};

export default App;
