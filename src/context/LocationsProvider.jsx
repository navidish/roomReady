/* eslint-disable no-unused-vars */
import { createContext, useContext, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import axios from 'axios';
import db from '../server/db.json'

const Locationcontext = createContext();
const BASE_URL = db;

function LocationsProvider({ children }) {
  const [currentLocation, setCurrentLocation] = useState({});
  const [isLoadingCurrLocation, setIsLoadinCurrLocation] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get('destination');
  const room = JSON.parse(searchParams.get('options'))?.find(
    (opt) => opt.type === 'room'
  )?.count;

  const { isLoading, data: locations } = useFetch(
    BASE_URL,
    `q=${destination || ''}`
  );
 function getLocation(id) {
    setIsLoadinCurrLocation(true);
    try {
      //const { data } = await axios.get(`${BASE_URL}/${id}`);
      const data = db.airbnb.filter((_elm)=>_elm.id==id)
      setCurrentLocation(data);
      setIsLoadinCurrLocation(false);
    } catch (error) {
      setIsLoadinCurrLocation(false);
    }
  }

  return (
    <Locationcontext.Provider
      value={{
        isLoading,
        locations,
        getLocation,
        currentLocation,
        isLoadingCurrLocation,
      }}
    >
      {children}
    </Locationcontext.Provider>
  );
}
export default LocationsProvider;

export function useLocations() {
  return useContext(Locationcontext);
}
