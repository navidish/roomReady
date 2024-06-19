/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
const Map = () => {
  const [position, setPosition] = useState([35.7219, 51.3347]);
  return (
    <MapContainer
      className="h-full"
      center={position}
      zoom={13}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          <div className='flex justify-center items-center flex-col'>
          <p className="text-primary-600">hi shasan</p>
          <button className=' rounded border bg-primary-600  text-white font-bold p-1'>save</button>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};
export default Map;
