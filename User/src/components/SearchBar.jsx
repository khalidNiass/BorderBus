import { FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa'

function SearchBar({ values, onChange, onSubmit }) {
  return (
    <form className="search-bar" onSubmit={onSubmit}>
      <div className="field">
        <FaMapMarkerAlt />
        <input
          type="text"
          name="from"
          placeholder="From"
          value={values.from}
          onChange={onChange}
        />
      </div>
      <div className="field">
        <FaMapMarkerAlt />
        <input
          type="text"
          name="to"
          placeholder="To"
          value={values.to}
          onChange={onChange}
        />
      </div>
      <div className="field">
        <FaCalendarAlt />
        <input
          type="date"
          name="date"
          value={values.date}
          onChange={onChange}
        />
      </div>
      <button className="primary-button" type="submit">
        Search Buses
      </button>
    </form>
  )
}

export default SearchBar
