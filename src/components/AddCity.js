import { useState } from 'react';
import Card from './Card';

import classes from './AddCity.module.css';

const AddCity = (props) => {
  const [city, setCity] = useState('');
  const [invalidCity, setInvalidCity] = useState(false);
  const [existingCity, setExistingCity] = useState(false);

  const handleInputChange = (e) => {
    setInvalidCity(false);
    setExistingCity(false);
    setCity(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValidCity = /^[A-Za-z\s]+$/.test(city);

    if (city === '' || !isValidCity) {
      setInvalidCity(true);
      setCity('');
      return;
    }

    const cityExists = props.cities.find((existing) => {
      return existing.city.toLowerCase() === city.toLowerCase();
    });

    if (cityExists) {
      setExistingCity(true);
      setCity('');
      return;
    } else {
      const cityName =
        city[0].toUpperCase() + city.substring(1).toLowerCase();

      try {
        const response = await fetch('http://localhost:5000/cities', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            city: cityName,
            rating: 0,
            totalVotes: 0,
            totalScore: 0,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const newCity = await response.json();
        console.log(newCity);

        props.onChange(true);
        setCity('');
        setInvalidCity(false);
        setExistingCity(false);
      } catch (error) {
        console.log('Error adding city: ', error);
      }
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <label>
          Don't see your favorite city in the list? Go ahead and add
          it here:
          <input
            value={city}
            onChange={handleInputChange}
            className={classes.input}
          />
        </label>
        <button type="submit" className={classes.button}>
          Add
        </button>
      </form>
      {!invalidCity ? (
        ''
      ) : (
        <p className={classes.p}>
          That is not a valid city. Please enter a valid city.
        </p>
      )}
      {!existingCity ? (
        ''
      ) : (
        <p className={classes.p}>
          This city already exists. Please find it in the list or
          enter a different favorite city.
        </p>
      )}
    </Card>
  );
};

export default AddCity;
