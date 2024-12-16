import React, { ButtonHTMLAttributes } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'default';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
}

export function Button({ 
  variant = 'default',
  size = 'md',
  fullWidth = false,
  loading = false,
  className = '',
  children,
  disabled,
  ...props 
}: ButtonProps) {
  const { colors } = useTheme();

  const baseClasses = `
    inline-flex items-center justify-center
    font-medium rounded-lg
    transition-colors duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:cursor-not-allowed disabled:opacity-50
  `;

  const sizeClasses = {
    sm: 'px-3 text-sm gap-1.5',
    md: 'px-4 text-sm gap-2',
    lg: 'px-5 text-base gap-2'
  };

  const variantClasses = {
    primary: `
      text-[var(--button-primary-text)]
      bg-[var(--button-primary-bg)]
      hover:bg-[var(--button-primary-bg)]/90
      focus:ring-[var(--button-primary-bg)]/20
      disabled:hover:bg-[var(--button-primary-bg)]
    `,
    success: `
      text-[var(--button-success-text)]
      bg-[var(--button-success-bg)]
      hover:bg-[var(--button-success-bg)]/90
      focus:ring-[var(--button-success-bg)]/20
      disabled:hover:bg-[var(--button-success-bg)]
    `,
    warning: `
      text-[var(--button-warning-text)]
      bg-[var(--button-warning-bg)]
      hover:bg-[var(--button-warning-bg)]/90
      focus:ring-[var(--button-warning-bg)]/20
      disabled:hover:bg-[var(--button-warning-bg)]
    `,
    danger: `
      text-[var(--button-danger-text)]
      bg-[var(--button-danger-bg)]
      hover:bg-[var(--button-danger-bg)]/90
      focus:ring-[var(--button-danger-bg)]/20
      disabled:hover:bg-[var(--button-danger-bg)]
    `,
    default: `
      text-gray-700
      bg-white
      border border-gray-300
      hover:bg-gray-50
      focus:ring-gray-200
      disabled:hover:bg-white
    `
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${widthClass}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <Loader2 className="animate-spin" size={size === 'lg' ? 20 : 16} />
      )}
      {children}
    </button>
  );
}
