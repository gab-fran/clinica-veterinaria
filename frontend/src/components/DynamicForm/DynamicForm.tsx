import React, { useEffect, useState } from 'react';
import { useController, useForm, type Control, type DefaultValues, type FieldValues, type Path } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ZodType } from 'zod';
import styles from './DynamicForm.module.css';

export interface FieldConfig<T> {
  name: Path<T>;
  label: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'date' | 'tel' | 'url' | string;
  options?: readonly { label: string; value: string }[];
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
  hidden?: boolean;
  searchable?: boolean;
  autoComplete?: string;
  pattern?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
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

function SearchableField<T extends FieldValues>({
  field,
  control,
  inputClassName,
}: {
  field: FieldConfig<T>;
  control: Control<T>;
  inputClassName: string;
}) {
  const { field: controllerField } = useController({ name: field.name, control });
  const selectedOption = field.options?.find((option) => option.value === String(controllerField.value ?? ''));
  const [inputValue, setInputValue] = useState(selectedOption?.label ?? '');
  const listId = `options-${String(field.name)}`;

  useEffect(() => {
    setInputValue(selectedOption?.label ?? '');
  }, [selectedOption?.label]);

  return (
    <>
      <input
        id={String(field.name)}
        name={controllerField.name}
        ref={controllerField.ref}
        type="text"
        value={inputValue}
        placeholder={field.placeholder}
        required={field.required}
        disabled={field.disabled}
        readOnly={field.readOnly}
        autoComplete={field.autoComplete}
        list={listId}
        className={inputClassName}
        onBlur={controllerField.onBlur}
        onChange={(event) => {
          const value = event.target.value;
          const option = field.options?.find((item) => item.label.toLowerCase() === value.toLowerCase());
          setInputValue(value);
          controllerField.onChange(option?.value ?? value);
          field.onChange?.(event);
        }}
      />
      <datalist id={listId}>
        {field.options?.map((option) => (
          <option key={option.value} value={option.label} />
        ))}
      </datalist>
    </>
  );
}

export function DynamicForm<T extends FieldValues>({
  schema,
  fields,
  onSubmit,
  defaultValues,
  submitText = 'Salvar',
  className = styles.formContainer,
  fieldClassName = styles.fieldGroup,
  inputClassName = styles.inputField,
  submitButtonClassName = styles.submitButton,
  children,
}: DynamicFormProps<T>) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
      {fields.map((field) => {
        // Extrai a função onChange nativa do React Hook Form
        const { onChange: rhfOnChange, ...registerProps } = register(field.name);

        if (field.hidden) {
          return <input key={String(field.name)} type="hidden" {...register(field.name)} />;
        }

        return (
          <div key={String(field.name)} className={fieldClassName}>
            <label htmlFor={String(field.name)} className={styles.fieldLabel}>
              {field.label} {field.required && <span className={styles.requiredAsterisk}>*</span>}
            </label>
            {field.searchable && field.options ? (
              <SearchableField field={field} control={control} inputClassName={inputClassName} />
            ) : field.options ? (
              <select
                id={String(field.name)}
                required={field.required}
                disabled={field.disabled}
                className={inputClassName}
                {...registerProps}
                onChange={(e) => {
                  rhfOnChange(e);
                  field.onChange?.(e);
                }}
              >
                {field.placeholder && <option value="">{field.placeholder}</option>}
                {field.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
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
                  rhfOnChange(e);
                  field.onChange?.(e);
                }}
              />
            )}
            {errors[field.name] && (
              <span className={styles.errorMessage}>
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
