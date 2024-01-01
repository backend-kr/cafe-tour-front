import { Dispatch, SetStateAction } from "react";
import { IMarkerResp } from "../api";

export const useMyTourToggle = () => {
  const buttonToggle = (
    id: string,
    data: IMarkerResp[] | null,
    stateAction: Dispatch<SetStateAction<IMarkerResp[] | null>>
  ) => {
    stateAction(
      data?.map((v) =>
        v.CafeId === id ? { ...v, save: !v.save } : v
      ) as IMarkerResp[]
    );
  };

  return { buttonToggle };
};
