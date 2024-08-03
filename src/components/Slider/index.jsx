/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { RxDotFilled } from 'react-icons/rx';
import {
  FaRegHeart,
  FaHeart,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa6';

const Slider = ({ images, isMapView }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favourite, setFavourite] = useState(false);

  const prevSlide = (e) => {
    e.preventDefault();
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const nextSlide = (e) => {
    e.preventDefault();
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className=" h-[300px] w-full  m-auto relative group ">
      <div
        className={`w-full h-full bg-center bg-cover duration-500 ${
          isMapView ? 'rounded-t-2xl' : 'rounded-2xl'
        }`}
        style={{
          backgroundImage: `url(${images[currentIndex].picture})`,
        }}
      >
        <div
          onClick={() => setFavourite(!favourite)}
          className={`${
            isMapView
              ? 'bg-white text-gray-600 right-11'
              : 'hidden group-hover:block right-1 text-white bg-transparent'
          } absolute top-[10%] -translate-x-0 translate-y-[-50%]  text-2xl rounded-full p-2   cursor-pointer`}
        >
          {favourite ? (
            <FaHeart size={isMapView ? 14 : 24} />
          ) : (
            <FaRegHeart size={isMapView ? 14 : 24} />
          )}
        </div>

        {currentIndex > 0 && (
          <div
            onClick={(e) => prevSlide(e)}
            className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-2 text-2xl rounded-full p-2 text-block bg-white cursor-pointer"
          >
            <FaChevronLeft size={12} />
          </div>
        )}

        {currentIndex < images.length - 1 && (
          <div
            onClick={(e) => nextSlide(e)}
            className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-2 text-2xl rounded-full p-2 text-block bg-white cursor-pointer"
          >
            <FaChevronRight size={12} />
          </div>
        )}
      </div>
      <div className=" w-full flex justify-center items-center  absolute bottom-2  rounded-full p-1 cursor-pointer">
        {images.map((item, index) => (
          <div
            className={index === currentIndex ? 'text-white' : 'text-gray-200'}
            key={item.id}
            onClick={() => setCurrentIndex(index)}
          >
            <RxDotFilled size={18} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Slider;
