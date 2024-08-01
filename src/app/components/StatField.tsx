import React from "react";

export const StatField: React.FC<{
  label: string;
  type: string;
  placeholder: string;
  value: string | number;
  onChange: (value: string | number) => void;
  maxLength?: number;
}> = ({ label, type, placeholder, value, onChange, maxLength }) => (
  <div className="card flex flex-col items-center border border-neutral-700 px-1 shadow">
    <span className="my-1 self-start text-xs font-semibold">{label}</span>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) =>
        onChange(type === "number" ? Number(e.target.value) : e.target.value)
      }
      className="input-field w-full min-w-12 bg-neutral-900 text-center font-normal"
      maxLength={maxLength}
    />
  </div>
);
