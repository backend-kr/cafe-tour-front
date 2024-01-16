import { useQuery } from "react-query";

import { requestMarkerList } from "../api";

export const useMarkerList = (
  isSign: boolean,
  category: string,
  location: string
) => {
  return useQuery({
    queryKey: ["markerList", category],
    queryFn: () => requestMarkerList(isSign, category, location),
    enabled: false,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
