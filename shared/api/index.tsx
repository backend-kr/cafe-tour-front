import axios from "axios";

import myData from "../../mock/myData.json";
import directions from "../../mock/directions.json";
import { IMarkerResp } from "../types";



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

export const requestMarkerList = async (
  isSign: boolean,
  category: string,
  location: string
) => {
  const data: IMarkerResp[] = (
    await axios.get(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sites/category?category=${category}&location=${location}`
    )
  ).data.data;
  let result: IMarkerResp[] = [];

  if (isSign) {
    const myList = await requestMyTourList();

    result = data.reduce((acc: IMarkerResp[], cur, index) => {
      if (myList.some((v) => cur.cafeId === v.cafeId)) {
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

  return result;
};

export const requestDirections = async () => {
  const data = await JSON.parse(JSON.stringify(directions)).routes[0];
  return data;
};
