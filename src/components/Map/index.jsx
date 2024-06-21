/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { useLocations } from '../../context/LocationsProvider';
import { useSearchParams } from 'react-router-dom';
const Map = () => {
  const { isLoading, locations } = useLocations();
  const [zoomLevel, setZoomLevel] = useState(4);
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const [position, setPosition] = useState([20, 5]);

  useEffect(() => {
    if (lat && lng) {
      setZoomLevel(8);
      setPosition([lat, lng]);
    }
    setPosition([locations[0]?.latitude, locations[0]?.longitude]);
  }, [lat, lng]);
  return (
    <MapContainer
      className="h-full"
      center={position}
      zoom={zoomLevel}
      scrollWheelZoom={true}
    >
      <ChangeCenter position={position} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
      />
      {locations?.map((item) => (
        <Marker key={item.id} position={[item?.latitude, item?.longitude]}>
          <Popup>
            <div className="flex justify-center items-center flex-col">
              {item.market}
              {item.street}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
export default Map;
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
