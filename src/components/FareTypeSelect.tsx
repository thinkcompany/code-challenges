import { FC } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface OccasionSelectProps {
  _setFareType: (occasion: string) => void
  _currentFareType: string
}

const occasions = [
  {
    id: 'anytime',
    label: 'Anytime'
  },
  {
    id: 'weekday',
    label: 'WeekDays'
  },
  {
    id: 'evening_weekend',
    label: 'Weekend Evenings'
  },
]
export const FareTypeSelect: FC<OccasionSelectProps> = ({ _setFareType, _currentFareType }) => {

  const handleChange = (event: SelectChangeEvent) => {
    _setFareType(event.target.value)
  };

  return (
    <Box width='100%'>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Occasion</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={_currentFareType || ''}
          label="Occasion"
          onChange={handleChange}
        >
          {
            occasions.map((occasion) => (
              <MenuItem value={occasion.id} key={occasion.id}>
                {occasion.label}
              </MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </Box>
  );
}

export default FareTypeSelect