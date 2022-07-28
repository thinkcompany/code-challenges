import { FC } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface RegionSelectProps {
  _zones: any[]
  _setZone: (zone: string) => void
  _currentZone: string
}

export const RegionSelect: FC<RegionSelectProps> = ({ _zones, _setZone, _currentZone }) => {

  return (
    <Box width='100%'>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Region</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={_currentZone || ''}
          label="Region"
          onChange={(e: SelectChangeEvent) => _setZone(e.target.value)}
        >
          {
            _zones.map(zone => (
              <MenuItem key={zone.zone} value={zone.zone}>{zone.name}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </Box>
  );
}

export default RegionSelect