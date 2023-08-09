import React, { useRef, useEffect, useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

const Map = () => { // eslint-disable-next-line
  const mapContainerRef = useRef(null); // eslint-disable-next-line
  const [map, setMap] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);

  useEffect(() => {
    const getCurrentPosition = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCurrentPosition({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            console.error(error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    getCurrentPosition();
  }, []);

  const onLoad = (mapInstance) => {
    setMap(mapInstance);
  };

  const onUnmount = () => {
    setMap(null);
  };

  return (
    <div>
      <GoogleMap
        mapContainerStyle={{ height: "400px", width: "100%" }}
        zoom={14}
        center={currentPosition}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {currentPosition && <Marker position={currentPosition} />}
      </GoogleMap>
    </div>
  );
};

export default Map;
