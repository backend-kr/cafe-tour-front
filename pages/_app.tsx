import { QueryClient, QueryClientProvider } from "react-query";
import type { AppProps } from "next/app";

import AuthProvider from "../shared/contexts/Auth";
import MapLayout from "../shared/layout/MapLayout";
import MapProvider from "../shared/contexts/Map";

import "../styles/globals.css";

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MapProvider>
          <MapLayout>
            <Component {...pageProps} />
          </MapLayout>
        </MapProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
