import { Dispatch, SetStateAction } from "react";

import { IMarkerResp } from "../types";

export const useMyTourToggle = () => {
  const buttonToggle = (
    id: string,
    data: IMarkerResp[] | null,
    stateAction: Dispatch<SetStateAction<IMarkerResp[] | null>>
  ) => {
    stateAction(
      data?.map((v) =>
        v.cafeId === id ? { ...v, save: !v.save } : v
      ) as IMarkerResp[]
    );
  };

  return { buttonToggle };
};
