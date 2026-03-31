import { FaMapMarkerAlt, FaCalendarAlt, FaExchangeAlt } from 'react-icons/fa'

function SearchBar({
  values,
  onChange,
  onSubmit,
  onSwap,
  onFieldFocus,
  errors = {},
  isSubmitting = false,
}) {
  return (
    <form className="search-bar" onSubmit={onSubmit}>
      <div className={`field ${errors.from ? 'field-error' : ''}`}>
        <FaMapMarkerAlt />
        <input
          type="text"
          name="from"
          placeholder="From (city or terminal)"
          value={values.from}
          onChange={onChange}
          onFocus={() => onFieldFocus?.('from')}
        />
      </div>
      <button
        type="button"
        className="swap-button"
        onClick={onSwap}
        aria-label="Swap origin and destination"
      >
        <FaExchangeAlt />
      </button>
      <div className={`field ${errors.to ? 'field-error' : ''}`}>
        <FaMapMarkerAlt />
        <input
          type="text"
          name="to"
          placeholder="To (city or terminal)"
          value={values.to}
          onChange={onChange}
          onFocus={() => onFieldFocus?.('to')}
        />
      </div>
      <div className={`field ${errors.date ? 'field-error' : ''}`}>
        <FaCalendarAlt />
        <input
          type="date"
          name="date"
          value={values.date}
          onChange={onChange}
          onFocus={() => onFieldFocus?.('date')}
        />
      </div>
      <button className="primary-button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Searching…' : 'Search Buses'}
      </button>
    </form>
  )
}

export default SearchBar
