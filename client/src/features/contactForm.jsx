import { useEffect, useRef, useState } from "react";
import FormFields from "../components/formFields";
import debounce from "../utils/debounce";
import Loader from "../components/loader";

const inputFormFields = [
  { id: 1, fieldName: "Name", isRequired: true, value: "name" },
  { id: 2, fieldName: "Email", isRequired: true, value: "email" },
  {
    id: 3,
    fieldName: "Phone",
    isRequired: true,
    type: "tel",
    value: "phone",
    max: 10,
  },
  {
    id: 4,
    type: "textarea",
    fieldName: "Message",
    isRequired: false,
    value: "message",
  },
];

export default function ContactForm({
  handleAddNewContact,
  onClose,
  isLoading,
}) {
  const [formData, setFormData] = useState(() => {
    return inputFormFields.reduce((acc, field) => {
      acc[field.value] = "";
      return acc;
    }, {});
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const debouncedValidate = useRef(
    debounce((nextData) => {
      const { errors, isValid } = validate(nextData);
      setErrors(errors);
      setIsFormValid(isValid);
    }, 1000)
  ).current;

  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && !isLoading && onClose();
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [onClose]);

  const updateFormData = (field, value) => {
    setFormData((prev) => {
      const next = { ...prev, [field]: value };
      debouncedValidate(next);
      return next;
    });
  };

  const validate = (data) => {
    const e = {};

    inputFormFields.forEach((f) => {
      const v = data[f.value]?.trim();

      if (f.isRequired && !v) {
        e[f.value] = `${f.fieldName} is required`;
        return;
      }

      if (f.value === "email" && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
        e.email = "Invalid email";
      }

      if (f.value === "phone" && v && !/^[6-9]\d{9}$/.test(v)) {
        e.phone = "Invalid phone number";
      }
    });

    return {
      errors: e,
      isValid: Object.keys(e).length === 0,
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return;
    const { errors, isValid } = validate(formData);
    setErrors(errors);
    setIsFormValid(isValid);

    if (!isValid) return;

    handleAddNewContact(formData);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4"
      onClick={isLoading ? () => {} : onClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded-xl shadow-xl p-6 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Add Contact</h2>
          <button
            onClick={isLoading ? () => {} : onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {inputFormFields.map((f) => (
            <FormFields
              key={f.id}
              {...f}
              type={f.type || "text"}
              value={formData[f.value]}
              onChange={(e) => updateFormData(f.value, e.target.value)}
              error={errors[f.value]}
              name={f.value}
            />
          ))}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={isLoading ? () => {} : onClose}
              className="w-full border py-2 rounded-md text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full text-white flex items-center justify-center gap-2 py-2 rounded-md text-sm transition ${
                isFormValid
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-blue-400 cursor-not-allowed"
              }`}
            >
              {isLoading ? "Saving ... " : "Save"}
              {isLoading && <Loader size={16} color="text-white" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
