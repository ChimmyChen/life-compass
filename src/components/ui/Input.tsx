import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export function Input({ label, className = '', id, ...props }: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')
  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-text-light">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`
          w-full px-4 py-3 rounded-[12px]
          bg-white/60 border border-white/50
          text-text-main placeholder:text-text-muted
          focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30
          transition-all duration-300
          ${className}
        `}
        {...props}
      />
    </div>
  )
}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
}

export function TextArea({ label, className = '', id, ...props }: TextAreaProps) {
  const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-')
  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={textareaId} className="block text-sm font-medium text-text-light">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={`
          w-full px-4 py-3 rounded-[12px]
          bg-white/60 border border-white/50
          text-text-main placeholder:text-text-muted
          focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30
          transition-all duration-300 resize-none
          ${className}
        `}
        {...props}
      />
    </div>
  )
}
