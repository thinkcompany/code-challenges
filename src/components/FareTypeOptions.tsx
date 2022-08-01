import { FC } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface SelectProps {
  onChange: (option: string) => void
  option: string
}

const OPTIONS = [
  { id: 'anytime', label: 'Anytime' },
  { id: 'weekday', label: 'Week Days' },
  { id: 'evening_weekend', label: 'Weekend Evenings' },
]

export const FareTypeOptions: FC<SelectProps> = ({ onChange, option }) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };

  return (
    <Box width='100%'>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Occasion</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={option || ''}
          label="Occasion"
          onChange={handleChange}
        >
          {OPTIONS.map((option) => (
            <MenuItem value={option.id} key={option.id}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default FareTypeOptions;
