import React from "react";

export const StatField: React.FC<{
  label: string;
  type: string;
  placeholder: string;
  value: string | number;
  onChange: (value: string | number) => void;
  maxLength?: number;
}> = ({ label, type, placeholder, value, onChange, maxLength }) => (
  <div className="card flex flex-col items-center border-2 border-neutral-700 px-1">
    <span className="my-1 self-start text-xs font-semibold">{label}</span>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) =>
        onChange(type === "number" ? Number(e.target.value) : e.target.value)
      }
      className="input-field bg-gradient-dark max-w-12 text-center font-normal"
      maxLength={maxLength}
    />
  </div>
);
