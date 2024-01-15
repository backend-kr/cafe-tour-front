import type { AppProps } from "next/app";
import AuthProvider from "../shared/contexts/Auth";
import { CategoryContext } from "../shared/contexts/Category";
import { useActive } from "../shared/hooks/useActive";
import { categories } from "../mock/categories";
import MapLayout from "../shared/layout/MapLayout";
import MapProvider from "../shared/contexts/Map";

import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { LocationContext } from "../shared/contexts/Location";
import { useMoveLocation } from "../shared/hooks/useMoveLocation";
import { useMemo } from "react";

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  const { changeActive: changeCategoryActive, result: categoryList } =
    useActive(categories);
  const { locationInput } = useMoveLocation();

  const isCategoryActive = useMemo(
    () => categoryList?.find((v) => v.isActive),
    [categoryList]
  );

  return (
    <QueryClientProvider client={queryClient}>
      <LocationContext.Provider value={{ location: locationInput }}>
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
      </LocationContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
