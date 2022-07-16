import { FC } from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

const options = [
  {
    id: 'advance_purchase',
    label: 'Station Kiosk'
  },
  {
    id: 'onboard_purchase',
    label: 'Onboard'
  },
]

interface Props {
  _setOption: (option: string) => void
  _currentFare: string
}

export const FarePurchaseOptions: FC<Props> = ({ _setOption, _currentFare }) => {

  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
        value={_currentFare}
        onChange={(e) => _setOption(e.target.value)}
      >
        {
          options.map(option => (
            <FormControlLabel key={option.id} value={option.id} control={<Radio checked={option.id === _currentFare} />} label={option.label} />
          ))
        }
      </RadioGroup>
    </FormControl>
  );
}
