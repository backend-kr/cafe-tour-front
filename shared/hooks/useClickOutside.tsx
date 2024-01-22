import { RefObject, useEffect, useState } from "react";

export const useClickOutside = (elRef: RefObject<HTMLDivElement>) => {
  const [hasClickOutside, setHasClickOutside] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (elRef.current && !elRef.current.contains(e.target as Node)) {
        setHasClickOutside(false);
      }
      document.addEventListener("mousedown", handleClickOutside);
    };

    return () => {
      document.addEventListener("mousedown", handleClickOutside);
    };
  }, [elRef]);

  return { hasClickOutside, setHasClickOutside };
};
