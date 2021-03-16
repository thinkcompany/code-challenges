import './Zone.css';

const Zone = ({ zone, setZone, options }) => {
  return (
    <div className='zone-section'>
      <div>Where are you going?</div>
      <div className='zone-select-div'>
        <select value={zone} onChange={e => setZone(e.target.value)}>
          <option value=''>Select Zone</option>
          {options.map(option => (
            <option
              key={option.zone}
              value={option.zone}
            >Zone {option.zone}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default Zone;