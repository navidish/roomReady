/* eslint-disable no-unused-vars */
import { useSearchParams } from 'react-router-dom';

const Hotels = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log('get', searchParams.get('options'));
  return <p>hotels</p>;
};
export default Hotels;
