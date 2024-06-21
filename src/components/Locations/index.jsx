/* eslint-disable no-unused-vars */
import { useSearchParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { FaStar } from 'react-icons/fa6';

function Locations() {
  const BASE_URL = 'http://localhost:5000/hotels';
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get('destination');
  const room = JSON.parse(searchParams.get('options'))?.find(
    (opt) => opt.type === 'room'
  )?.count;
  const { data, isLoading } = useFetch(
    BASE_URL,
    `q=${destination || ''}&accommodates_gte=${room || 1}`
  );
  return (
    <div className="my-8 mx-8">
      <h2 className="font-bold text-2xl text-primary-600 mb-8">
        Nearby Locations
      </h2>
      {isLoading ? (
        <p className="text-primary-600">loading data ...</p>
      ) : (
        <>
          <div className="grid gap-8 grid-cols-3">
            {data.map((item) => {
              return (
                <div key={item.id}>
                  <img
                    className="w-full h-80 mb-2 rounded-lg"
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
