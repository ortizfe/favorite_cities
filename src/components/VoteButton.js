import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { useState } from 'react';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

const VoteButton = (props) => {
  const [rating, setRating] = useState(0);
  const selectedCity = props.city;

  let votes = 1;
  let score = 0;

  const updateRating = async (newRating) => {
    setRating(newRating);

    try {
      const response = await fetch('http://localhost:5000/cities');

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const listCities = await response.json();

      let { totalVotes, totalScore, id } = listCities.find(
        (name) => name.city === selectedCity
      );

      votes += totalVotes;
      score = newRating + totalScore;

      try {
        const response = await fetch(
          `http://localhost:5000/cities/${id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              city: selectedCity,
              totalVotes: votes,
              totalScore: score,
              rating: newRating,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const updatedRating = await response.json();
        props.onRatingChange(true);
        setRating(0);

        console.log(updatedRating);
      } catch (error) {
        throw new Error('Error updating city rating ', error);
      }
    } catch (error) {
      throw new Error(`Fetching cities failed with error: ${error}`);
    }
  };

  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <StyledRating
        name="customized-5"
        defaultValue={0}
        value={rating}
        max={5}
        precision={0.5}
        onChange={(event) => {
          updateRating(Number(event.target.value));
        }}
      />
    </Box>
  );
};

export default VoteButton;
