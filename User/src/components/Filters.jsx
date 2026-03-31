function Filters({ filters, onChange }) {
  return (
    <div className="filters card">
      <h3>Filters</h3>
      <div className="filter-grid">
        <label>
          Price Range
          <input
            type="range"
            min="15"
            max="80"
            value={filters.price}
            onChange={(event) => onChange('price', event.target.value)}
          />
          <span className="muted">Up to ${filters.price}</span>
        </label>
        <label>
          Departure Time
          <select
            value={filters.time}
            onChange={(event) => onChange('time', event.target.value)}
          >
            <option value="any">Any</option>
            <option value="morning">Morning (5am - 11am)</option>
            <option value="afternoon">Afternoon (12pm - 5pm)</option>
            <option value="evening">Evening (6pm - 11pm)</option>
          </select>
        </label>
        <label>
          Bus Type
          <select
            value={filters.type}
            onChange={(event) => onChange('type', event.target.value)}
          >
            <option value="any">All</option>
            <option value="AC">AC</option>
            <option value="Non-AC">Non-AC</option>
            <option value="Luxury">Luxury</option>
          </select>
        </label>
        <label>
          Sort
          <select
            value={filters.sort}
            onChange={(event) => onChange('sort', event.target.value)}
          >
            <option value="cheapest">Cheapest</option>
            <option value="fastest">Fastest</option>
            <option value="rating">Highest Rating</option>
          </select>
        </label>
      </div>
    </div>
  )
}

export default Filters
