import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLocations } from '../../context/LocationsProvider';
import { GiBathtub } from 'react-icons/gi';
import { IoBedOutline } from 'react-icons/io5';

function LocationDetail() {
  const { id } = useParams();
  const { getLocation, isLoadingCurrLocation, currentLocation } =
    useLocations();
  const {
    name,
    summary,
    bathrooms,
    bedrooms,
    number_of_reviews,
    xl_picture_url,
    smart_location,
  } = currentLocation;

  useEffect(() => {
    getLocation(id);
  }, [id]);

  return (
    <>
      {isLoadingCurrLocation ? (
        <p className="text-primary-600">loading data ...</p>
      ) : (
        <div className="flex items-center justify-between gap-4 mx-8 my-auto">
          <div>
            <h2 className="mb-2 text-lg font-bold">{name}</h2>

            <img
              className="w-full object-cover h-1/3 rounded-xl mb-2"
              src={xl_picture_url}
              alt={name}
            />
            <div className="mb-2">
              {number_of_reviews} reviews &bull; {smart_location}
            </div>
            <div className=" flex items-center gap-8 mb-2">
              <div className="flex justify-center items-center gap-2">
                <GiBathtub className="icon text-gray-600" />
                {bedrooms}
              </div>
              <div className="flex justify-center items-center gap-2">
                <IoBedOutline className="icon text-gray-600" />
                {bathrooms}
              </div>
            </div>
            <p className="mt-2">{summary}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default LocationDetail;
