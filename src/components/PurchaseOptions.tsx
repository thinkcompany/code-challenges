import { FC } from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

const options = [
  { id: 'advance_purchase', label: 'Station Kiosk' },
  { id: 'onboard_purchase', label: 'Onboard' },
]

interface Props {
  onChange: (option: string) => void
  option: string
}

const PurchaseOptions: FC<Props> = ({ onChange, option }) => (
  <FormControl>
    <RadioGroup
      aria-labelledby="demo-radio-buttons-group-label"
      defaultValue="female"
      name="radio-buttons-group"
      value={option}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map(op => (
        <FormControlLabel
          key={op.id}
          value={op.id}
          control={<Radio checked={op.id === option} />} 
          label={op.label}
        />
      ))}
    </RadioGroup>
  </FormControl>
);

export default PurchaseOptions
