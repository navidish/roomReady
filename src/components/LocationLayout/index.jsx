import { Outlet } from 'react-router';
import Map from '../Map';

const LocationLayout = () => {
  return (
    <div className="flex justify-between items-stretch m-4 h-[calc(100vh-130px)] ">
      <div className="w-1/2 overflow-y-scroll pr-4">
        <Outlet />
      </div>
      <div className="bg-gray-200 flex-1 relative">
        <Map />
      </div>
    </div>
  );
};
export default LocationLayout;
