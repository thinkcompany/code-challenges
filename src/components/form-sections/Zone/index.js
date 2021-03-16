import './Zone.css';
const Zone = () => {
  return (
    <div className='zone-section'>
      <div>
        Where are you going?
      </div>
      <div className='zone-select-div'>
        <select>
          <option value=''>Select zone</option>
        </select>
      </div>
    </div>
  )
}

export default Zone;