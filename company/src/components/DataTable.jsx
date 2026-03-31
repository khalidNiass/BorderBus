/**
 * Data Table Component
 * Reusable table for displaying data with actions
 */

import '../styles/Table.css';

const DataTable = ({ 
  columns, 
  data, 
  onEdit, 
  onDelete, 
  actions = true 
}) => {
  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} style={{ width: column.width }}>
                {column.label}
              </th>
            ))}
            {actions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (actions ? 1 : 0)} style={{ textAlign: 'center' }}>
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr key={row.id || index}>
                {columns.map((column) => (
                  <td key={column.key}>
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </td>
                ))}
                {actions && (
                  <td>
                    <div className="action-buttons">
                      {onEdit && (
                        <button 
                          className="btn-icon edit"
                          onClick={() => onEdit(row)}
                          title="Edit"
                        >
                          ✏️
                        </button>
                      )}
                      {onDelete && (
                        <button 
                          className="btn-icon delete"
                          onClick={() => onDelete(row)}
                          title="Delete"
                        >
                          🗑️
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
