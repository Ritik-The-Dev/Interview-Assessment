export default function FormFields({
  fieldName,
  isRequired,
  value,
  onChange,
  error,
  type = "text",
  name,
  max
}) {
  const commonClasses = `w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 ${
    value?.trim() && error
      ? "border-red-500 focus:ring-red-300"
      : "border-gray-300 focus:ring-blue-300"
  }`;

  return (
    <div className="space-y-1">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {fieldName}
        {isRequired && <span className="text-red-500 ml-1">*</span>}
      </label>

      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          className={`${commonClasses} resize-none`}
          rows={4}
          value={value}
          onChange={onChange}
          aria-invalid={!!value?.trim() && !!error}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          maxLength={max}
          className={commonClasses}
          value={value}
          onChange={onChange}
          aria-invalid={!!value?.trim() && !!error}
        />
      )}

      <div className="min-h-4">
        {value?.trim() && error && (
          <p className="text-red-500 text-xs">{error}</p>
        )}
      </div>
    </div>
  );
}
