// src/components/EditableField.tsx
import React from "react";

type EditableFieldProps = {
  label: string;
  value: string;
  name: string;
  editMode: boolean;
  textarea?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

const EditableField: React.FC<EditableFieldProps> = ({ label, value, name, editMode, textarea, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {editMode ? (
        textarea ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            rows={4}
          />
        ) : (
          <input
            name={name}
            value={value}
            onChange={onChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        )
      ) : (
        <p className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-50 p-2">
          {value || "N/A"}
        </p>
      )}
    </div>
  );
};

export default EditableField;
