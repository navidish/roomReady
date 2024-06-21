/* eslint-disable no-unused-vars */
import { createContext, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

const Locationcontext = createContext();
const BASE_URL = 'http://localhost:5000/hotels';

function LocationsProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get('destination');
  const room = JSON.parse(searchParams.get('options'))?.find(
    (opt) => opt.type === 'room'
  )?.count;

  const { isLoading, data: locations } = useFetch(
    BASE_URL,
    `q=${destination || ''}&accommodates_gte=${room || 1}`
  );

  return (
    <Locationcontext.Provider value={{ isLoading, locations }}>
      {children}
    </Locationcontext.Provider>
  );
}
export default LocationsProvider;

export function useLocations() {
  return useContext(Locationcontext);
}
