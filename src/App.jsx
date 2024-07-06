import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Locations from './components/Locations';
import LocationLayout from './components/locationLayout';
import LocationsProvider from './context/LocationsProvider';
import LocationDetail from './components/LocationDetail';
import Map from './components/Map';
import Login from './components/Login';
import AuthProvier from './context/AuthProvider';
import Location from './components/Location';

function App() {
  return (
    <div className="my-4 mx-8">
      <AuthProvier>
        <LocationsProvider>
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Locations />} />
            <Route path="/location/:id" element={<Location />} />
            <Route path="/locations" element={<LocationLayout />}>
              <Route index element={<Locations />} />
              <Route path=":id" element={<LocationDetail />} />
            </Route>
            <Route path="/Maps" element={<Map />} />
          </Routes>
        </LocationsProvider>
      </AuthProvier>
    </div>
  );
}

export default App;
