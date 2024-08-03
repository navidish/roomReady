/* eslint-disable no-unused-vars */
import { useState } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format } from 'date-fns';
import { MdLocationOn } from 'react-icons/md';
import { MdAccountCircle } from 'react-icons/md';
import { HiCalendar, HiMinus, HiPlus, HiSearch, HiMenu } from 'react-icons/hi';
import { DateRange } from 'react-date-range';
import { useLocation, useNavigate } from 'react-router';
import { createSearchParams, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import LogoIcon from '../../assets/logo.png';


function Header() {
  const navigate = useNavigate();
  const location=useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [destination, setDestination] = useState(
    searchParams.get('destination') || ''
  );
  const [openOptions, setOpenOptions] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [guestOtions, setGuestOptions] = useState([
    {
      type: 'adult',
      description: 'Ages 18 or above',
      minLimit: 1,
      count: 1,
    },
    {
      type: 'children',
      description: 'Ages 2 – 17',
      minLimit: 0,
      count: 0,
    },
    {
      type: 'room',
      description: 'numbers of room',
      minLimit: 1,
      count:
        JSON.parse(searchParams.get('options'))?.find(
          (opt) => opt.type === 'room'
        )?.count || 1,
    },
  ]);

  const handleOptions = (data, operation) => {
    setGuestOptions(
      guestOtions.map((option) =>
        option.type === data.type
          ? {
              ...option,
              count: operation === 'inc' ? option.count + 1 : option.count - 1,
            }
          : option
      )
    );
  };
  const handleSearch = () => {
    const params = createSearchParams({
      destination: destination,
      options: JSON.stringify(
        guestOtions.map(({ count, type }) => ({ type, count }))
      ),
    });
    setSearchParams(params);
    navigate({
      pathname: '/locations',
      search: params.toString(),
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="headerContainer">
      <div className=" p-2 w-[150px] ">
        <img src={LogoIcon} />
      </div>
{
  location.pathname!='/login'&&
  <div className="searchContainer">
    <div className="searchItemContainer">
      <MdLocationOn className="icon text-primary-700" />
      <input
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        type="text"
        placeholder="location"
        className="px-3 py-2 text-sm"
        name="destination"
        id="destination"
      />
      <span className="seperator"></span>
    </div>
    <div className="searchItemContainer">
      <HiCalendar className="icon text-primary-700" />
      <div
        onClick={() => setOpenDate(!openDate)}
        className="px-3 py-2 text-sm"
      >
        {`${format(date[0].startDate, 'MM/dd/yyyy')} to ${format(
          date[0].endDate,
          'MM/dd/yyyy'
        )}`}
      </div>

      {openDate && (
        <DateRange
          className="popUpContainer"
          onChange={(item) => setDate([item.selection])}
          ranges={date}
          minDate={new Date()}
          moveRangeOnFirstSelection={true}
        />
      )}
      <span className="seperator"></span>
    </div>
    <div className="searchItemContainer">
      <div
        className="flex w-full"
        id="optionDropDown"
        onClick={() => setOpenOptions(!openOptions)}
      >
        {guestOtions.map((option) => {
          return (
            <div key={option.type}>
              {option.count}
              {option.type}
              &nbsp;&bull;&nbsp;
            </div>
          );
        })}
      </div>
      {openOptions && (
        <GuestOptionList
          setOpenOptions={setOpenOptions}
          handleOptions={handleOptions}
          options={guestOtions}
        />
      )}
      <span className="seperator"></span>
    </div>

    <div className="searchItemContainer">
      <button className="primaryBtn" onClick={handleSearch}>
        <HiSearch className="icon" />
      </button>
    </div>
  </div>

}
      <div
        onClick={() => setOpenUserMenu(!openUserMenu)}
        className="flex justify-between items-center  border rounded-full border-gray-300 p-2 min-w-[120px] hover:shadow-xl"
      >
        <span className="inline-block flex-1 text-sm font-semibold mr-2">
          {user?.name}
        </span>
        <div className="w-full flex justify-between items-center">
          {!isAuthenticated && (
            <HiMenu size={24} className="text-gray-500 ml-2" />
          )}
          <MdAccountCircle size={36} className="text-gray-500" />
        </div>

        {openUserMenu && (
          <UserMenuList
            user={user}
            isAuthenticated={isAuthenticated}
            onExit={handleLogout}
            onLogin={handleLogin}
          />
        )}
      </div>
    </div>
  );
}
export default Header;

function GuestOptionList({ options, handleOptions }) {
  return (
    <div className="popUpContainer">
      {options.map((_opt, index) => (
        <div key={index} className="guestItem">
          <div className="flex flex-col gap-2">
            <span className="inline-block flex-1 text-sm">{_opt.type}</span>
            <span className="inline-block flex-1 text-sm text-gray-400">
              {_opt.description}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleOptions(_opt, 'dec')}
              className="actionBtn"
              disabled={_opt.count <= _opt.minLimit}
            >
              <HiMinus className="icon" />
            </button>
            <span className="inline-block">{_opt.count}</span>
            <button
              onClick={() => handleOptions(_opt, 'inc')}
              className="actionBtn"
            >
              <HiPlus className="icon" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function UserMenuList({ user, isAuthenticated, onExit, onLogin }) {
  return (
    <div className="UserMenuPopUpContainer">
      {isAuthenticated ? (
        <div className="flex flex-col gap-8">
          <span className="inline-block flex-1 text-sm">{user?.name}</span>

          <span onClick={onExit} className="inline-block flex-1 text-sm">
            Exit
          </span>
        </div>
      ) : (
        <span className="inline-block flex-1 text-sm" onClick={onLogin}>
          Log in
        </span>
      )}
    </div>
  );
}
