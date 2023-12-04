import { useEffect, useRef } from "react";
import "../styles/globals.css";

type NaverMap = naver.maps.Map;

export default function Home() {
  const mapRef = useRef<NaverMap | null>(null);

  useEffect(() => {
    if (typeof window !== undefined) {
      const mapOptions = {
        center: new naver.maps.LatLng(37.3595704, 127.105399),
        zoom: 10,
      };

      const map = new naver.maps.Map("map", mapOptions);
      mapRef.current = map;
    }
  }, []);

  return (
    <main>
      <div id="map" style={{ width: "100vw", height: "100vh" }}></div>
    </main>
  );
}
