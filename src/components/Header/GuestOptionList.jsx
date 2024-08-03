import { HiMinus, HiPlus } from 'react-icons/hi';

const GuestOptionList = ({ options, handleOptions }) => {
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
};
export default GuestOptionList;
