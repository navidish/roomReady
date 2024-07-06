/* eslint-disable no-unused-vars */
import { useParams } from 'react-router';
import { useLocations } from '../../context/LocationsProvider';
import { useEffect } from 'react';
import { IoShareOutline } from 'react-icons/io5';
import { IoHeartOutline } from 'react-icons/io5';
import LeftSign from '../../../assets/leftSign.png';
import RightSign from '../../../assets/RightSign.png';
import { FaStar } from 'react-icons/fa6';
import { TiHome } from 'react-icons/ti';

import { MapContainer, Marker, TileLayer } from 'react-leaflet';
const Location = () => {
  const { id } = useParams();
  const { getLocation, isLoadingCurrLocation, currentLocation } =
    useLocations();
  const { listing, detail } = currentLocation;
  console.log('currentLocation', currentLocation);
  useEffect(() => {
    getLocation(id);
  }, [id]);
  return (
    <>
      {!!listing && (
        <div>
          <div>
            <div className="flex justify-between items-center mt-8">
              <h1 className="font-bold text-gray-800 text-4xl">
                {listing?.name}
              </h1>

              <div className="flex justify-between items-center gap-4">
                <div className="flex justify-center items-center gap-2">
                  <IoShareOutline className="icon" /> <span>share</span>
                </div>
                <div className="flex justify-center items-center gap-2">
                  <IoHeartOutline className="icon" /> <span>save</span>
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-2">
              <img
                className="col-span-2 rounded-tl-2xl rounded-bl-2xl h-80 w-full"
                src={listing?.contextualPictures[0]?.picture}
              />
              <div className="flex flex-col gap-2">
                <img
                  className="  h-40 "
                  src={listing?.contextualPictures[1]?.picture}
                />
                <img
                  className="  h-40 "
                  src={listing?.contextualPictures[2]?.picture}
                />
              </div>
              <div className="flex flex-col gap-2">
                <img
                  className="rounded-tr-2xl  h-40 "
                  src={listing?.contextualPictures[3]?.picture}
                />
                <img
                  className="rounded-br-2xl  h-40 "
                  src={listing?.contextualPictures[4]?.picture}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 mt-8 ">
            <div className="col-span-2 pr-5">
              <h2 className="font-semibold text-[22px] text-gray-800">
                Entire Home in {listing.title},united state
              </h2>
              <p className="text-gray-600 text-lg mb-4">
                {listing?.overViewData}
              </p>

              <div className="flex justify-between border p-4 mt-4 w-4/5 border-gray-300 rounded-2xl">
                <img src={LeftSign} />
                <div className=" font-semibold">
                  <p>Guest</p> <p>favorite</p>
                </div>
                <img src={RightSign} />
                <div>
                  <p>one of the most loved homes on </p>
                  <p>airbnb,according by guest</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <p>rating</p>
                  <div className="flex">
                    <FaStar className="w-4 h-4" />
                    <FaStar className="w-4 h-4" />
                    <FaStar className="w-4 h-4" />
                    <FaStar className="w-4 h-4" />
                    <FaStar className="w-4 h-4" />
                  </div>
                </div>
                <div className="w-1 h-8 my-auto mx-1 bg-gray-700 border-0 rounded-full "></div>
                <div className="flex flex-col justify-center items-center">
                  <p>25</p>
                  <p>review</p>
                </div>
              </div>
              {detail?.highlights.map((_high, index) => (
                <HighLighContainer key={index} highlight={_high} />
              ))}
            </div>
            <div className=" shadow-2xl p-4 rounded-xl mt-8 sticky top-16">
              <form onSubmit={() => console.log('clicked')}>
                <div className="mb-4 relative">
                  <label className="block mb-1" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="bg-slate-100 rounded-2xl p-4 w-full"
                    value={'email'}
                    onChange={(e) => console.log(e)}
                    type="text"
                    name="email"
                    id="email"
                  />
                </div>
                <div className="mb-4 relative">
                  <label className="block mb-1" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="bg-slate-100 rounded-2xl p-4 w-full"
                    value={'password'}
                    onChange={(e) => console.log(e)}
                    type="password"
                    name="password"
                    id="password"
                  />
                </div>

                <button className="primaryBtn w-full p-4">Login</button>
              </form>
            </div>
          </div>
          <div>guest container</div>
          <div>
            <h3 className="font-bold text-gray-800 text-4xl my-4">
              Where you’ll be
            </h3>
            <p className=" text-gray-600 text-xl my-4">
              {listing?.title},united state
            </p>
            <div className="flex-1  w-full rounded-xl relative bg-gray-100 z-0">
              <MapContainer
                className="h-96 rounded-3xl"
                center={[
                  listing?.coordinate?.latitude,
                  listing?.coordinate?.longitude,
                ]}
                zoom={16}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />

                <Marker
                  key={id}
                  //icon={TiHome}
                  position={[
                    listing?.coordinate?.latitude,
                    listing?.coordinate?.longitude,
                  ]}
                ></Marker>
              </MapContainer>
            </div>
          </div>
          <div>review</div>
          <div>guest info</div>
        </div>
      )}
    </>
  );
};
export default Location;

const HighLighContainer = ({ highlight }) => {
  const { title, subtitle } = highlight;
  return (
    <div className="flex items-center gap-4 p-2">
      <div>icon</div>
      <div>
        <p className="text-gray-800 text-xl font-semibold py-2">{title}</p>
        <p className="text-gray-700 text-lg">{subtitle}</p>
      </div>
    </div>
  );
};
const HouseFeatureContainer = ({ highlight }) => {
  const { title, subtitle } = highlight;
  return (
    <div className="flex items-center gap-4 p-2">
      <div>icon</div>
      <div>
        <p className="text-gray-800 text-xl font-semibold py-2">{title}</p>
        <p className="text-gray-700 text-lg">{subtitle}</p>
      </div>
    </div>
  );
};
