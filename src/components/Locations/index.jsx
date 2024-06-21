/* eslint-disable no-unused-vars */
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { FaStar } from 'react-icons/fa6';
import { useLocations } from '../../context/LocationsProvider';

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
          <div className="grid gap-8 grid-cols-3">
            {locations?.map((item) => {
              return (
                <Link
                  key={item.id}
                  to={
                    hasSearchValue
                      ? `${location?.pathname}/${item.id}?lat=${item.latitude}&lng=${item.longitude}`
                      : `locations/${item.id}?lat=${item.latitude}&lng=${item.longitude}`
                  }
                >
                  <img
                    className={
                      hasSearchValue
                        ? 'w-40 h-40 mb-2 rounded-lg'
                        : 'w-full h-80 mb-2 rounded-lg'
                    }
                    src={item.thumbnail_url}
                    alt={item.name}
                  />
                  <div>
                    <div className="flex justify-between items-center">
                      <p className="font-medium">{item.smart_location}</p>
                      <div className="flex gap-1">
                        <FaStar className="w-4 h-4" />
                        {item.review_scores_rating ?? 0}
                      </div>
                    </div>
                    <p className="text-gray-700">{item.name}</p>
                    <p className="font-medium">
                      €&nbsp;{item.price}&nbsp;
                      <span className="font-light">night</span>
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
export default Locations;
