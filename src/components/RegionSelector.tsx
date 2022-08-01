import { FC } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface RegionSelectProps {
  options: any[]
  onChange: (zone: string) => void
  option: string
}

export const RegionSelect: FC<RegionSelectProps> = ({ options, onChange, option }) => (
  <Box width='100%'>
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">
        Region
      </InputLabel>

      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={option || ''}
        label="Region"
        onChange={(e: SelectChangeEvent) => onChange(e.target.value)}
      >
        {options.map(option => (
          <MenuItem key={option.zone} value={option.zone}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </Box>
);

export default RegionSelect;
