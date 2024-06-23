/* eslint-disable no-unused-vars */
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { FaStar } from 'react-icons/fa6';
import { useLocations } from '../../context/LocationsProvider';
import Slider from '../Slider';

function Locations() {
  const { isLoading, locations } = useLocations();
  const hasSearchValue = location?.pathname?.includes('location');
  return (
    <div className="my-4 mx-8">
      <h2 className="font-bold text-2xl text-primary-600 mb-8">
        {hasSearchValue
          ? `search result (${locations?.length})`
          : 'Nearby Locations'}
      </h2>
      {isLoading ? (
        <p className="text-primary-600">loading data ...</p>
      ) : (
        <>
          <div className="grid gap-6 grid-cols-4">
            {locations?.map(({ id, listing }) => {
              return (
                <div key={id}>
                  <Slider images={listing.contextualPictures} />
                  <div>
                    <div className="flex justify-between items-center">
                      <p className="font-medium">{listing.name}</p>
                      <div className="flex gap-1">
                        <FaStar className="w-4 h-4" />
                        {listing.avgRatingLocalized ?? 0}
                      </div>
                    </div>
                    <p className="text-gray-700">{listing.name}</p>
                    {/* <p className="font-medium">
                      €&nbsp;{item.price}&nbsp;
                      <span className="font-light">night</span>
                    </p> */}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
export default Locations;
