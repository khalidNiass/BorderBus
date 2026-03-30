import React from 'react'

/**
 * FormInput Component
 * Reusable form input field with label
 */
const FormInput = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  className = '',
  ...props
}) => {
  return (
    <div className="mb-5">
      {label && (
        <label className="block text-slate-700 font-semibold mb-2.5">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 disabled:bg-slate-100 disabled:cursor-not-allowed disabled:border-slate-300 placeholder:text-slate-400 ${
          error ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''
        } ${className}`}
        {...props}
      />
      {error && <p className="text-red-600 text-sm mt-2 font-medium">{error}</p>}
    </div>
  )
}

export default FormInput
