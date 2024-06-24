/* eslint-disable no-unused-vars */
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { FaStar } from 'react-icons/fa6';
import { useLocations } from '../../context/LocationsProvider';
import Slider from '../Slider';
import ContentLoader from "react-content-loader";
import { IoMapOutline } from "react-icons/io5";
function Locations() {
  const { isLoading, locations } = useLocations();
  const hasSearchValue = location?.pathname?.includes('location');
  const navigate=useNavigate()
  return (
    <div className="my-4 mx-8 relative">
      <h2 className="font-bold text-2xl text-primary-600 mb-8">
        {hasSearchValue
          ? `search result (${locations?.length})`
          : 'Nearby Locations'}
      </h2>
      {isLoading ? (
        <>
        <p className="text-primary-600">loading data ...</p>
        <div className="grid gap-6 grid-cols-5">
          {
             Array.from(Array(10), () => 0).map((_elm) =>  <MyLoader/>)
          }
           
        </div>
         
         </>
      ) : (
        <>
          <div className="grid gap-6 grid-cols-5">
            {locations?.map(({ id, listing }) => {
              return (
                <div className='my-2' key={id}>
                  <Slider images={listing.contextualPictures} />
                  <div className='mt-4'>
                    <div className="flex justify-between items-center">
                      <p className="font-extrabold">{listing.title}</p>
                      <div className="flex justify-center items-center gap-1">
                        <FaStar className="w-4 h-4" />
                        <p className='text-gray-900'>{listing.avgRatingLocalized ?? 0}</p>
                      </div>
                    </div>
                    <p className="text-gray-700">{listing.primaryLine}</p>
                    <p className="text-gray-700">{listing.secondaryLine}</p>
                    <p className="font-extrabold">
                      {listing.price}
                      <span className="font-normal ml-1">night</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}


      <button onClick={()=>navigate({
      pathname: '/Maps',
   
    })} className='hover:w-36 shadow-md  fixed bottom-4 left-1/2  -translate-x-1/2 -translate-y-1/2 w-32 px-2 py-3 rounded-3xl bg-gray-950 text-white font-medium flex justify-center items-center gap-2'>  show map <IoMapOutline/></button>
     
    </div>
  );
}
export default Locations;

const MyLoader = () => (
  <ContentLoader viewBox="0 0 500 280" height={320} width={400}>
    <rect x="3" y="3" rx="10" ry="10" width="300" height="180" />
    <rect x="6" y="190" rx="0" ry="0" width="292" height="20" />
    <rect x="4" y="215" rx="0" ry="0" width="239" height="20" />
    <rect x="4" y="242" rx="0" ry="0" width="274" height="20" />
  </ContentLoader>
)