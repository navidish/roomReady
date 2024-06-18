import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Locations from './components/Locations';
import LocationLayout from './components/locationLayout';
import Hotels from './components/Hotels';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Locations />} />
        <Route path="/locations" element={<LocationLayout />}>
          <Route index element={<Hotels />} />
          <Route path=":id" element={<p>single Hotel</p>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
