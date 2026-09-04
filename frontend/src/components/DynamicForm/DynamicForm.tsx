import React from 'react';
import { useForm, type FieldValues, type Path } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ZodType } from 'zod';

export interface FieldConfig<T> {
  name: Path<T>;
  label: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'date' | 'tel' | 'url' | string;
  placeholder?: string;

  // Validação Nativa
  required?: boolean;

  // Limites de Caracteres e Valores
  minLength?: number;
  maxLength?: number;
  min?: number | string;
  max?: number | string;
  step?: number | string;

  // Comportamentos e Eventos
  disabled?: boolean;
  readOnly?: boolean;
  autoComplete?: string;
  pattern?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // <- Evento customizado
}

export interface DynamicFormProps<T extends FieldValues> {
  schema: ZodType<T>;
  fields: FieldConfig<T>[];
  onSubmit: (data: T) => void;
  defaultValues?: Partial<T>;
  submitText?: string;
  className?: string;
  fieldClassName?: string;
  inputClassName?: string;
  submitButtonClassName?: string;
  children?: React.ReactNode;
}

export function DynamicForm<T extends FieldValues>({
  schema,
  fields,
  onSubmit,
  defaultValues,
  submitText = 'Salvar',
  className = 'form-container',
  fieldClassName = 'field-group',
  inputClassName = 'form-input',
  submitButtonClassName = 'btn-submit',
  children,
}: DynamicFormProps<T>) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as any,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
      {fields.map((field) => {
        // Extrai a função onChange nativa do React Hook Form
        const { onChange: rhfOnChange, ...registerProps } = register(field.name);

        return (
          <div key={String(field.name)} className={fieldClassName}>
            <label htmlFor={String(field.name)}>
              {field.label} {field.required && <span className="required-asterisk">*</span>}
            </label>
            <input
              id={String(field.name)}
              type={field.type || 'text'}
              placeholder={field.placeholder}
              required={field.required}
              minLength={field.minLength}
              maxLength={field.maxLength}
              min={field.min}
              max={field.max}
              step={field.step}
              disabled={field.disabled}
              readOnly={field.readOnly}
              autoComplete={field.autoComplete}
              pattern={field.pattern}
              className={inputClassName}
              {...registerProps}
              onChange={(e) => {
                rhfOnChange(e); // 1. Atualiza o React Hook Form / Zod
                field.onChange?.(e); // 2. Executa sua lógica customizada
              }}
            />
            {errors[field.name] && (
              <span className="error-message">
                {errors[field.name]?.message as string}
              </span>
            )}
          </div>
        );
      })}

      {children}

      <button type="submit" disabled={isSubmitting} className={submitButtonClassName}>
        {isSubmitting ? 'Carregando...' : submitText}
      </button>
    </form>
  );
}