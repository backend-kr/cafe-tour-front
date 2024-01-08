import axios from "axios";
import marker from "../../mock/marker.json";
import myData from "../../mock/myData.json";
import directions from "../../mock/directions.json";

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
  save?: boolean;
}

export const requestMyTourList = async () => {
  const result: IMarkerResp[] = await JSON.parse(JSON.stringify(myData)).result;
  return result.reduce((acc: IMarkerResp[], cur, index) => {
    acc[index] = {
      ...cur,
      save: true,
    };
    return acc;
  }, []);
};

export const requestMarkerList = async (isSign: boolean) => {
  const data: IMarkerResp[] = await JSON.parse(JSON.stringify(marker)).result;
  // const data: IMarkerResp[] = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/sites/category?category=0`);
  let result: IMarkerResp[] = [];

  // console.log(data)

  if (isSign) {
    const myList = await requestMyTourList();

    result = data.reduce((acc: IMarkerResp[], cur, index) => {
      if (myList.some((v) => cur.CafeId === v.CafeId)) {
        acc[index] = {
          ...cur,
          save: true,
        };
      } else {
        acc[index] = {
          ...cur,
          save: false,
        };
      }
      return acc;
    }, []);
  } else {
    result = data;
  }

  return result?.slice(0, 20);
};

export const requestDirections = async () => {
  const data = await JSON.parse(JSON.stringify(directions)).routes[0];
  return data;
};
