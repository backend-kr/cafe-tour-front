import marker from "../../mock/marker.json";

export interface IMarkerResp {
  CafeId: string;
  menu_info: string;
  tel: string;
  thumUrls: string[];
  title: string;
  review_count: string;
  place_review_count: string;
  address: string;
  road_address: string;
  business_hours: string;
  latitude: string;
  longitude: string;
  home_page: string;
}

export const requestMarkerList = async () => {
  const data: IMarkerResp[] = await JSON.parse(JSON.stringify(marker)).result;
  return data.slice(0, 20);
};
