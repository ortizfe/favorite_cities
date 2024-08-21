import FavoriteCitiesRating from './FavoriteCitiesRating';
import AddCity from './AddCity';
import { useEffect, useState } from 'react';

const CityMain = () => {
  const [cities, setCities] = useState([]);
  const [updateCity, setUpdateCity] = useState(false);
  const [error, setError] = useState(false);

  const fetchCities = async () => {
    try {
      const response = await fetch('http://localhost:5000/cities');

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      setCities(data);
      setUpdateCity(false);
      setError(false);
    } catch (error) {
      console.log('Error fetching cities: ', error);
      setError(true);
    }
  };

  useEffect(() => {
    fetchCities();
  }, [updateCity]);

  return (
    <div>
      <AddCity cities={cities} onChange={setUpdateCity} />
      <FavoriteCitiesRating
        cities={cities}
        onChange={setUpdateCity}
        error={error}
      />
    </div>
  );
};

export default CityMain;
