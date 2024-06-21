import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Locations from './components/Locations';
import LocationLayout from './components/locationLayout';
import LocationsProvider from './context/LocationsProvider';
import LocationDetail from './components/LocationDetail';

function App() {
  return (
    <LocationsProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Locations />} />
        <Route path="/locations" element={<LocationLayout />}>
          <Route index element={<Locations />} />
          <Route path=":id" element={<LocationDetail />} />
        </Route>
      </Routes>
    </LocationsProvider>
  );
}

export default App;
