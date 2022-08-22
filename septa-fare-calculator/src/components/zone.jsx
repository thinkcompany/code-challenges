const Zone = ({zone, setZone, options}) => {
  return (
    <div className="zone-container">
      Where are you going?
      <select className="zone-dropdown" value={zone} onChange={(e) => setZone(e.target.value)} >
        <option value="">Select Zone</option>
        {options.map((option, i) => (
          <option key={i} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Zone;