import Card from './Card';
import VoteButton from './VoteButton';

import Stack from '@mui/material/Stack';

const FavoriteCitiesRating = (props) => {
  return (
    <Card>
      <h3>List of Favorite Cities</h3>
      {props.cities.length > 0 ? '' : <p>Loading...</p>}
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {props.cities.map((city) => {
          const total = city.totalScore || 0;
          const votes = city.totalVotes || 0;
          const average =
            votes === 0 ? 0 : Math.round((total / votes) * 10) / 10;

          return (
            <li
              key={city.id}
              style={{
                borderTop: '1px solid #ccc',
                margin: '1px',
              }}
            >
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={10}
                justifyContent="center"
                alignItems="center"
                padding="5px"
              >
                <p style={{ fontWeight: 'bold', color: 'blue' }}>
                  {city.city}
                </p>
                <VoteButton
                  onRatingChange={props.onChange}
                  city={city.city}
                />
                <p>
                  Rating: <strong>{average}</strong> out of{' '}
                  <strong>{votes}</strong> votes
                </p>
              </Stack>
            </li>
          );
        })}
      </ul>
    </Card>
  );
};

export default FavoriteCitiesRating;
