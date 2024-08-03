/* eslint-disable no-unused-vars */
import L from 'leaflet';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useLocations } from '../../context/LocationsProvider';
import { IoShareOutline, IoHeartOutline } from 'react-icons/io5';
import LeftSign from '../../assets/leftSign.png';
import RightSign from '../../assets/rightSign.png';
import { FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa6';
import IconComponent from '../IconComponent';

const svgIcon = new L.divIcon({
  html: `<div class=" w-12 h-12 flex justify-center items-center rounded-full bg-primary-600  p-3"><svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; height: 22px; width: 22px; fill: #fff;"><path d="m8.94959955 1.13115419 5.71719515 4.68049298c.2120231.18970472.3332053.46073893.3332053.74524138v7.94311145c0 .2761424-.2238576.5-.5.5h-4.5v-5.5c0-.24545989-.17687516-.44960837-.41012437-.49194433l-.08987563-.00805567h-3c-.27614237 0-.5.22385763-.5.5v5.5h-4.5c-.27614237 0-.5-.2238576-.5-.5v-7.95162536c0-.28450241.12118221-.55553661.3502077-.75978249l5.70008742-4.65820288c.55265671-.45163993 1.34701168-.45132001 1.89930443.00076492z"></path></svg></div>`,
  iconSize: [24, 24],
  className: '',
});
const Location = () => {
  const { id } = useParams();
  const { getLocation, isLoadingCurrLocation, currentLocation } =
    useLocations();
  const { listing, detail } = currentLocation;
  const [sleep, setSleep] = useState(detail?.sleepData?.arrangementDetails);

  useEffect(() => {
    getLocation(id);
  }, [id]);

  useEffect(() => {
    setSleep(detail?.sleepData?.arrangementDetails?.slice(0, 2));
  }, [detail]);

  return (
    <>
      <div className="w-full h-[1px] bg-gray-200 mt-4 mb-8"></div>
      {!!listing && (
        <div className="mx-[86px]">
          <div>
            <div className="flex justify-between items-center mt-4">
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
            <div className="mt-4 grid grid-cols-4 gap-2 h-full">
              <img
                className="col-span-2 rounded-tl-2xl rounded-bl-2xl h-full w-full"
                src={listing?.contextualPictures[0]?.picture}
              />
              <div className="flex flex-col gap-2">
                <img
                  className="h-1/2"
                  src={listing?.contextualPictures[1]?.picture}
                />
                <img
                  className="h-1/2"
                  src={listing?.contextualPictures[2]?.picture}
                />
              </div>
              <div className="flex flex-col gap-2">
                <img
                  className="rounded-tr-2xl h-1/2"
                  src={listing?.contextualPictures[3]?.picture}
                />
                <img
                  className="rounded-br-2xl h-1/2"
                  src={listing?.contextualPictures[4]?.picture}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 mt-4 gap-3 ">
            <div className="col-span-2 pr-5">
              <h2 className="font-semibold text-[22px] text-gray-800">
                Entire Home in {listing.title},united state
              </h2>
              <p className="text-gray-600 text-lg mb-4">
                {listing?.overViewData}
              </p>

              <div className="flex justify-between border p-4 mt-4 w-5/6 gap-2 border-gray-300 rounded-2xl">
                <div className="flex">
                  <img className="p-2" src={LeftSign} />
                  <div className="font-semibold text-center">
                    <p>Guest</p>
                    <p>favorite</p>
                  </div>
                  <img className="p-2" src={RightSign} />
                </div>
                <div className="w-60">
                  <p className="font-semibold text-base">
                    {listing?.brand?.description}
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center gap-1">
                  <p className="font-bold text-2xl">
                    {listing.avgRatingLocalized}
                  </p>
                  <div className="flex space-x-[2px]">
                    {[
                      ...Array(5)
                        .keys()
                        .map((_e) => (
                          <FaStar key={_e.index} className="w-3 h-3" />
                        )),
                    ]}
                  </div>
                </div>
                <div className="w-[2px] h-8 my-auto mx-1 bg-gray-300 border-0 rounded-full "></div>
                <div className="flex flex-col justify-center items-center">
                  <p className="font-bold text-2xl">25</p>
                  <p>Reviews</p>
                </div>
              </div>
              {detail?.highlights.map((_high, index) => (
                <HighLighContainer key={index} highlight={_high} />
              ))}

              <div className="mr-4">
                <h3 className="font-bold text-gray-800 text-2xl my-4">
                  What this place offers
                </h3>
                <div className="grid grid-cols-2">
                  {detail?.houseAmenities?.amenities?.map((amenitie) => (
                    <Amenities key={amenitie.id} amenitie={amenitie} />
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-gray-800 text-2xl my-4">
                    Where you’ll sleep
                  </h3>
                  <div className="flex gap-4">
                    <div
                      onClick={() =>
                        setSleep(
                          detail?.sleepData?.arrangementDetails?.slice(0, 2)
                        )
                      }
                      className={`${sleep?.some(
                        (_e) => _e.id == 1
                      )} ? disabled:cursor-not-allowed : border w-10 h-10 flex items-center justify-center border-gray-100 shadow-md text-2xl rounded-full p-2 text-block bg-white cursor-pointer`}
                    >
                      <FaChevronLeft size={12} />
                    </div>

                    <div
                      onClick={() =>
                        setSleep(
                          detail?.sleepData?.arrangementDetails?.slice(
                            sleep?.length,
                            sleep?.length + 2
                          )
                        )
                      }
                      className="border w-10 h-10 flex items-center justify-center border-gray-100 shadow-md text-2xl rounded-full p-2 text-block bg-white cursor-pointer"
                    >
                      <FaChevronRight size={12} />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 w-full">
                  {sleep?.map((_elm) => (
                    <div key={_elm.src}>
                      <img className="rounded-3xl" src={_elm.src} />
                      <p className="font-semibold pt-2">{_elm.title}</p>
                      <p>{_elm.subtitle}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="shadow-xl p-4 rounded-xl mt-8 sticky top-16 h-[300px]">
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
          <div className="w-full h-[1px] bg-gray-200 my-4"></div>
          <div className="my-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold">
                {detail?.ratingdata?.heading?.title}
              </h3>
              <div className="w-full py-4 flex justify-center items-center">
                <p className="w-[328px]">
                  {detail?.ratingdata?.heading?.subtitle}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-7 divide-x my-8">
              <>
                <div className="mr-4">
                  <p className="text-gray-800 text-lg font-semibold">
                    Overall rating
                  </p>
                  {detail?.ratingdata?.ratingDistribution?.map((_e) => (
                    <div
                      key={_e.label}
                      className="flex items-center justify-center gap-2 "
                    >
                      <p className="text-sm">{_e.label}</p>
                      <div className="w-full bg-gray-200 rounded-full ">
                        <div
                          className={'bg-gray-700 h-1 rounded-full '}
                          style={{ width: _e.localizedRating }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                {detail?.ratingdata?.ratings?.map((_rat, index) => (
                  <RatingContainer key={index} reating={_rat} />
                ))}
              </>
            </div>
          </div>
          <div className="w-full h-[1px] bg-gray-200 my-4"></div>
          <div className="grid grid-cols-2  space-x-2 space-y-2">
            {detail?.reviews?.map((review) => (
              <Review key={review.id} review={review} />
            ))}
          </div>
          <div className="w-full h-[1px] bg-gray-200 my-4"></div>
          <div>
            <h3 className="font-bold text-gray-800 text-2xl my-4">
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
                  icon={svgIcon}
                  position={[
                    listing?.coordinate?.latitude,
                    listing?.coordinate?.longitude,
                  ]}
                ></Marker>
              </MapContainer>
            </div>
          </div>

          <div>guest info</div>
        </div>
      )}
    </>
  );
};
export default Location;

const HighLighContainer = ({ highlight }) => {
  const { title, subtitle, icon } = highlight;

  return (
    <div className="flex items-center gap-4 p-2">
      <IconComponent icon={icon} />
      <div>
        <p className="text-gray-800 text-base font-semibold py-2">{title}</p>
        <p className="text-gray-700 text-sm">{subtitle}</p>
      </div>
    </div>
  );
};

const RatingContainer = ({ reating }) => {
  const { label, localizedRating, icon } = reating;
  return (
    <div className="pl-4 flex flex-col justify-between">
      <div>
        <p className="text-gray-800 text-lg font-semibold">{label}</p>
        <p className="text-gray-800 text-lg  font-bold">{localizedRating}</p>
      </div>
      <div className="mt-8">
        <IconComponent icon={icon} />
      </div>
    </div>
  );
};
const Amenities = ({ amenitie }) => {
  const { title, icon } = amenitie;
  return (
    <div className="flex items-center gap-4 p-2">
      <IconComponent icon={icon} />
      <div>
        <p className="text-gray-800 text-base">{title}</p>
      </div>
    </div>
  );
};

const Review = ({ review }) => {
  const {
    hostName,
    pictureUrl,
    comments,
    createdAt,
    localizedDate,
    localizedReviewerLocation,
    rating,
    reviewHighlight,
  } = review;

  return (
    <div className="my-4 ">
      <div className="flex gap-2">
        <img className="w-[56px] h-[56px] rounded-full" src={pictureUrl} />
        <div>
          <p className="font-semibold">{hostName}</p>
          <p>{localizedReviewerLocation}</p>
        </div>
      </div>
      <div className="flex items-center  py-2">
        <div className="flex space-x-[2px]">
          {[
            ...Array(rating)
              .keys()
              .map((_e) => <FaStar key={_e.index} className="w-3 h-3" />),
          ]}
        </div>
        &nbsp;&bull;&nbsp;
        <span>{localizedDate}</span>
        &nbsp;&bull;&nbsp;
        <span className="text-gray-400"> {reviewHighlight}</span>
      </div>
      <p>{comments}</p>
    </div>
  );
};
