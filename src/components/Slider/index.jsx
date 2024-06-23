/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa6';
import { FaChevronRight } from 'react-icons/fa6';
import { RxDotFilled } from 'react-icons/rx';

const Slider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log(images);
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  return (
    <div className=" h-[300px] w-full object-fit m-auto relative group ">
      <div
        className="w-full h-full bg-center bg-cover duration-500 rounded-2xl"
        style={{
          backgroundImage: `url(${images[currentIndex].picture})`,
        }}
      >
        {currentIndex > 0 && (
          <div
            onClick={prevSlide}
            className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-2 text-2xl rounded-full p-2 text-block bg-white cursor-pointer"
          >
            <FaChevronLeft size={12} />
          </div>
        )}

        {currentIndex < images.length - 1 && (
          <div
            onClick={nextSlide}
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
