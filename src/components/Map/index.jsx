/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useLocations } from '../../context/LocationsProvider';
import { useSearchParams } from 'react-router-dom';
import Slider from '../Slider';
import { FaStar } from 'react-icons/fa6';

const Map = () => {
  const { isLoading, locations } = useLocations();
  const [zoomLevel, setZoomLevel] = useState(8);
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get('lat') ?? 20;
  const lng = searchParams.get('lng') ?? 5;
  const [position, setPosition] = useState([41, -73]);
  const CustomMarker = ({ text }) => {
    const customIcon = L.divIcon({
      className: '',
      iconSize: [24, 24],
      html: `<div class="w-12 h-8 font-extrabold text-gray-800 bg-white rounded-full flex items-center justify-center shadow-md">${text}</div>`,
    });
    return customIcon;
  };

  return (
    <div className="flex-1 relative bg-gray-100 z-0">
      <MapContainer
        className="h-screen"
        center={position}
        zoom={zoomLevel}
        scrollWheelZoom={true}
      >
        <ChangeCenter position={position} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {locations?.map(({ id, listing }) => (
          <Marker
            key={id}
            icon={CustomMarker({ text: listing.price })}
            position={[
              listing?.coordinate?.latitude,
              listing?.coordinate?.longitude,
            ]}
          >
            <Popup>
              <div key={id}>
                <Slider images={listing.contextualPictures} />
                <div className="flex justify-between items-center">
                  <p className="font-extrabold">{listing.title}</p>
                  <div className="flex justify-center items-center gap-1">
                    <FaStar className="w-4 h-4" />
                    <p className="text-gray-900">
                      {listing.avgRatingLocalized ?? 0}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <p className="font-extrabold">
                    {listing.price}
                    <span className="font-normal ml-1">
                      night<strong>.</strong>
                    </span>
                  </p>
                  <p className="text-gray-700">{listing.secondaryLine}</p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
export default Map;
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
