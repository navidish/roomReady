import { useState } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format } from 'date-fns';
import { MdLocationOn } from 'react-icons/md';
import { HiCalendar, HiMinus, HiPlus, HiSearch } from 'react-icons/hi';
import { DateRange } from 'react-date-range';

function Header() {
  const [destination, setDestination] = useState('');
  const [openOptions, setOpenOptions] = useState(false);
  const [openDate, setOpenDate] = useState(false);
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
      count: 1,
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
  const handleSearch = () => {};
  return (
    <div className="headerContainer">
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
          <div id="optionDropDown" onClick={() => setOpenOptions(!openOptions)}>
            {guestOtions.map((option) => {
              return (
                <>
                  {option.count}
                  {option.type}
                  &nbsp;&bull;&nbsp;
                </>
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
