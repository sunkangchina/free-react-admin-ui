import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({ label, error, ...props }: InputProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700 select-none">
        {label}
      </label>
      <div className="relative">
        <input
          {...props}
          className={`
            block w-full px-4 py-2.5
            bg-white border rounded-lg
            text-gray-900 text-base
            transition duration-200 ease-in-out
            placeholder:text-gray-400
            focus:outline-none focus:ring-2 focus:ring-offset-0
            disabled:cursor-not-allowed disabled:opacity-50
            ${error
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
              : 'border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-blue-500/20'
            }
          `}
        />
      </div>
      {error && (
        <p className="text-sm text-red-600 font-medium">{error}</p>
      )}
    </div>
  );
}